"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Create Firebase context
type FirebaseContextType = {
  user: any | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
})

export const useFirebase = () => {
  return useContext(FirebaseContext)
}

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    // In a real app, this would authenticate with Firebase
    setUser({ email, uid: "123", displayName: "Demo User" })
  }

  // Mock sign out function
  const signOut = async () => {
    setUser(null)
  }

  useEffect(() => {
    // Simulate auth state check
    const checkAuth = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(checkAuth)
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

