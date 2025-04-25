"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current

    if (videoElement) {
      // Try to play the video automatically (will work because it's muted)
      const playPromise = videoElement.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          console.log("Autoplay prevented:", error)
        })
      }
    }

    // Listen for fullscreen change events
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      // Clean up event listeners
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen =
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement

    setIsFullscreen(!!isCurrentlyFullscreen)
  }

  const requestFullscreen = () => {
    const container = document.querySelector(".relative")

    if (!container) return

    try {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      } else if ((container as any).webkitRequestFullscreen) {
        ;(container as any).webkitRequestFullscreen()
      } else if ((container as any).mozRequestFullScreen) {
        ;(container as any).mozRequestFullScreen()
      } else if ((container as any).msRequestFullscreen) {
        ;(container as any).msRequestFullscreen()
      }
    } catch (error) {
      console.error("Error attempting to enable fullscreen:", error)
    }
  }

  // Update the return statement to make the UI clearer
  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="relative w-full h-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://drive.google.com/file/d/122cW9FrCiFBa4qg7Ud2EkDyCEVUO4w7f/view?usp=drivesdk"
          title="Introduction to Indian Cultural Heritage"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        {!isFullscreen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="bg-emerald-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:bg-emerald-600 transition-colors z-10"
              onClick={requestFullscreen}
            >
              Enter Fullscreen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
