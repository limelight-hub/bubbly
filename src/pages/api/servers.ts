import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import { nanoid } from "nanoid"

import { db } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { userId } = getAuth(req)

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const { name } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Server name is required" })
    }

    // Get or create profile
    let profile = await db.profile.findUnique({
      where: {
        userId: userId,
      },
    })

    if (!profile) {
      profile = await db.profile.create({
        data: {
          userId: userId,
          name: `User ${userId.slice(-4)}`,
          imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`,
          email: `${userId}@example.com`,
        },
      })
    }

    // Create the server
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name: name.trim(),
        imageUrl:
          "https://via.placeholder.com/256x256?text=" +
          encodeURIComponent(name.trim().charAt(0)),
        inviteCode: nanoid(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: "ADMIN" }],
        },
      },
    })

    // Return serialized data to avoid Date object issues
    return res.status(200).json({
      id: server.id,
      name: server.name,
      imageUrl: server.imageUrl,
      inviteCode: server.inviteCode,
    })
  } catch (error) {
    console.error("Error creating server:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
