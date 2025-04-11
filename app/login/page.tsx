"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ParticleBackground from "@/components/particle-background"
import Logo3D from "@/components/logo-3d"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Check if it's admin login
      if (email === "Access@admin" && password === "Password@admin123") {
        // Admin login successful
        setSuccess(true)

        // Store admin info in localStorage
        localStorage.setItem("infernotechie_admin", "true")
        localStorage.setItem(
          "infernotechie_user",
          JSON.stringify({
            email: "Access@admin",
            role: "admin",
            name: "Admin User",
          }),
        )

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/admin/dashboard")
        }, 1000)
      } else if (email && password) {
        // Regular user login (mock)
        setSuccess(true)

        localStorage.setItem(
          "infernotechie_user",
          JSON.stringify({
            email: email,
            role: "client",
            name: "Client User",
          }),
        )

        // Redirect after a short delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 1000)
      } else {
        throw new Error("Please enter both email and password")
      }
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials and try again.")
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <ParticleBackground />

      <div className="w-full max-w-md z-10">
        <div className="cyber-card p-8">
          <div className="flex flex-col items-center mb-8">
            <Logo3D size={80} />
            <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
            <p className="text-gray-400 mt-2">Sign in to your account</p>
          </div>

          {error && <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-md mb-6">{error}</div>}

          {success && (
            <div className="bg-green-500/20 border border-green-500 text-white p-4 rounded-md mb-6">
              Login successful! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email / Username
              </label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                className="cyber-input w-full"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="cyber-input w-full pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link href="/forgot-password" className="text-sm text-neon-teal hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="cyber-button w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-neon-teal hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 z-10">
        <Link href="/" className="text-gray-400 hover:text-neon-teal transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

