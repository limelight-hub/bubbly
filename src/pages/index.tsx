import { GetServerSideProps } from "next"

import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"

export default function HomePage() {
  return (
    <div className="h-screen bg-gray-800 text-white flex">
      {/* Discord server sidebar */}
      <div className="w-[72px] bg-gray-900 flex flex-col items-center py-3 space-y-2">
        {/* Discord-like server icons */}
        <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all">
          <span className="text-white font-semibold">D</span>
        </div>
        <div className="w-8 h-px bg-gray-600"></div>
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 hover:rounded-xl transition-all">
          <span className="text-gray-300 text-lg">+</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Server channels sidebar */}
        <div className="w-60 bg-gray-700 flex flex-col">
          <div className="h-12 border-b border-gray-800 flex items-center px-4 font-semibold">
            Discord Clone
          </div>
          <div className="flex-1 p-2">
            <div className="text-xs uppercase text-gray-400 font-semibold mb-2 px-2">
              Text Channels
            </div>
            <div className="space-y-1">
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-600 cursor-pointer">
                <span className="text-gray-400 mr-2">#</span>
                <span>general</span>
              </div>
              <div className="flex items-center px-2 py-1 rounded hover:bg-gray-600 cursor-pointer">
                <span className="text-gray-400 mr-2">#</span>
                <span>random</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="h-12 border-b border-gray-800 flex items-center px-4">
            <span className="text-gray-400 mr-2">#</span>
            <span className="font-semibold">general</span>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4">
            <div className="text-center text-gray-400">
              <h2 className="text-2xl font-bold mb-2">
                Welcome to Discord Clone!
              </h2>
              <p>This is the beginning of your Discord-like chat experience.</p>
              <p className="mt-4 text-sm">
                Sign in to create your own servers and start chatting!
              </p>
            </div>
          </div>

          {/* Message input */}
          <div className="p-4">
            <div className="bg-gray-600 rounded-lg px-4 py-3">
              <input
                type="text"
                placeholder="Message #general"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const profile = await initialProfile(context)

    // Check if user has any servers
    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    })

    if (server) {
      return {
        redirect: {
          destination: `/servers/${server.id}`,
          permanent: false,
        },
      }
    }

    // If user has no servers, go to setup
    return {
      redirect: {
        destination: "/setup",
        permanent: false,
      },
    }
  } catch (error) {
    // If not authenticated, show the Discord clone preview
    return {
      props: {},
    }
  }
}
