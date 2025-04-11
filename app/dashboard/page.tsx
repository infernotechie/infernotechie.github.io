"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useFirebase } from "@/lib/firebase/firebase-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertTriangle, LogOut } from "lucide-react"

export default function DashboardPage() {
  const { user, loading, signOut } = useFirebase()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("projects")

  // Mock data for projects
  const projects = [
    {
      id: "project1",
      title: "E-Commerce Website",
      status: "In Progress",
      startDate: "2023-10-15",
      dueDate: "2023-12-15",
      progress: 65,
    },
    {
      id: "project2",
      title: "Mobile App Development",
      status: "Pending",
      startDate: "2023-11-01",
      dueDate: "2024-02-01",
      progress: 20,
    },
    {
      id: "project3",
      title: "Brand Identity Design",
      status: "Completed",
      startDate: "2023-09-01",
      dueDate: "2023-10-01",
      progress: 100,
    },
  ]

  // Mock data for invoices
  const invoices = [
    {
      id: "inv001",
      projectTitle: "E-Commerce Website",
      amount: "$3,500",
      date: "2023-10-15",
      status: "Paid",
    },
    {
      id: "inv002",
      projectTitle: "Mobile App Development",
      amount: "$2,000",
      date: "2023-11-01",
      status: "Pending",
    },
    {
      id: "inv003",
      projectTitle: "Brand Identity Design",
      amount: "$1,500",
      date: "2023-09-15",
      status: "Paid",
    },
  ]

  // Mock data for messages
  const messages = [
    {
      id: "msg001",
      from: "Project Manager",
      subject: "E-Commerce Website Update",
      date: "2023-11-15",
      read: true,
    },
    {
      id: "msg002",
      from: "Design Team",
      subject: "Brand Identity Design Feedback",
      date: "2023-11-10",
      read: false,
    },
    {
      id: "msg003",
      from: "Development Team",
      subject: "Mobile App Progress Report",
      date: "2023-11-05",
      read: true,
    },
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neon-teal text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Dashboard Content */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome, <span className="gradient-text">{user.displayName || "Client"}</span>
              </h1>
              <p className="text-gray-300">Manage your projects, invoices, and messages.</p>
            </div>
            <Button variant="outline" className="cyber-button mt-4 md:mt-0" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="projects" className="text-lg">
                Projects
              </TabsTrigger>
              <TabsTrigger value="invoices" className="text-lg">
                Invoices
              </TabsTrigger>
              <TabsTrigger value="messages" className="text-lg">
                Messages
              </TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="cyber-card overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            project.status === "Completed"
                              ? "bg-green-500/20 text-green-500"
                              : project.status === "In Progress"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {project.status}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Timeline</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-neon-teal" />
                            <span>
                              {project.startDate} to {project.dueDate}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-400 mb-1">Progress</p>
                          <div className="w-full bg-cyber-dark rounded-full h-2.5 mb-2">
                            <div
                              className="bg-gradient-to-r from-neon-teal to-neon-pink h-2.5 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-sm">{project.progress}%</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button className="cyber-button w-full">View Details</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices">
              <Card className="cyber-card overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Recent Invoices</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neon-teal/30">
                          <th className="text-left py-3 px-4">Invoice #</th>
                          <th className="text-left py-3 px-4">Project</th>
                          <th className="text-left py-3 px-4">Amount</th>
                          <th className="text-left py-3 px-4">Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b border-neon-teal/10 hover:bg-cyber-dark/50">
                            <td className="py-4 px-4">{invoice.id}</td>
                            <td className="py-4 px-4">{invoice.projectTitle}</td>
                            <td className="py-4 px-4">{invoice.amount}</td>
                            <td className="py-4 px-4">{invoice.date}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  invoice.status === "Paid"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-yellow-500/20 text-yellow-500"
                                }`}
                              >
                                {invoice.status}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <Button variant="outline" size="sm" className="cyber-button">
                                <FileText className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages">
              <Card className="cyber-card overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Recent Messages</h3>

                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 rounded-lg border ${
                          message.read ? "border-neon-teal/30 bg-cyber-dark/50" : "border-neon-teal bg-cyber-dark/80"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold mb-1">{message.subject}</h4>
                            <p className="text-sm text-gray-400">From: {message.from}</p>
                          </div>
                          <div className="text-sm text-gray-400">{message.date}</div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            {message.read ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                            )}
                            <span className={message.read ? "text-green-500" : "text-yellow-500"}>
                              {message.read ? "Read" : "Unread"}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" className="cyber-button">
                            Read Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}

