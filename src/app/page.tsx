import { redirect } from "next/navigation"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { initialProfile } from "@/lib/initial-profile"

export default async function HomePage() {
  // If user is authenticated, try to get their profile and redirect to main app
  try {
    const profile = await initialProfile()
    if (profile) {
      // Redirect to main Discord-like interface
      redirect("/servers")
    }
  } catch (error) {
    // If there's an error (likely user not authenticated), show landing page
    console.log("User not authenticated, showing landing page")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <SignedOut>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Welcome to Discord Clone
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                Connect with friends, join communities, and chat in real-time.
                Your place to talk and hang out.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
                <button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full text-lg transition-colors w-full md:w-auto">
                  Sign in to get started
                </button>
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Welcome back!
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Loading your Discord experience...
              </p>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  )
}
