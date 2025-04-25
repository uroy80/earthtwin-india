"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import VideoPlayer from "@/components/video-player"

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    // Show welcome animation for 5 seconds, then transition to video
    const timer = setTimeout(() => {
      setShowWelcome(false)

      // Small delay before showing video to allow welcome animation to complete
      setTimeout(() => {
        setShowVideo(true)
      }, 500)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Starfield background */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 100 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1 + "px",
                    height: Math.random() * 3 + 1 + "px",
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>

            {/* TWINTECH Logo */}
            <motion.div
              className="relative z-10 mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/images/twintech-logo.png"
                alt="TWINTECH Logo"
                width={300}
                height={200}
                className="object-contain"
              />
            </motion.div>

            {/* Welcome text container */}
            <div className="relative z-10 text-center">
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Welcome to
              </motion.h1>

              {/* Earth Twin text with letter animation */}
              <div className="flex justify-center overflow-hidden">
                {Array.from("Earth Twin").map((letter, index) => (
                  <motion.span
                    key={index}
                    className={`inline-block text-4xl md:text-6xl lg:text-8xl font-bold ${
                      letter === " " ? "mr-4" : ""
                    } ${index < 5 ? "text-blue-400" : "text-emerald-400"}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      textShadow: [
                        "0 0 5px rgba(66, 153, 225, 0.5)",
                        "0 0 20px rgba(66, 153, 225, 0.8)",
                        "0 0 5px rgba(66, 153, 225, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + index * 0.1,
                      textShadow: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Cosmic orbit effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20 z-[-1]"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="absolute w-3 h-3 bg-blue-400 rounded-full"
                  style={{ top: "0%", left: "50%" }}
                  animate={{ boxShadow: ["0 0 5px #60a5fa", "0 0 20px #60a5fa", "0 0 5px #60a5fa"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/20 z-[-1]"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <motion.div
                  className="absolute w-2 h-2 bg-emerald-400 rounded-full"
                  style={{ top: "100%", left: "50%" }}
                  animate={{ boxShadow: ["0 0 5px #34d399", "0 0 20px #34d399", "0 0 5px #34d399"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showVideo && <VideoPlayer />}
    </main>
  )
}
