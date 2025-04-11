import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import InforniyaAssistant from "@/components/inforniya-assistant"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Smartphone, Palette, Video, FileText, Brain, ArrowRight, CheckCircle } from "lucide-react"

// Services data
const services = [
  {
    id: "web-design",
    title: "Web Design",
    description:
      "We create stunning, responsive websites that captivate your audience and drive conversions. Our web design services focus on user experience, visual appeal, and performance optimization.",
    icon: <Code className="h-12 w-12 text-neon-teal" />,
    features: [
      "Responsive design for all devices",
      "User-centered UX/UI design",
      "SEO optimization",
      "Fast loading speeds",
      "Accessibility compliance",
      "Brand consistency",
    ],
    link: "/services/web-design",
  },
  {
    id: "web-app-development",
    title: "Web App Development",
    description:
      "We build powerful, scalable web applications using cutting-edge technologies. Our development process ensures robust, secure, and maintainable applications that meet your business needs.",
    icon: <Code className="h-12 w-12 text-neon-teal" />,
    features: [
      "Custom web application development",
      "Progressive Web Apps (PWAs)",
      "E-commerce solutions",
      "Content Management Systems",
      "API development and integration",
      "Database design and optimization",
    ],
    link: "/services/web-app-development",
  },
  {
    id: "android-app-development",
    title: "Android App Development",
    description:
      "We develop native and cross-platform mobile apps that deliver exceptional user experiences. Our mobile solutions are designed for performance, usability, and engagement.",
    icon: <Smartphone className="h-12 w-12 text-neon-teal" />,
    features: [
      "Native Android development",
      "Cross-platform development",
      "UI/UX design for mobile",
      "App Store optimization",
      "Push notifications",
      "Offline functionality",
    ],
    link: "/services/android-app-development",
  },
  {
    id: "graphics-design",
    title: "Graphics Design",
    description:
      "We create eye-catching visuals that strengthen your brand identity and messaging. Our graphic design services help you stand out in a crowded marketplace.",
    icon: <Palette className="h-12 w-12 text-neon-teal" />,
    features: [
      "Logo design and branding",
      "Marketing materials",
      "Social media graphics",
      "Infographics",
      "Packaging design",
      "Print design",
    ],
    link: "/services/graphics-design",
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "We provide professional video editing services that bring your stories to life. Our video solutions help you engage your audience and convey your message effectively.",
    icon: <Video className="h-12 w-12 text-neon-teal" />,
    features: [
      "Commercial video production",
      "Social media videos",
      "Motion graphics",
      "Animation",
      "Video color grading",
      "Sound design",
    ],
    link: "/services/video-editing",
  },
  {
    id: "content-creation",
    title: "Content Creation",
    description:
      "We develop engaging content that resonates with your audience and drives engagement. Our content strategies are designed to build authority and generate leads.",
    icon: <FileText className="h-12 w-12 text-neon-teal" />,
    features: [
      "Blog posts and articles",
      "Website copy",
      "Social media content",
      "Email newsletters",
      "Whitepapers and ebooks",
      "SEO content",
    ],
    link: "/services/content-creation",
  },
  {
    id: "ai-ml",
    title: "AI/ML Solutions",
    description:
      "We implement cutting-edge artificial intelligence and machine learning solutions for your business. Our AI services help you automate processes and gain valuable insights.",
    icon: <Brain className="h-12 w-12 text-neon-teal" />,
    features: [
      "Machine learning models",
      "Natural language processing",
      "Computer vision",
      "Predictive analytics",
      "Recommendation systems",
      "Chatbots and virtual assistants",
    ],
    link: "/services/ai-ml",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-300">
              We offer a comprehensive range of IT services to help your business thrive in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col lg:flex-row items-center gap-12 py-16 ${
                index !== services.length - 1 ? "border-b border-neon-teal/20" : ""
              }`}
            >
              <div className={`lg:w-1/3 ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                <div className="cyber-card flex items-center justify-center h-64">{service.icon}</div>
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                <p className="text-xl text-gray-300 mb-6">{service.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-neon-teal flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href={service.link}>
                  <Button className="cyber-button">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Get Started</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact us today to discuss your project requirements and how we can help you achieve your goals.
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

