"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import InforniyaAssistant from "@/components/inforniya-assistant"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Tag, ExternalLink, ArrowRight } from "lucide-react"

// Project data
const projectsData = [
  {
    id: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with payment integration, inventory management, and analytics.",
    fullDescription: `
      Our team developed a comprehensive e-commerce solution for a retail client looking to expand their online presence. The platform includes:
      
      - Responsive design optimized for all devices
      - Secure payment processing with multiple gateway options
      - Inventory management system with real-time updates
      - Customer account management and order tracking
      - Advanced analytics dashboard for business insights
      - Marketing tools including email campaigns and discount management
      - SEO optimization for improved visibility
      
      The platform was built using Next.js for the frontend, with a Node.js backend and MongoDB database. We implemented Stripe for payment processing and integrated with various shipping APIs for seamless order fulfillment.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    client: "RetailCo Inc.",
    completionDate: "December 2023",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
    link: "https://example.com/ecommerce",
  },
  {
    id: "mobile-banking-app",
    title: "Mobile Banking App",
    description:
      "Secure, intuitive mobile banking application with biometric authentication and real-time notifications.",
    fullDescription: `
      We designed and developed a secure mobile banking application for a financial institution, focusing on user experience and security. Key features include:
      
      - Biometric authentication (fingerprint and face recognition)
      - Real-time account balance and transaction history
      - Bill payment and fund transfer functionality
      - Push notifications for transactions and account alerts
      - Budgeting tools and expense tracking
      - ATM/branch locator with map integration
      - Customer support with in-app chat
      
      The app was built using React Native for cross-platform compatibility, with a secure backend API built on Node.js. We implemented industry-standard encryption and security protocols to ensure data protection.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile App",
    client: "SecureBank Financial",
    completionDate: "October 2023",
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "Firebase"],
    link: "https://example.com/banking-app",
  },
  {
    id: "ai-analytics-dashboard",
    title: "AI-Powered Analytics Dashboard",
    description:
      "Interactive dashboard with AI-driven insights, predictive analytics, and customizable visualizations.",
    fullDescription: `
      We created an advanced analytics dashboard that leverages artificial intelligence to provide actionable insights for a data-driven company. The dashboard features:
      
      - AI-powered data analysis and pattern recognition
      - Predictive analytics for business forecasting
      - Customizable visualization tools and charts
      - Real-time data processing and updates
      - Automated report generation and scheduling
      - Anomaly detection and alert system
      - Data integration from multiple sources
      
      The solution was built using React for the frontend, with Python and TensorFlow for the AI/ML components. We implemented a microservices architecture for scalability and used Docker for containerization.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "AI/ML",
    client: "DataInsight Corp",
    completionDate: "January 2024",
    technologies: ["React", "Python", "TensorFlow", "Docker", "GraphQL", "AWS"],
    link: "https://example.com/analytics-dashboard",
  },
  {
    id: "corporate-website-redesign",
    title: "Corporate Website Redesign",
    description: "Complete redesign of a corporate website with improved UX, responsive design, and SEO optimization.",
    fullDescription: `
      We redesigned a corporate website for a multinational company, focusing on modern design principles, user experience, and performance optimization. The project included:
      
      - Complete visual redesign with brand alignment
      - Responsive layout for all devices
      - Improved information architecture and navigation
      - Content management system implementation
      - SEO optimization for better search visibility
      - Performance optimization for faster loading
      - Accessibility compliance (WCAG 2.1)
      
      The website was built using Next.js for optimal performance and SEO, with a headless CMS for content management. We implemented advanced animations and transitions for an engaging user experience.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Design",
    client: "Global Enterprises Ltd.",
    completionDate: "November 2023",
    technologies: ["Next.js", "Tailwind CSS", "Headless CMS", "Vercel", "Framer Motion"],
    link: "https://example.com/corporate-website",
  },
  {
    id: "inventory-management-system",
    title: "Inventory Management System",
    description: "Custom inventory management system with barcode scanning, real-time tracking, and reporting.",
    fullDescription: `
      We developed a comprehensive inventory management system for a manufacturing company to streamline their operations and improve efficiency. The system includes:
      
      - Barcode scanning for quick product identification
      - Real-time inventory tracking and updates
      - Automated reorder notifications
      - Supplier management and purchase order generation
      - Warehouse location mapping and optimization
      - Comprehensive reporting and analytics
      - Integration with accounting software
      
      The system was built as a web application using React for the frontend and Node.js for the backend, with a PostgreSQL database. We implemented WebSockets for real-time updates and integrated with barcode scanning hardware.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Web Application",
    client: "ManufacturePro Industries",
    completionDate: "September 2023",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSockets", "Docker"],
    link: "https://example.com/inventory-system",
  },
  {
    id: "social-media-marketing-campaign",
    title: "Social Media Marketing Campaign",
    description: "Comprehensive social media marketing campaign with content creation, scheduling, and analytics.",
    fullDescription: `
      We designed and executed a multi-platform social media marketing campaign for a consumer brand launching a new product line. The campaign included:
      
      - Strategic planning and target audience analysis
      - Content creation for multiple platforms (Instagram, Facebook, Twitter, TikTok)
      - Custom graphics and video production
      - Influencer partnership management
      - Scheduled posting and engagement monitoring
      - Paid advertising management
      - Performance analytics and reporting
      
      We utilized various design tools for content creation and implemented a social media management platform for scheduling and analytics. The campaign resulted in a 45% increase in brand awareness and a 30% increase in sales.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Content Creation",
    client: "Consumer Brands Inc.",
    completionDate: "December 2023",
    technologies: ["Adobe Creative Suite", "Final Cut Pro", "Social Media Management Tools"],
    link: "https://example.com/marketing-campaign",
  },
  {
    id: "educational-mobile-app",
    title: "Educational Mobile App",
    description:
      "Interactive educational app with gamification elements, progress tracking, and personalized learning paths.",
    fullDescription: `
      We created an educational mobile application for a learning platform, focusing on interactive content and personalized learning experiences. The app features:
      
      - Interactive lessons and quizzes
      - Gamification elements (points, badges, leaderboards)
      - Personalized learning paths based on user progress
      - Progress tracking and performance analytics
      - Offline mode for learning without internet
      - Social features for collaborative learning
      - Parent/teacher dashboard for monitoring
      
      The app was developed using Flutter for cross-platform compatibility, with Firebase for backend services. We implemented machine learning algorithms for personalized content recommendations.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Mobile App",
    client: "EduLearn Technologies",
    completionDate: "October 2023",
    technologies: ["Flutter", "Firebase", "TensorFlow Lite", "Google Cloud"],
    link: "https://example.com/educational-app",
  },
  {
    id: "corporate-brand-identity",
    title: "Corporate Brand Identity",
    description:
      "Complete brand identity package including logo design, color palette, typography, and brand guidelines.",
    fullDescription: `
      We developed a comprehensive brand identity for a technology startup, creating a cohesive visual language that communicates their values and vision. The project included:
      
      - Logo design with variations for different applications
      - Color palette selection with primary and secondary colors
      - Typography system with font selection and hierarchy
      - Visual elements and iconography
      - Brand guidelines documentation
      - Stationery design (business cards, letterhead, etc.)
      - Digital assets for web and social media
      
      We followed a collaborative design process, working closely with the client to understand their brand values and target audience. The result was a distinctive and versatile brand identity that effectively positions the company in the market.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Graphics Design",
    client: "TechStart Innovations",
    completionDate: "August 2023",
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign"],
    link: "https://example.com/brand-identity",
  },
  {
    id: "product-promotional-video",
    title: "Product Promotional Video",
    description: "High-quality promotional video showcasing product features, benefits, and use cases.",
    fullDescription: `
      We produced a compelling promotional video for a tech product launch, highlighting its features and benefits in an engaging way. The project involved:
      
      - Concept development and storyboarding
      - Professional filming with high-end equipment
      - Motion graphics and visual effects
      - Professional voiceover and sound design
      - Color grading and post-production
      - Multiple format outputs for different platforms
      - Subtitle creation for accessibility
      
      We used a combination of live-action footage, product demonstrations, and motion graphics to create a dynamic and informative video that effectively communicates the product's value proposition.
    `,
    image: "/placeholder.svg?height=400&width=600",
    category: "Video Editing",
    client: "TechGadget Innovations",
    completionDate: "November 2023",
    technologies: ["Adobe Premiere Pro", "Adobe After Effects", "Cinema 4D", "DaVinci Resolve"],
    link: "https://example.com/promo-video",
  },
]


