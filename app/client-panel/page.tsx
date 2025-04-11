"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import InforniyaAssistant from "@/components/inforniya-assistant"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { useRouter } from "next/navigation"
import { Code, Smartphone, Palette, Video, FileText, Brain, CheckCircle } from "lucide-react"

export default function ClientPanelPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    budget: "",
    timeline: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user } = useFirebase()
  const router = useRouter()

  const services = [
    {
      id: "web-design",
      title: "Web Design",
      icon: <Code className="h-8 w-8 text-neon-teal" />,
    },
    {
      id: "web-app-development",
      title: "Web App Development",
      icon: <Code className="h-8 w-8 text-neon-teal" />,
    },
    {
      id: "android-app-development",
      title: "Android App Development",
      icon: <Smartphone className="h-8 w-8 text-neon-teal" />,
    },
    {
      id: "graphics-design",
      title: "Graphics Design",
      icon: <Palette className="h-8 w-8 text-neon-teal" />,
    },
    {
      id: "video-editing",
      title: "Video Editing",
      icon: <Video className="h-8 w-8 text-neon-teal" />,
    },
    {
      id: "content-creation",
      title: "Content Creation",
      icon: <FileText className="h-8 w-8 text-neon-teal" />,
    },
    {
      id: "ai-ml",
      title: "AI/ML Solutions",
      icon: <Brain className="h-8 w-8 text-neon-teal" />,
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceSelect = (serviceType: string) => {
    setFormData((prev) => ({ ...prev, serviceType }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would submit to Firebase
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSuccess(true)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Start Your <span className="gradient-text">Project</span>
            </h1>
            <p className="text-xl text-gray-300">
              Tell us about your project and we'll help you bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {success ? (
              <div className="cyber-card text-center">
                <CheckCircle className="h-16 w-16 text-neon-teal mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Your project request has been submitted successfully. Our team will review your requirements and get
                  back to you within 24 hours.
                </p>
                <Button onClick={() => router.push("/")} className="cyber-button">
                  Back to Home
                </Button>
              </div>
            ) : (
              <div className="cyber-card">
                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                  <div className={`flex flex-col items-center ${step >= 1 ? "text-neon-teal" : "text-gray-500"}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-neon-teal" : "border-gray-500"}`}
                    >
                      1
                    </div>
                    <span className="mt-2 text-sm">Personal Info</span>
                  </div>
                  <div
                    className={`flex-1 border-t-2 self-start mt-5 mx-4 ${step >= 2 ? "border-neon-teal" : "border-gray-500"}`}
                  ></div>
                  <div className={`flex flex-col items-center ${step >= 2 ? "text-neon-teal" : "text-gray-500"}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-neon-teal" : "border-gray-500"}`}
                    >
                      2
                    </div>
                    <span className="mt-2 text-sm">Service Selection</span>
                  </div>
                  <div
                    className={`flex-1 border-t-2 self-start mt-5 mx-4 ${step >= 3 ? "border-neon-teal" : "border-gray-500"}`}
                  ></div>
                  <div className={`flex flex-col items-center ${step >= 3 ? "text-neon-teal" : "text-gray-500"}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-neon-teal" : "border-gray-500"}`}
                    >
                      3
                    </div>
                    <span className="mt-2 text-sm">Project Details</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="cyber-input w-full"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="cyber-input w-full"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Your Phone Number"
                            className="cyber-input w-full"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">
                            Company (Optional)
                          </label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your Company"
                            className="cyber-input w-full"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-8">
                        <Button type="button" onClick={nextStep} className="cyber-button">
                          Next
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Service Selection */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Select a Service</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className={`cyber-card cursor-pointer transition-all ${
                              formData.serviceType === service.id
                                ? "border-neon-teal shadow-neon-teal/20"
                                : "border-neon-teal/30 hover:border-neon-teal/70"
                            }`}
                            onClick={() => handleServiceSelect(service.id)}
                          >
                            <div className="flex items-center gap-4">
                              <div>{service.icon}</div>
                              <h3 className="text-xl font-bold">{service.title}</h3>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" onClick={prevStep} variant="outline" className="cyber-button">
                          Previous
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="cyber-button"
                          disabled={!formData.serviceType}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Project Details */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Project Details</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium mb-2">
                            Budget Range
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="cyber-input w-full"
                            required
                          >
                            <option value="">Select Budget Range</option>
                            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                            <option value="$25,000+">$25,000+</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="timeline" className="block text-sm font-medium mb-2">
                            Timeline
                          </label>
                          <select
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            className="cyber-input w-full"
                            required
                          >
                            <option value="">Select Timeline</option>
                            <option value="Less than 1 month">Less than 1 month</option>
                            <option value="1-3 months">1-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6+ months">6+ months</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                          Project Description
                        </label>
                        <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Describe your project requirements, goals, and any specific features you need."
                          className="cyber-input w-full min-h-[200px]"
                          required
                        />
                      </div>

                      <div className="flex justify-between mt-8">
                        <Button type="button" onClick={prevStep} variant="outline" className="cyber-button">
                          Previous
                        </Button>
                        <Button type="submit" className="cyber-button" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <InforniyaAssistant />
    </div>
  )
}

