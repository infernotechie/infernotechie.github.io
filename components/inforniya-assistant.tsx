"use client"

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Maximize, Minimize, Volume2, VolumeX, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function InforniyaAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState("")
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Inforniya, your AI assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && window.speechSynthesis) {
      speechSynthesisRef.current = new SpeechSynthesisUtterance()

      // Set voice properties for clear and natural speech
      speechSynthesisRef.current.rate = 1
      speechSynthesisRef.current.pitch = 1
      speechSynthesisRef.current.volume = 1

      // Try to set a female voice if available
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        if (voices.length > 0 && speechSynthesisRef.current) {
          const femaleVoice = voices.find(
            (voice) =>
              voice.name.includes("female") ||
              voice.name.includes("Female") ||
              voice.name.includes("Samantha") ||
              voice.name.includes("Google UK English Female")
          )
          if (femaleVoice) {
            speechSynthesisRef.current.voice = femaleVoice
          }
        }
      }

      loadVoices()

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices
      }
    }

    // Initialize speech recognition if available
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          // Auto-submit after a short delay
          setTimeout(() => {
            handleSendMessage(transcript)
          }, 500)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }
      }
    }

    return () => {
      if (window.speechSynthesis && speechSynthesisRef.current) {
        window.speechSynthesis.cancel()
      }

      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }

      if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [])

  // Speak the message using speech synthesis
  const speakMessage = (text: string) => {
    if (audioEnabled && window.speechSynthesis && speechSynthesisRef.current) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      // Set the text to speak
      speechSynthesisRef.current.text = text

      // Speak the text clearly as a helping assistant
      window.speechSynthesis.speak(speechSynthesisRef.current)
    }
  }

  // Toggle audio functionality
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)

    if (!audioEnabled && messages.length > 0) {
      // Speak the last assistant message when enabling audio
      const lastAssistantMessage = [...messages].reverse().find((m) => m.sender === "assistant")
      if (lastAssistantMessage) {
        speakMessage(lastAssistantMessage.content)
      }
    } else if (audioEnabled) {
      // Stop speaking when disabling audio
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }

  // Toggle microphone functionality
  const toggleMic = () => {
    if (!micEnabled) {
      setMicEnabled(true)
      return
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      setIsListening(false)
    } else {
      startListening()
    }
  }

  // Start listening for speech input
  const startListening = () => {
    if (recognitionRef.current && micEnabled) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error("Speech recognition error:", error)
      }
    }
  }

  // Handle sending a message (from text input or speech)
  const handleSendMessage = async (speechText?: string) => {
    const messageText = speechText || input

    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      // Process the user's message using basic natural language processing (text normalization)
      const lowerInput = messageText.toLowerCase()
      let response = ""
      let shouldRedirect = false
      let redirectPath = ""

      // Security monitoring message
      if (lowerInput.includes("hack") || lowerInput.includes("security") || lowerInput.includes("protect")) {
        response =
          "I'm constantly monitoring the website for security threats. Our systems use advanced encryption and security protocols to protect all user data and prevent unauthorized access."
      }
      // Services related queries
      else if (lowerInput.includes("services") || lowerInput.includes("what do you offer")) {
        response =
          "We offer Web Design, Web App Development, Android App Development, Graphics Design, Video Editing, Content Creation, and AI/ML solutions. Would you like to know more about any specific service?"
      }
      // Contact information
      else if (
        lowerInput.includes("contact") ||
        lowerInput.includes("reach") ||
        lowerInput.includes("email") ||
        lowerInput.includes("phone")
      ) {
        response =
          "You can contact us at contact@infernotechie.com or call +91 7400164856. Would you like me to navigate you to our contact page?"
      }
      // Career opportunities
      else if (
        lowerInput.includes("job") ||
        lowerInput.includes("career") ||
        lowerInput.includes("work") ||
        lowerInput.includes("hiring")
      ) {
        response =
          "We have several job openings at InfernoTechie including Senior Frontend Developer, Backend Developer, UI/UX Designer, and Mobile App Developer. Would you like me to navigate you to our careers page?"
      }
      // About the company
      else if (lowerInput.includes("about") && lowerInput.includes("company") && !lowerInput.includes("founder")) {
        response =
          "InfernoTechie is a premier IT company where passion ignites technology. We specialize in creating innovative digital solutions for businesses of all sizes. Would you like to know more about our company?"
      }
      // Pricing information
      else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("how much")) {
        response =
          "Our pricing varies based on project requirements. We offer competitive rates and flexible pricing models including fixed price, hourly, and retainer options. Would you like to discuss a specific service for a custom quote?"
      }
      // Login help
      else if (lowerInput.includes("login") || lowerInput.includes("sign in") || lowerInput.includes("account")) {
        response =
          "You can login to your account from our login page. If you're an admin, use the credentials provided to you. Would you like me to navigate you to the login page?"
      }
      // Project showcase
      else if (
        lowerInput.includes("project") ||
        lowerInput.includes("portfolio") ||
        lowerInput.includes("work") ||
        lowerInput.includes("showcase")
      ) {
        response =
          "We have a diverse portfolio of projects including E-Commerce Platforms, Mobile Apps, AI Solutions, and more. Would you like me to show you our projects page?"
      }
      // Admin panel
      else if (lowerInput.includes("admin") || lowerInput.includes("dashboard") || lowerInput.includes("manage")) {
        response =
          "The admin panel is accessible only to authorized personnel. If you're an admin, you can login with your credentials. The admin panel allows you to manage services, projects, client requests, and more."
      }
      // Theme related
      else if (
        lowerInput.includes("theme") ||
        lowerInput.includes("color") ||
        lowerInput.includes("dark") ||
        lowerInput.includes("light")
      ) {
        response =
          "You can change the website theme by clicking on the InfernoTechie logo in the top left corner. This will toggle between our default theme and cosmic theme with a cool water drop animation."
      }
      // New conditions for website/company and human-like responses
      else if (
        lowerInput.includes("created this website") ||
        lowerInput.includes("creator of this website") ||
        lowerInput.includes("Website creator") ||
        lowerInput.includes("Who made")
      ) {
        response =
          "Ravi Sir is the Creator of our Website. He is the Co-fouder and CEO of the website. Anything else? I'm here to help you navigate our website and learn more about InfernoTechie's services. Feel free to ask about our services, projects, career opportunities, or how to contact us."
      }
      else if (lowerInput.includes("how are you")) {
        response =
          "I am fine, well and good! Thank you. What about you? I'm here to help you navigate our website and learn more about InfernoTechie's services. Feel free to ask about our services, projects, career opportunities, or how to contact us."
      }
      else if (
        lowerInput.includes("created this company") ||
        lowerInput.includes("creator of this company") ||
	      lowerInput.includes("created") ||
	      lowerInput.includes("creator")

      ) {
        response =
          "Shivam Sir and Ravi Sir and his teams are the creators of our Infernotechie. Anything else? I'm here to help you navigate our website and learn more about InfernoTechie's services. Feel free to ask about our services, projects, career opportunities, or how to contact us."
      }
      else if (lowerInput.includes("founder of the company")) {
        response =
          "Shivam Sir is the founder of the company. He started our INFERNOTECHIE company along with his best friend Ravi Sir, Riya, and Avinash Sir. You can see more details on the about page. Anything else? I'm here to help you."
        if (lowerInput.includes("about") || lowerInput.includes("navigate")) {
          shouldRedirect = true
          redirectPath = "/about"
        }
      }
      else if (lowerInput.includes("co founder of the company") || lowerInput.includes("co-founder of the company") || lowerInput.includes("co-founder")) {
        response =
          "Ravi Sir and Riya Choudhary are the co-founders of the company. You can see more details on the about page. Anything else? I'm here to help you."
        if (lowerInput.includes("about") || lowerInput.includes("navigate")) {
          shouldRedirect = true
          redirectPath = "/about"
        }
      }
      else if (
        lowerInput.includes("mentor") ||
        lowerInput.includes("advisor") ||
        lowerInput.includes("advisior")
      ) {
        response =
          "Avinash Sir is the Mentor and Advisor of Infernotechie. You can see more details on the about page. Anything else? I'm here to help you."
        if (lowerInput.includes("about") || lowerInput.includes("navigate")) {
          shouldRedirect = true
          redirectPath = "/about"
        }
      }
      // Additional common questions
      else if (
        lowerInput.includes("what is infernotechie") ||
        lowerInput.includes("who is infernotechie") ||
        lowerInput.includes("about infernotechie")
      ) {
        response =
          "Infernotechie is a leading IT solutions provider offering innovative digital solutions including web design, app development, and AI/ML services. Would you like to know more?"
      }
      else if (lowerInput.includes("quote") || lowerInput.includes("estimate")) {
        response =
          "For a personalized quote, please reach out via our contact page or email us at contact@infernotechie.com with your project details."
      }
      else if (lowerInput.includes("industries") || lowerInput.includes("sectors")) {
        response =
          "We serve a wide range of industries including healthcare, education, finance, retail, and more. Would you like more details on our expertise in a specific sector?"
      }
      // Navigation requests
      else if (
        lowerInput.includes("go to") ||
        lowerInput.includes("show me") ||
        lowerInput.includes("navigate") ||
        lowerInput.includes("take me")
      ) {
        if (lowerInput.includes("home")) {
          response = "Taking you to the home page."
          shouldRedirect = true
          redirectPath = "/"
        } else if (lowerInput.includes("service")) {
          response = "Taking you to the services page."
          shouldRedirect = true
          redirectPath = "/services"
        } else if (lowerInput.includes("project")) {
          response = "Taking you to the projects page."
          shouldRedirect = true
          redirectPath = "/projects"
        } else if (lowerInput.includes("contact")) {
          response = "Taking you to the contact page."
          shouldRedirect = true
          redirectPath = "/contact"
        } else if (lowerInput.includes("about")) {
          response = "Taking you to the about page."
          shouldRedirect = true
          redirectPath = "/about"
        } else if (lowerInput.includes("career")) {
          response = "Taking you to the careers page."
          shouldRedirect = true
          redirectPath = "/careers"
        } else if (lowerInput.includes("login") || lowerInput.includes("sign in")) {
          response = "Taking you to the login page."
          shouldRedirect = true
          redirectPath = "/login"
        } else if (lowerInput.includes("admin") || lowerInput.includes("dashboard")) {
          response = "Taking you to the admin login page."
          shouldRedirect = true
          redirectPath = "/login"
        }
      }
      // Confirmation responses
      else if (lowerInput.includes("yes")) {
        const lastMessage = messages[messages.length - 1]
        if (lastMessage && lastMessage.sender === "assistant") {
          if (lastMessage.content.includes("contact page")) {
            response = "Great! I'll take you to our contact page."
            shouldRedirect = true
            redirectPath = "/contact"
          } else if (lastMessage.content.includes("careers page")) {
            response = "Great! I'll take you to our careers page."
            shouldRedirect = true
            redirectPath = "/careers"
          } else if (lastMessage.content.includes("about page")) {
            response = "Great! I'll take you to our about page."
            shouldRedirect = true
            redirectPath = "/about"
          } else if (lastMessage.content.includes("projects page")) {
            response = "Great! I'll take you to our projects page."
            shouldRedirect = true
            redirectPath = "/projects"
          } else if (lastMessage.content.includes("login page")) {
            response = "Great! I'll take you to our login page."
            shouldRedirect = true
            redirectPath = "/login"
          } else if (lastMessage.content.includes("specific service")) {
            response = "Great! Let me know which service you're interested in, and I'll provide more details."
          }
        }
      }
      // Default response
      else {
        response =
          "Thank you for your message. I'm here to help you navigate our website and learn more about InfernoTechie's services. Feel free to ask about our services, projects, career opportunities, or how to contact us."
      }

      // Simulate typing delay
      setTimeout(() => {
        const assistantMessage: Message = {
          id: Date.now().toString() + "-response",
          content: response,
          sender: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)

        // Speak the response if audio is enabled
        speakMessage(response)

        // Handle redirection after a short delay
        if (shouldRedirect) {
          setTimeout(() => {
            router.push(redirectPath)
          }, 1500)
        }
      }, 1500)
    } catch (error) {
      console.error("Error processing message:", error)
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-neon-teal to-neon-pink rounded-full p-4 shadow-lg hover:shadow-neon-teal transition-all duration-300 animate-pulse"
          aria-label="Open AI Assistant"
        >
          <Bot className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-cyber-dark border border-neon-teal/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
            isExpanded ? "inset-4 md:inset-10" : "bottom-6 right-6 w-80 md:w-96 h-[500px]"
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-neon-teal to-neon-pink p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-white" />
              <h3 className="font-bold text-white">Inforniya Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAudio}
                className="text-white hover:text-cyber-dark transition-colors"
                aria-label={audioEnabled ? "Disable voice" : "Enable voice"}
              >
                {audioEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleMic}
                className={`text-white hover:text-cyber-dark transition-colors ${isListening ? "animate-pulse" : ""}`}
                aria-label={micEnabled ? (isListening ? "Stop listening" : "Start listening") : "Enable microphone"}
              >
                {micEnabled ? (
                  isListening ? (
                    <Mic className="h-5 w-5" />
                  ) : (
                    <MicOff className="h-5 w-5" />
                  )
                ) : (
                  <Mic className="h-5 w-5 opacity-50" />
                )}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white hover:text-cyber-dark transition-colors"
                aria-label={isExpanded ? "Minimize" : "Maximize"}
              >
                {isExpanded ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-cyber-dark transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 h-[calc(100%-128px)] overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "user" ? "bg-neon-teal/20 text-white" : "bg-neon-pink/20 text-white"
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 text-left">
                <div className="inline-block rounded-lg px-4 py-2 bg-neon-pink/20 text-white">
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse delay-75 mr-1"></span>
                  <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse delay-150"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neon-teal/30">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                type="text"
                placeholder={isListening ? "Listening..." : "Type your message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`cyber-input flex-1 ${isListening ? "animate-pulse border-neon-teal" : ""}`}
                disabled={isListening}
              />
              <Button type="submit" className="cyber-button" disabled={isTyping || (!input.trim() && !isListening)}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            {micEnabled && (
              <div className="text-xs text-center mt-2 text-gray-400">
                {isListening ? "Listening... Click the microphone icon to stop" : "Click the microphone icon to speak"}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
