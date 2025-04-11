import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import InforniyaAssistant from "@/components/inforniya-assistant"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign } from "lucide-react"

export default function CareersPage() {
  // Job openings data
  const jobOpenings = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      location: "Mumbai, India (Remote)",
      type: "Full-time",
      salary: "Competitive",
      description:
        "We're looking for a Senior Frontend Developer with expertise in React, Next.js, and modern frontend technologies to join our team.",
      requirements: [
        "5+ years of experience in frontend development",
        "Strong proficiency in React, Next.js, and TypeScript",
        "Experience with state management libraries (Redux, Zustand, etc.)",
        "Knowledge of modern CSS frameworks (Tailwind, Styled Components, etc.)",
        "Understanding of responsive design and cross-browser compatibility",
        "Excellent problem-solving skills and attention to detail",
      ],
      link: "/careers/senior-frontend-developer",
    },
    {
      id: "job2",
      title: "Backend Developer",
      location: "Mumbai, India (Remote)",
      type: "Full-time",
      salary: "Competitive",
      description:
        "We're seeking a Backend Developer with experience in Node.js, Express, and database management to build robust and scalable APIs.",
      requirements: [
        "3+ years of experience in backend development",
        "Proficiency in Node.js, Express, and TypeScript",
        "Experience with SQL and NoSQL databases",
        "Knowledge of RESTful API design principles",
        "Understanding of authentication and authorization mechanisms",
        "Familiarity with cloud services (AWS, Azure, GCP)",
      ],
      link: "/careers/backend-developer",
    },
    {
      id: "job3",
      title: "UI/UX Designer",
      location: "Mumbai, India (Remote)",
      type: "Full-time",
      salary: "Competitive",
      description:
        "We're looking for a talented UI/UX Designer to create beautiful, intuitive interfaces for our web and mobile applications.",
      requirements: [
        "3+ years of experience in UI/UX design",
        "Proficiency in design tools (Figma, Adobe XD, etc.)",
        "Strong portfolio showcasing your design process and solutions",
        "Understanding of user-centered design principles",
        "Knowledge of responsive design and accessibility standards",
        "Ability to collaborate with developers to implement designs",
      ],
      link: "/careers/ui-ux-designer",
    },
    {
      id: "job4",
      title: "Mobile App Developer",
      location: "Mumbai, India (Remote)",
      type: "Full-time",
      salary: "Competitive",
      description:
        "We're seeking a Mobile App Developer with experience in React Native to build cross-platform mobile applications.",
      requirements: [
        "3+ years of experience in mobile app development",
        "Proficiency in React Native and TypeScript",
        "Experience with state management in mobile apps",
        "Knowledge of native modules and third-party libraries",
        "Understanding of app performance optimization",
        "Familiarity with app deployment processes",
      ],
      link: "/careers/mobile-app-developer",
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
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-gray-300">
              Explore career opportunities at InfernoTechie and be part of our mission to create innovative digital
              solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-cyber-dark relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid-bg opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Join <span className="gradient-text">InfernoTechie</span>
            </h2>
            <p className="text-xl text-gray-300">
              We offer a dynamic, collaborative environment where you can grow your skills and make an impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="cyber-card">
              <h3 className="text-2xl font-bold mb-4">Innovative Projects</h3>
              <p className="text-gray-300">
                Work on cutting-edge projects using the latest technologies and methodologies.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-bold mb-4">Growth Opportunities</h3>
              <p className="text-gray-300">
                Continuous learning and career advancement opportunities to help you reach your full potential.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-bold mb-4">Collaborative Culture</h3>
              <p className="text-gray-300">
                A supportive team environment that values collaboration, creativity, and open communication.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-bold mb-4">Work-Life Balance</h3>
              <p className="text-gray-300">
                Flexible work arrangements and policies that respect your personal time and well-being.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-bold mb-4">Competitive Benefits</h3>
              <p className="text-gray-300">
                Attractive compensation packages, health benefits, and other perks to support your lifestyle.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-bold mb-4">Global Impact</h3>
              <p className="text-gray-300">
                Opportunity to work on projects that make a difference and reach audiences worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Current <span className="gradient-text">Openings</span>
            </h2>
            <p className="text-xl text-gray-300">
              Explore our current job opportunities and find the perfect role for your skills and interests.
            </p>
          </div>

          <div className="space-y-8">
            {jobOpenings.map((job) => (
              <div key={job.id} className="cyber-card">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-1 text-gray-300">
                        <MapPin className="h-4 w-4 text-neon-teal" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock className="h-4 w-4 text-neon-teal" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <DollarSign className="h-4 w-4 text-neon-teal" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="mb-6">
                      <h4 className="font-bold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href={job.link}>
                      <Button className="cyber-button whitespace-nowrap">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
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
              Don't See the <span className="gradient-text">Right Fit</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in
              mind for future opportunities.
            </p>
            <Link href="/contact">
              <Button className="cyber-button">
                <Briefcase className="mr-2 h-5 w-5" />
                Send Your Resume
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

