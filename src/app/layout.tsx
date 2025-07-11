import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { ourFileRouter } from "@/app/api/uploadthing/core"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Titlebar } from "@/components/titlebar"

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bubbly Chat",
  description:
    "A modern chat application built with Tauri, Next.js, and Clerk.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider
        appearance={{
          cssLayerName: "clerk",
        }}
      >
        <html lang="en">
          <body className={`${openSans.variable} antialiased`}>
            <div className="h-screen overflow-clip">
              <Titlebar />
              <div className="flex flex-1 overflow-hidden">
                {/* Add your sidebar here */}

                <div className="flex-1 overflow-auto">
                  <NextSSRPlugin
                    routerConfig={extractRouterConfig(ourFileRouter)}
                  />
                  {children}
                  <TailwindIndicator />
                </div>
              </div>
            </div>
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  )
}
