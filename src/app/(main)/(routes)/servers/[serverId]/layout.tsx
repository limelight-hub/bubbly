import React from "react"
import { redirect } from "next/navigation"
import { RedirectToSignIn } from "@clerk/nextjs"

import { currentUserProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { ServerSidebar } from "@/components/server/server-sidebar"

export default async function ServerIdLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { serverId: string }
}) {
  const profile = await currentUserProfile()

  if (!profile) return RedirectToSignIn

  // Await params in Next.js 15
  const { serverId } = await params

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  })

  if (!server) return redirect("/")

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 flex-col hidden h-full md:flex w-60">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  )
}