export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (params.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
      const foundProject = projectsData.find((p) => p.id === slug)

      if (foundProject) {
        setProject(foundProject)
      }
    }
    setLoading(false)
  }, [params])

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-neon-teal text-2xl">Loading...</div>

      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <section className="pt-32 pb-20 relative overflow-hidden">
          <ParticleBackground />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Project Not Found</h1>
              <p className="text-xl text-gray-300 mb-8">
                The project you're looking for doesn't exist or has been moved.
              </p>
              <Link href="/projects">
                <Button className="cyber-button">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <InforniyaAssistant />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Link href="/projects" className="inline-flex items-center text-neon-teal hover:underline mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">{project.title}</h1>
              <p className="text-xl text-gray-300 mb-8">{project.description}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-cyber-dark px-4 py-2 rounded-full">
                  <Tag className="h-4 w-4 text-neon-teal" />
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center gap-2 bg-cyber-dark px-4 py-2 rounded-full">
                  <Calendar className="h-4 w-4 text-neon-teal" />
                  <span>{project.completionDate}</span>
                </div>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button className="cyber-button">
                    Visit Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
            <div className="lg:w-1/2">
              <div className="cyber-card overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="cyber-card">
                <div className="p-6">
                  <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                  <div className="prose prose-invert max-w-none">
                    {project.fullDescription.split("\n").map((paragraph: string, index: number) => {
                      if (paragraph.trim().startsWith("-")) {
                        return (
                          <ul key={index} className="list-disc list-inside mb-4">
                            <li className="text-gray-300">{paragraph.trim().substring(1).trim()}</li>
                          </ul>
                        )
                      } else {
                        return (
                          <p key={index} className="mb-4 text-gray-300">
                            {paragraph}
                          </p>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="cyber-card mb-6">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Client</h3>
                  <p className="text-gray-300">{project.client}</p>
                </div>
              </div>

              <div className="cyber-card mb-6">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Completion Date</h3>
                  <p className="text-gray-300">{project.completionDate}</p>
                </div>
              </div>

              <div className="cyber-card">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, index: number) => (
                      <span key={index} className="bg-cyber-darker px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Related <span className="gradient-text">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectsData
              .filter((p) => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link href={`/projects/${relatedProject.id}`} key={relatedProject.id}>
                  <div className="cyber-card card-3d h-full overflow-hidden">
                    <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                      <Image
                        src={relatedProject.image || "/placeholder.svg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-neon-teal text-cyber-dark px-3 py-1 rounded-full text-xs font-bold">
                        {relatedProject.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{relatedProject.title}</h3>
                      <p className="text-gray-300 mb-4">{relatedProject.description}</p>
                      <div className="flex items-center text-neon-teal">
                        <span>View Details</span>
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button className="cyber-button">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <InforniyaAssistant />
    </div>
  )
}
