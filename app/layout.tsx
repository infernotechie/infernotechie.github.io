import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/ui/custom-cursor"
import { FirebaseProvider } from "@/lib/firebase/firebase-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InfernoTechie - Where Passion Ignites Technology",
  description:
    "Premier IT services including web design, app development, AI/ML solutions, graphics design, video editing, and content creation.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Initialize theme
          (function() {
            try {
              const savedTheme = localStorage.getItem('infernotechie-theme');
              if (savedTheme) {
                document.documentElement.classList.add(savedTheme);
              }
              
              // Set up event listener for theme changes
              document.addEventListener('themeChange', function(e) {
                const newTheme = e.detail.theme;
                localStorage.setItem('infernotechie-theme', newTheme);
                
                // Set mouse position for water drop effect
                document.documentElement.style.setProperty('--x', e.detail.x + 'px');
                document.documentElement.style.setProperty('--y', e.detail.y + 'px');
              });
            } catch (e) {
              console.error('Theme initialization error:', e);
            }
          })();
        `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <FirebaseProvider>
            <CustomCursor />
            {children}
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'