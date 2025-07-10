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

import "./globals.css"
import { Titlebar } from "@/components/titlebar"

const openSans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Bubbly Chat",
  description: "A modern chat application built with Tauri, Next.js, and Clerk."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <html lang="en">
        <body className={`${openSans.variable} antialiased`}>
          <div className="pt-10 pl-[72px]">
            <Titlebar />
            <div className="flex flex-1 overflow-hidden">
              {/* Add your sidebar here */}

              <div className="flex-1 overflow-auto">
                <NextSSRPlugin
                  routerConfig={extractRouterConfig(ourFileRouter)}
                />
                <header className="flex items-center justify-end h-16 gap-4 p-4">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton>
                      <button className="bg-[#3b3c45] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
