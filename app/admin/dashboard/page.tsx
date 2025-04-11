"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Edit,
  Trash,
  Plus,
  Save,
  X,
  Code,
  Smartphone,
  Palette,
  Video,
  Brain,
} from "lucide-react"
import Logo3D from "@/components/logo-3d"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  // Services state
  const [services, setServices] = useState([
    {
      id: "web-design",
      title: "Web Design",
      description: "Stunning, responsive websites that captivate your audience and drive conversions.",
      icon: <Code className="h-10 w-10 text-neon-teal" />,
      isEditing: false,
    },
    {
      id: "web-app-development",
      title: "Web App Development",
      description: "Powerful, scalable web applications built with cutting-edge technologies.",
      icon: <Code className="h-10 w-10 text-neon-teal" />,
      isEditing: false,
    },
    {
      id: "android-app-development",
      title: "Android App Development",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
      icon: <Smartphone className="h-10 w-10 text-neon-teal" />,
      isEditing: false,
    },
    {
      id: "graphics-design",
      title: "Graphics Design",
      description: "Eye-catching visuals that strengthen your brand identity and messaging.",
      icon: <Palette className="h-10 w-10 text-neon-teal" />,
      isEditing: false,
    },
    {
      id: "video-editing",
      title: "Video Editing",
      description: "Professional video editing services that bring your stories to life.",
      icon: <Video className="h-10 w-10 text-neon-teal" />,
      isEditing: false,
    },
    {
      id: "ai-ml",
      title: "AI/ML Solutions",
      description: "Cutting-edge artificial intelligence and machine learning solutions for your business.",
      icon: <Brain className="h-10 w-10 text-neon-teal" />,
      isEditing: false,
    },
  ])

  // Projects state
  const [projects, setProjects] = useState([
    {
      id: "project1",
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment integration, inventory management, and analytics.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web Development",
      isEditing: false,
    },
    {
      id: "project2",
      title: "Mobile Banking App",
      description:
        "Secure, intuitive mobile banking application with biometric authentication and real-time notifications.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Mobile App",
      isEditing: false,
    },
    {
      id: "project3",
      title: "AI-Powered Analytics Dashboard",
      description:
        "Interactive dashboard with AI-driven insights, predictive analytics, and customizable visualizations.",
      image: "/placeholder.svg?height=400&width=600",
      category: "AI/ML",
      isEditing: false,
    },
  ])

  // Client requests state
  const [clientRequests, setClientRequests] = useState([
    {
      id: "req1",
      name: "John Smith",
      email: "john@example.com",
      service: "Web Design",
      status: "New",
      date: "2023-11-15",
    },
    {
      id: "req2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      service: "Mobile App Development",
      status: "In Progress",
      date: "2023-11-10",
    },
    {
      id: "req3",
      name: "Michael Brown",
      email: "michael@example.com",
      service: "AI/ML Solutions",
      status: "Completed",
      date: "2023-11-05",
    },
  ])

  // New service form state
  const [newService, setNewService] = useState({
    title: "",
    description: "",
  })

  // New project form state
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
  })

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = () => {
      const isAdmin = localStorage.getItem("infernotechie_admin")
      const userData = localStorage.getItem("infernotechie_user")

      if (isAdmin === "true" && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsLoading(false)
        } catch (error) {
          console.error("Error parsing user data:", error)
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
    }

    checkAdmin()
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("infernotechie_admin")
    localStorage.removeItem("infernotechie_user")
    router.push("/login")
  }

  // Service management functions
  const toggleServiceEdit = (id: string) => {
    setServices(
      services.map((service) => (service.id === id ? { ...service, isEditing: !service.isEditing } : service)),
    )
  }

  const updateService = (id: string, field: string, value: string) => {
    setServices(services.map((service) => (service.id === id ? { ...service, [field]: value } : service)))
  }

  const deleteService = (id: string) => {
    setServices(services.filter((service) => service.id !== id))
  }

  const addNewService = () => {
    if (newService.title && newService.description) {
      const newId = `service-${Date.now()}`
      setServices([
        ...services,
        {
          id: newId,
          title: newService.title,
          description: newService.description,
          icon: <Code className="h-10 w-10 text-neon-teal" />,
          isEditing: false,
        },
      ])
      setNewService({ title: "", description: "" })
    }
  }

  // Project management functions
  const toggleProjectEdit = (id: string) => {
    setProjects(
      projects.map((project) => (project.id === id ? { ...project, isEditing: !project.isEditing } : project)),
    )
  }

  const updateProject = (id: string, field: string, value: string) => {
    setProjects(projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const addNewProject = () => {
    if (newProject.title && newProject.description && newProject.category) {
      const newId = `project-${Date.now()}`
      setProjects([
        ...projects,
        {
          id: newId,
          title: newProject.title,
          description: newProject.description,
          category: newProject.category,
          image: "/placeholder.svg?height=400&width=600",
          isEditing: false,
        },
      ])
      setNewProject({ title: "", description: "", category: "" })
    }
  }

  // Client request management functions
  const updateRequestStatus = (id: string, status: string) => {
    setClientRequests(clientRequests.map((request) => (request.id === id ? { ...request, status } : request)))
  }

  const deleteRequest = (id: string) => {
    setClientRequests(clientRequests.filter((request) => request.id !== id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neon-teal text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-cyber-darker border-r border-neon-teal/20 p-4 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <Logo3D size={40} />
          <div>
            <h2 className="font-bold text-lg">InfernoTechie</h2>
            <p className="text-xs text-neon-teal">Admin Panel</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-2 p-3 rounded-md transition-colors ${
              activeTab === "dashboard" ? "bg-neon-teal/20 text-neon-teal" : "hover:bg-cyber-dark"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`w-full flex items-center gap-2 p-3 rounded-md transition-colors ${
              activeTab === "services" ? "bg-neon-teal/20 text-neon-teal" : "hover:bg-cyber-dark"
            }`}
          >
            <Code className="h-5 w-5" />
            <span>Services</span>
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full flex items-center gap-2 p-3 rounded-md transition-colors ${
              activeTab === "projects" ? "bg-neon-teal/20 text-neon-teal" : "hover:bg-cyber-dark"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            className={`w-full flex items-center gap-2 p-3 rounded-md transition-colors ${
              activeTab === "clients" ? "bg-neon-teal/20 text-neon-teal" : "hover:bg-cyber-dark"
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Client Requests</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-2 p-3 rounded-md transition-colors ${
              activeTab === "settings" ? "bg-neon-teal/20 text-neon-teal" : "hover:bg-cyber-dark"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="mt-auto pt-8">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 p-3 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-cyber-darker border-t border-neon-teal/20 p-2 md:hidden z-50">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`p-2 rounded-md ${activeTab === "dashboard" ? "text-neon-teal" : ""}`}
          >
            <LayoutDashboard className="h-6 w-6" />
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`p-2 rounded-md ${activeTab === "services" ? "text-neon-teal" : ""}`}
          >
            <Code className="h-6 w-6" />
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`p-2 rounded-md ${activeTab === "projects" ? "text-neon-teal" : ""}`}
          >
            <FileText className="h-6 w-6" />
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            className={`p-2 rounded-md ${activeTab === "clients" ? "text-neon-teal" : ""}`}
          >
            <Users className="h-6 w-6" />
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`p-2 rounded-md ${activeTab === "settings" ? "text-neon-teal" : ""}`}
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto pb-20 md:pb-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              {activeTab === "dashboard" && "Admin Dashboard"}
              {activeTab === "services" && "Manage Services"}
              {activeTab === "projects" && "Manage Projects"}
              {activeTab === "clients" && "Client Requests"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <p className="text-gray-400">Welcome back, {user?.name || "Admin"}</p>
          </div>

          <div className="md:hidden">
            <button onClick={handleSignOut} className="p-2 text-red-400">
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Services</h3>
                <div className="text-4xl font-bold mb-4">{services.length}</div>
                <p className="text-gray-400 mb-4">Total services offered</p>
                <Button onClick={() => setActiveTab("services")} className="cyber-button w-full">
                  Manage Services
                </Button>
              </div>
            </Card>

            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Projects</h3>
                <div className="text-4xl font-bold mb-4">{projects.length}</div>
                <p className="text-gray-400 mb-4">Total projects showcased</p>
                <Button onClick={() => setActiveTab("projects")} className="cyber-button w-full">
                  Manage Projects
                </Button>
              </div>
            </Card>

            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Client Requests</h3>
                <div className="text-4xl font-bold mb-4">{clientRequests.length}</div>
                <p className="text-gray-400 mb-4">Total client inquiries</p>
                <Button onClick={() => setActiveTab("clients")} className="cyber-button w-full">
                  View Requests
                </Button>
              </div>
            </Card>

            <Card className="cyber-card md:col-span-2 lg:col-span-3">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 border border-neon-teal/20 rounded-lg">
                    <div className="bg-neon-teal/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-neon-teal" />
                    </div>
                    <div>
                      <p className="font-medium">New client request received</p>
                      <p className="text-sm text-gray-400">John Smith requested a Web Design service</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border border-neon-teal/20 rounded-lg">
                    <div className="bg-neon-teal/20 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-neon-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Project updated</p>
                      <p className="text-sm text-gray-400">E-Commerce Platform project details were updated</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 border border-neon-teal/20 rounded-lg">
                    <div className="bg-neon-teal/20 p-2 rounded-full">
                      <Code className="h-5 w-5 text-neon-teal" />
                    </div>
                    <div>
                      <p className="font-medium">Service added</p>
                      <p className="text-sm text-gray-400">New service "AI/ML Solutions" was added</p>
                      <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Services Management */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Add New Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="serviceTitle" className="block text-sm font-medium mb-2">
                      Service Title
                    </label>
                    <Input
                      id="serviceTitle"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      placeholder="Enter service title"
                      className="cyber-input w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="serviceDescription" className="block text-sm font-medium mb-2">
                      Service Description
                    </label>
                    <Textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Enter service description"
                      className="cyber-input w-full"
                    />
                  </div>
                </div>

                <Button
                  onClick={addNewService}
                  className="cyber-button mt-6"
                  disabled={!newService.title || !newService.description}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="cyber-card">
                  <div className="p-6">
                    {service.isEditing ? (
                      <>
                        <Input
                          value={service.title}
                          onChange={(e) => updateService(service.id, "title", e.target.value)}
                          className="cyber-input w-full mb-4"
                        />
                        <Textarea
                          value={service.description}
                          onChange={(e) => updateService(service.id, "description", e.target.value)}
                          className="cyber-input w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => toggleServiceEdit(service.id)}
                            variant="outline"
                            className="cyber-button"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={() => toggleServiceEdit(service.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => toggleServiceEdit(service.id)}
                            variant="outline"
                            className="cyber-button"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteService(service.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Projects Management */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Add New Project</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="projectTitle" className="block text-sm font-medium mb-2">
                      Project Title
                    </label>
                    <Input
                      id="projectTitle"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="Enter project title"
                      className="cyber-input w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectCategory" className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <Input
                      id="projectCategory"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      placeholder="Enter project category"
                      className="cyber-input w-full"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="projectDescription" className="block text-sm font-medium mb-2">
                      Project Description
                    </label>
                    <Textarea
                      id="projectDescription"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Enter project description"
                      className="cyber-input w-full"
                    />
                  </div>
                </div>

                <Button
                  onClick={addNewProject}
                  className="cyber-button mt-6"
                  disabled={!newProject.title || !newProject.description || !newProject.category}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="cyber-card">
                  <div className="p-6">
                    {project.isEditing ? (
                      <>
                        <Input
                          value={project.title}
                          onChange={(e) => updateProject(project.id, "title", e.target.value)}
                          className="cyber-input w-full mb-4"
                        />
                        <Input
                          value={project.category}
                          onChange={(e) => updateProject(project.id, "category", e.target.value)}
                          className="cyber-input w-full mb-4"
                        />
                        <Textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, "description", e.target.value)}
                          className="cyber-input w-full mb-4"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => toggleProjectEdit(project.id)}
                            variant="outline"
                            className="cyber-button"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            onClick={() => toggleProjectEdit(project.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-neon-teal text-cyber-dark px-2 py-1 rounded-full text-xs font-bold">
                            {project.category}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-300 mb-6">{project.description}</p>
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => toggleProjectEdit(project.id)}
                            variant="outline"
                            className="cyber-button"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => deleteProject(project.id)}
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Client Requests */}
        {activeTab === "clients" && (
          <Card className="cyber-card">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-6">Client Requests</h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neon-teal/30">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Service</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientRequests.map((request) => (
                      <tr key={request.id} className="border-b border-neon-teal/10 hover:bg-cyber-dark/50">
                        <td className="py-4 px-4">{request.name}</td>
                        <td className="py-4 px-4">{request.email}</td>
                        <td className="py-4 px-4">{request.service}</td>
                        <td className="py-4 px-4">{request.date}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              request.status === "New"
                                ? "bg-blue-500/20 text-blue-500"
                                : request.status === "In Progress"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-green-500/20 text-green-500"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <select
                              className="cyber-input text-xs py-1"
                              value={request.status}
                              onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                            <Button
                              onClick={() => deleteRequest(request.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Account Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="adminName" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input id="adminName" defaultValue="Admin User" className="cyber-input w-full" />
                  </div>

                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input id="adminEmail" defaultValue="Access@admin" className="cyber-input w-full" />
                  </div>

                  <div>
                    <label htmlFor="adminPassword" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <Input
                      id="adminPassword"
                      type="password"
                      defaultValue="Password@admin123"
                      className="cyber-input w-full"
                    />
                  </div>

                  <Button className="cyber-button w-full mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="cyber-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Website Settings</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="siteName" className="block text-sm font-medium mb-2">
                      Website Name
                    </label>
                    <Input id="siteName" defaultValue="InfernoTechie" className="cyber-input w-full" />
                  </div>

                  <div>
                    <label htmlFor="siteDescription" className="block text-sm font-medium mb-2">
                      Website Description
                    </label>
                    <Textarea
                      id="siteDescription"
                      defaultValue="Premier IT services including web design, app development, AI/ML solutions, graphics design, video editing, and content creation."
                      className="cyber-input w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
                      Contact Email
                    </label>
                    <Input id="contactEmail" defaultValue="contact@infernotechie.com" className="cyber-input w-full" />
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">
                      Contact Phone
                    </label>
                    <Input id="contactPhone" defaultValue="+91 7400164856" className="cyber-input w-full" />
                  </div>

                  <Button className="cyber-button w-full mt-4">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

