"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <ParticleBackground />

      <div className="text-center z-10 max-w-md px-4">
        <h1 className="text-9xl font-bold gradient-text mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-300 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button className="cyber-button">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Button variant="outline" className="cyber-button" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

