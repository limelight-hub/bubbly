import { GetServerSideProps } from "next"
import { Hash } from "lucide-react"

import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import { ServerLayout } from "@/components/server-layout"

interface ServerPageProps {
  server: {
    id: string
    name: string
    imageUrl: string
    channels: Array<{
      id: string
      name: string
      type: string
    }>
  }
}

export default function ServerPage({ server }: ServerPageProps) {
  return (
    <ServerLayout>
      <div className="bg-white dark:bg-[#313338] flex h-full">
        {/* Server channels sidebar */}
        <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0 left-[72px]">
          <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            {/* Server header */}
            <div className="px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 font-semibold">
              {server.name}
            </div>

            {/* Channels list */}
            <div className="flex-1 px-3 pt-4">
              <div className="mb-2">
                <div className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                  Text Channels
                </div>
              </div>
              <div className="space-y-[2px]">
                {server.channels.map((channel) => (
                  <button
                    key={channel.id}
                    className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1"
                  >
                    <Hash className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                    <p className="line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition">
                      {channel.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex flex-col flex-1 md:ml-60">
          {/* Chat header */}
          <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            {server.channels[0]?.name || "general"}
          </div>

          {/* Chat messages area */}
          <div className="flex-1 flex flex-col justify-end p-4">
            <div className="text-center mb-4">
              <div className="w-[75px] h-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 mx-auto mb-2 flex items-center justify-center">
                <Hash className="w-12 h-12 text-white" />
              </div>
              <p className="text-xl md:text-3xl font-bold">
                Welcome to #{server.channels[0]?.name || "general"}!
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                This is the start of the #
                {server.channels[0]?.name || "general"} channel.
              </p>
            </div>
          </div>

          {/* Message input */}
          <div className="px-4 pb-4">
            <div className="relative">
              <input
                type="text"
                disabled
                placeholder={`Message #${
                  server.channels[0]?.name || "general"
                }`}
                className="px-4 py-3 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </ServerLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serverId } = context.params!

  try {
    const profile = await initialProfile(context)

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        channels: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    })

    if (!server) {
      return {
        redirect: {
          destination: "/setup",
          permanent: false,
        },
      }
    }

    // Serialize the server data to fix JSON serialization error
    const serializedServer = {
      id: server.id,
      name: server.name,
      imageUrl: server.imageUrl,
      channels: server.channels.map((channel) => ({
        id: channel.id,
        name: channel.name,
        type: channel.type,
      })),
    }

    return {
      props: {
        server: serializedServer,
      },
    }
  } catch (error) {
    console.error("Error fetching server:", error)

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      }
    }

    return {
      redirect: {
        destination: "/setup",
        permanent: false,
      },
    }
  }
}
