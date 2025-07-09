import { GetServerSidePropsContext } from "next"
import { getAuth } from "@clerk/nextjs/server"

import { db } from "@/lib/db"

// load profile from db or create new one

export const initialProfile = async (context?: GetServerSidePropsContext) => {
  try {
    let userId: string | null = null

    if (context) {
      // For pages router (getServerSideProps)
      const auth = getAuth(context.req)
      userId = auth.userId
    }

    if (!userId) {
      throw new Error("UNAUTHORIZED")
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: userId,
      },
    })

    if (profile) {
      return profile
    }

    // We'll need to get user info from Clerk API for creating new profile
    // For now, create with minimal data
    const newProfile = await db.profile.create({
      data: {
        userId: userId,
        name: `User ${userId.slice(-4)}`, // Use last 4 chars of userId as temp name
        imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`,
        email: `${userId}@example.com`, // Temp email, will be updated when user provides info
      },
    })
    return newProfile
  } catch (error) {
    console.error("Error in initialProfile:", error)
    // If it's a prepared statement error, try to reconnect
    if (
      error instanceof Error &&
      error.message.includes("prepared statement")
    ) {
      console.log(
        "Prepared statement error detected, please restart the dev server"
      )
    }
    throw error // Re-throw to handle it upstream
  }
}
