"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Logo3D from "./logo-3d"
import { Button } from "@/components/ui/button"
import { useFirebase } from "@/lib/firebase/firebase-provider"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useFirebase()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = (e: React.MouseEvent) => {
    // Toggle between dark and cosmic theme
    const html = document.documentElement
    const currentTheme = html.classList.contains("cosmic-theme") ? "dark" : "cosmic-theme"

    // Remove current theme
    html.classList.remove("dark", "cosmic-theme")

    // Add water drop animation class
    html.classList.add("theme-transition")

    // Dispatch theme change event with mouse position
    const themeChangeEvent = new CustomEvent("themeChange", {
      detail: {
        theme: currentTheme,
        x: e.clientX,
        y: e.clientY,
      },
    })
    document.dispatchEvent(themeChangeEvent)

    // Add new theme after a short delay
    setTimeout(() => {
      html.classList.add(currentTheme)

      // Remove animation class after transition completes
      setTimeout(() => {
        html.classList.remove("theme-transition")
      }, 1500)
    }, 100)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Careers", href: "/careers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-cyber-dark/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
            <Logo3D size={50} autoRotate={false} />
            <span className="text-xl font-bold hidden sm:block">
              <span className="text-blue-500">INFERNO</span>
              <span className="text-red-500">TECHIE</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-neon-teal ${
                  pathname === link.href ? "text-neon-teal" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" className="cyber-button">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-neon-teal">
                    Login
                  </Button>
                </Link>
                <Link href="/client-panel">
                  <Button variant="outline" className="cyber-button">
                    Order Now
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-cyber-dark/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-neon-teal ${
                    pathname === link.href ? "text-neon-teal" : "text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button variant="outline" className="cyber-button w-full">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" className="text-white hover:text-neon-teal w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/client-panel">
                      <Button variant="outline" className="cyber-button w-full">
                        Order Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

