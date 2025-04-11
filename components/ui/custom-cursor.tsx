"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return

    // Check if device has touch screen (mobile/tablet)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0
    setIsMobile(isTouchDevice)

    if (isTouchDevice) return // Don't show custom cursor on touch devices

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  if (isMobile || !isVisible) return null

  return (
    <>
      <div
        className="custom-cursor bg-neon-teal opacity-30 blur-md"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isClicking ? "30px" : "40px",
          height: isClicking ? "30px" : "40px",
          transition: "width 0.2s, height 0.2s",
        }}
      />
      <div
        className="custom-cursor border-2 border-neon-teal"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isClicking ? "15px" : "20px",
          height: isClicking ? "15px" : "20px",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  )
}

