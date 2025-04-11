import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import InforniyaAssistant from "@/components/inforniya-assistant"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import Logo3D from "@/components/logo-3d"

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      id: "member1",
      name: "Shivam Giri",
      position: "Founder & Chief Operating Director (COD)",
      image: "Shivam-sir.png",
      bio: "Shivam Sir has over 5 years of experience in the tech leadership and is passionate about creating innovative solutions.",
    },
    {
      id: "member2",
      name: "Raviprakash Mishra",
      position: "Co-Founder & CEO",
      image: "Ravi svg.jpg",
      bio: "Ravi Sir is a tech enthusiast with expertise in AI/ML and web development. He leads our technical team with vision and precision.",
    },
    {
      id: "member3",
      name: "Riya Choudhary",
      position: "Co-Founder & Managing Director",
      image: "kon hoon.jpg",
      bio: "Riya brings creativity and design thinking to every project, ensuring our solutions are both functional and beautiful.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-300">
              Learn more about our company, our mission, and the team behind InfernoTechie.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-xl text-gray-300 mb-6">
                InfernoTechie was founded in 2025 with a simple mission: to create innovative digital solutions that
                help businesses thrive in the digital age.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                What started as a small team of passionate developers has grown into a full-service IT company with
                expertise in web development, mobile apps, AI/ML, graphics design, video editing, and content creation.
              </p>
              <p className="text-xl text-gray-300">
                Today, we continue to push the boundaries of what's possible in the digital realm, always staying at the
                forefront of technology trends and best practices.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="cyber-card overflow-hidden flex flex-col items-center justify-center p-8">
                <Logo3D size={200} autoRotate={true} />
                <div className="mt-6 text-center">
                  <h3 className="text-3xl font-bold mb-2 company-name-animation">
                    <span className="text-blue-500">INFERNO</span>
                    <span className="text-red-500">TECHIE</span>
                  </h3>
                  <p className="text-red-500 text-sm slogan-animation">WHERE PASSION IGNITES TECHNOLOGY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="cyber-card">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-300 mb-6">
                To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and
                create lasting value.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Deliver exceptional quality in every project</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Foster innovation and creative problem-solving</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Build long-term relationships with our clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Stay at the forefront of technological advancements</span>
                </li>
              </ul>
            </div>
            <div className="cyber-card">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-xl text-gray-300 mb-6">
                To be a global leader in digital innovation, recognized for our expertise, creativity, and commitment to
                excellence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Expand our reach to serve clients worldwide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Pioneer new technologies and methodologies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-6 w-6 text-neon-teal flex-shrink-0 mt-1" />
                  <span>Create a positive impact on society through our work</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-300">The talented individuals who make InfernoTechie's success possible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="cyber-card card-3d text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-neon-teal mb-4">{member.position}</p>
                <p className="text-gray-300">{member.bio}</p>
              </div>
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
              Ready to <span className="gradient-text">Work With Us</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's collaborate to bring your vision to life with our expertise and passion.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/client-panel">
                <Button className="cyber-button">
                  Start a Project
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
        </div>
      </section>

      <Footer />
      <InforniyaAssistant />
    </div>
  )
}

