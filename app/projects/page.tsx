import Header from "@/components/header"
import Footer from "@/components/footer"
import InforniyaAssistant from "@/components/inforniya-assistant"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

// Project data
const projects = [
  {
    id: "project1",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and analytics.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    link: "/projects/e-commerce-platform",
  },
  {
    id: "project2",
    title: "Mobile Banking App",
    description:
      "Secure, intuitive mobile banking application with biometric authentication and real-time notifications.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile App",
    link: "/projects/mobile-banking-app",
  },
  {
    id: "project3",
    title: "AI-Powered Analytics Dashboard",
    description:
      "Interactive dashboard with AI-driven insights, predictive analytics, and customizable visualizations.",
    image: "/placeholder.svg?height=400&width=600",
    category: "AI/ML",
    link: "/projects/ai-analytics-dashboard",
  },
  {
    id: "project4",
    title: "Corporate Website Redesign",
    description: "Complete redesign of a corporate website with improved UX, responsive design, and SEO optimization.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Design",
    link: "/projects/corporate-website-redesign",
  },
  {
    id: "project5",
    title: "Inventory Management System",
    description: "Custom inventory management system with barcode scanning, real-time tracking, and reporting.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Application",
    link: "/projects/inventory-management-system",
  },
  {
    id: "project6",
    title: "Social Media Marketing Campaign",
    description: "Comprehensive social media marketing campaign with content creation, scheduling, and analytics.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Content Creation",
    link: "/projects/social-media-marketing-campaign",
  },
  {
    id: "project7",
    title: "Educational Mobile App",
    description:
      "Interactive educational app with gamification elements, progress tracking, and personalized learning paths.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile App",
    link: "/projects/educational-mobile-app",
  },
  {
    id: "project8",
    title: "Corporate Brand Identity",
    description:
      "Complete brand identity package including logo design, color palette, typography, and brand guidelines.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Graphics Design",
    link: "/projects/corporate-brand-identity",
  },
  {
    id: "project9",
    title: "Product Promotional Video",
    description: "High-quality promotional video showcasing product features, benefits, and use cases.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Video Editing",
    link: "/projects/product-promotional-video",
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Do you have an idea of Any <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-300">
              Take a look at some of our Projects Example and see how we've helped our clients achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="card-3d bg-cyber-dark border border-neon-teal/30 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-neon-teal text-cyber-dark px-3 py-1 rounded-full text-xs font-bold">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <Link
                    href={project.link}
                    className="flex items-center text-neon-teal hover:text-neon-pink transition-colors"
                  >
                    <span>View Details</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Start Your Project</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's work together to bring your vision to life with innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/client-panel" className="cyber-button px-6 py-3 rounded-md">
                Start a Project
              </Link>
              <Link
                href="/contact"
                className="cyber-button bg-transparent border border-neon-teal px-6 py-3 rounded-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <InforniyaAssistant />
    </div>
  )
}

