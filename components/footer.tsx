import Link from "next/link"
import Logo3D from "./logo-3d"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-cyber-darker border-t border-neon-teal/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start">
              <Logo3D size={80} showText={true} />
            </div>
            <p className="text-gray-400 mt-4 text-center md:text-left">
              Premier IT services including web design, app development, AI/ML solutions, graphics design, video
              editing, and content creation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-neon-teal transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/web-design" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/web-app-development"
                  className="text-gray-400 hover:text-neon-teal transition-colors"
                >
                  Web App Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services/android-app-development"
                  className="text-gray-400 hover:text-neon-teal transition-colors"
                >
                  Android App Development
                </Link>
              </li>
              <li>
                <Link href="/services/graphics-design" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Graphics Design
                </Link>
              </li>
              <li>
                <Link href="/services/video-editing" className="text-gray-400 hover:text-neon-teal transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/content-creation"
                  className="text-gray-400 hover:text-neon-teal transition-colors"
                >
                  Content Creation
                </Link>
              </li>
              <li>
                <Link href="/services/ai-ml" className="text-gray-400 hover:text-neon-teal transition-colors">
                  AI/ML Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-neon-teal" />
                <a
                  href="mailto:contact@infernotechie.com"
                  className="text-gray-400 hover:text-neon-teal transition-colors"
                >
                  contact@infernotechie.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-neon-teal" />
                <a href="tel:+917400164856" className="text-gray-400 hover:text-neon-teal transition-colors">
                  +91 7400164856
                </a>
              </li>
              <li>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-neon-teal transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-neon-teal transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-neon-teal transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-neon-teal transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-neon-teal transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-teal/20 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} InfernoTechie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

