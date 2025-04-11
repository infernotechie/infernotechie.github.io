"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface Logo3DProps {
  className?: string
  showText?: boolean
  size?: number
  autoRotate?: boolean
}

export default function Logo3D({ className = "", showText = false, size = 200, autoRotate = true }: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!containerRef.current) return

    // Create scene
    const scene = new THREE.Scene()

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    camera.position.z = 5

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)

    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(renderer.domElement)

    // Create a plane for the logo
    const geometry = new THREE.PlaneGeometry(4, 4)

    // Load texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/98bc6348-8ba9-420f-80bd-a216c324c254_removalai_preview-prWyP5hjdlEBXMf3PQFNF7CJyGVFea.png",
      () => {
        texture.needsUpdate = true
      },
    )

    // Create material with the logo texture
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add a subtle glow effect
    const glowGeometry = new THREE.PlaneGeometry(4.2, 4.2)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    })
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
    glowMesh.position.z = -0.1
    scene.add(glowMesh)

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      if (autoRotate) {
        // Rotate from left to right (around Y axis)
        mesh.rotation.y += 0.01
        glowMesh.rotation.y += 0.01
      }

      // Pulse the glow effect
      const time = Date.now() * 0.001
      glowMaterial.opacity = 0.1 + Math.sin(time) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
    }
  }, [size, autoRotate])

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} style={{ width: size, height: size }} />

      {showText && (
        <div className="mt-4 text-center">
          <h3 className="text-2xl font-bold company-name-animation">
            <span className="text-blue-500">INFERNO</span>
            <span className="text-red-500">TECHIE</span>
          </h3>
          <p className="text-red-500 text-sm slogan-animation">WHERE PASSION IGNITES TECHNOLOGY</p>
        </div>
      )}
    </div>
  )
}

