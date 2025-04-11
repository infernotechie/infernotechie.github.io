"use client"

import { useEffect, useRef, useState } from "react"

interface ParticleBackgroundProps {
  color?: string
  count?: number
  speed?: number
  size?: number
  interactive?: boolean
}

export default function ParticleBackground({
  color = "#00FF88",
  count = 100,
  speed = 0.5,
  size = 2,
  interactive = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const animationFrameId = useRef<number | null>(null)
  const particles = useRef<any[]>([])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      if (!canvas.parentElement) return
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })

      // Reinitialize particles
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const initParticles = () => {
      particles.current = []
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * size + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color,
        })
      }
    }

    const draw = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }

        // Interactive effect
        if (
          interactive &&
          Math.abs(particle.x - mousePosition.x) < 100 &&
          Math.abs(particle.y - mousePosition.y) < 100
        ) {
          const dx = particle.x - mousePosition.x
          const dy = particle.y - mousePosition.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (100 - distance) / 100

          particle.x += forceDirectionX * force * speed
          particle.y += forceDirectionY * force * speed
        }
      })

      animationFrameId.current = requestAnimationFrame(draw)
    }

    window.addEventListener("resize", handleResize)
    if (interactive) {
      canvas.addEventListener("mousemove", handleMouseMove)
    }

    handleResize()
    draw()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (interactive) {
        canvas.removeEventListener("mousemove", handleMouseMove)
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [color, count, interactive, size, speed])

  return (
    <div className="particle-container">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

