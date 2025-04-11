import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import InforniyaAssistant from "@/components/inforniya-assistant"
import Logo3D from "@/components/logo-3d"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Code, Smartphone, Palette, Video, FileText, Brain, ArrowRight, CheckCircle, ExternalLink } from "lucide-react"

export default function Home() {
  // Services data
  const services = [
    {
      id: "web-design",
      title: "Web Design",
      description: "Stunning, responsive websites that captivate your audience and drive conversions.",
      icon: <Code className="h-10 w-10 text-neon-teal" />,
      link: "/services/web-design",
    },
    {
      id: "web-app-development",
      title: "Web App Development",
      description: "Powerful, scalable web applications built with cutting-edge technologies.",
      icon: <Code className="h-10 w-10 text-neon-teal" />,
      link: "/services/web-app-development",
    },
    {
      id: "android-app-development",
      title: "Android App Development",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
      icon: <Smartphone className="h-10 w-10 text-neon-teal" />,
      link: "/services/android-app-development",
    },
    {
      id: "graphics-design",
      title: "Graphics Design",
      description: "Eye-catching visuals that strengthen your brand identity and messaging.",
      icon: <Palette className="h-10 w-10 text-neon-teal" />,
      link: "/services/graphics-design",
    },
    {
      id: "video-editing",
      title: "Video Editing",
      description: "Professional video editing services that bring your stories to life.",
      icon: <Video className="h-10 w-10 text-neon-teal" />,
      link: "/services/video-editing",
    },
    {
      id: "content-creation",
      title: "Content Creation",
      description: "Engaging content that resonates with your audience and drives engagement.",
      icon: <FileText className="h-10 w-10 text-neon-teal" />,
      link: "/services/content-creation",
    },
    {
      id: "ai-ml",
      title: "AI/ML Solutions",
      description: "Cutting-edge artificial intelligence and machine learning solutions for your business.",
      icon: <Brain className="h-10 w-10 text-neon-teal" />,
      link: "/services/ai-ml",
    },
  ]

  // Featured projects
  const featuredProjects = [
    {
      id: "project1",
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, inventory management, and analytics.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/e-commerce-platform",
    },
    {
      id: "project2",
      title: "Mobile Banking App",
      description:
        "Secure, intuitive mobile banking application with biometric authentication and real-time notifications.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/mobile-banking-app",
    },
    {
      id: "project3",
      title: "AI-Powered Analytics Dashboard",
      description:
        "Interactive dashboard with AI-driven insights, predictive analytics, and customizable visualizations.",
      image: "/placeholder.svg?height=400&width=600",
      link: "/projects/ai-analytics-dashboard",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Where <span className="gradient-text">Passion</span> Ignites{" "}
                <span className="gradient-text">Technology</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                We create cutting-edge digital solutions that transform businesses and elevate user experiences. From
                web design to AI integration, we bring your vision to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <Button className="cyber-button">
                    Explore Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="cyber-button">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-neon-teal/20 to-transparent rounded-full blur-xl"></div>
                <Logo3D size={300} showText={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-300">
              We offer a comprehensive range of IT services to help your business thrive in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link href={service.link} key={service.id}>
                <div className="cyber-card card-3d h-full">
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <div className="flex items-center text-neon-teal">
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative overflow-hidden">
        <ParticleBackground color="#FF4D80" count={100} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">InfernoTechie</span>
            </h2>
            <p className="text-xl text-gray-300">
              We combine technical expertise with creative innovation to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="cyber-card">
              <CheckCircle className="h-10 w-10 text-neon-teal mb-6" />
              <h3 className="text-2xl font-bold mb-4">Expertise</h3>
              <p className="text-gray-300">
                Our team of skilled professionals brings years of experience and deep technical knowledge to every
                project.
              </p>
            </div>

            <div className="cyber-card">
              <CheckCircle className="h-10 w-10 text-neon-teal mb-6" />
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-gray-300">
                We stay at the forefront of technology trends to deliver cutting-edge solutions that give you a
                competitive edge.
              </p>
            </div>

            <div className="cyber-card">
              <CheckCircle className="h-10 w-10 text-neon-teal mb-6" />
              <h3 className="text-2xl font-bold mb-4">Quality</h3>
              <p className="text-gray-300">
                We maintain the highest standards of quality in every aspect of our work, from code to design to user
                experience.
              </p>
            </div>

            <div className="cyber-card">
              <CheckCircle className="h-10 w-10 text-neon-teal mb-6" />
              <h3 className="text-2xl font-bold mb-4">Reliability</h3>
              <p className="text-gray-300">
                We deliver on our promises, meeting deadlines and exceeding expectations with reliable, scalable
                solutions.
              </p>
            </div>

            <div className="cyber-card">
              <CheckCircle className="h-10 w-10 text-neon-teal mb-6" />
              <h3 className="text-2xl font-bold mb-4">Support</h3>
              <p className="text-gray-300">
                Our commitment doesn't end at delivery. We provide ongoing support to ensure your continued success.
              </p>
            </div>

            <div className="cyber-card">
              <CheckCircle className="h-10 w-10 text-neon-teal mb-6" />
              <h3 className="text-2xl font-bold mb-4">Value</h3>
              <p className="text-gray-300">
                We deliver exceptional value through solutions that drive real business results and return on
                investment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-300">
              Take a look at some of our recent projects and see how we've helped our clients achieve their goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link href={project.link} key={project.id}>
                <div className="cyber-card card-3d h-full overflow-hidden">
                  <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex items-center text-neon-teal">
                    <span>View Project</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's work together to bring your vision to life with innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/client-panel">
                <Button className="cyber-button">Start a Project</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="cyber-button">
                  Contact Us
                </Button>
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

