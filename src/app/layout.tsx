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

import { ClientThemeProvider } from "@/components/providers/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import "./globals.css"
import { ModalProvider } from "@/components/providers/modal-provider"
import { QueryProvider } from "@/components/providers/query-provider"
import { SocketProvider } from "@/components/providers/socket-provider"
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
    <ClerkProvider appearance={{ cssLayerName: "clerk" }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${openSans.variable} antialiased`}>
          <ClientThemeProvider>
            <QueryProvider>
              <SocketProvider>
                <ModalProvider />
                <div className="h-screen overflow-clip">
                  <Titlebar />
                  <div className="flex flex-1 overflow-hidden">
                    <div className="flex-1 overflow-auto">
                      <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)}
                      />
                      {children}
                      <TailwindIndicator />
                    </div>
                  </div>
                </div>
              </SocketProvider>
            </QueryProvider>
          </ClientThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
