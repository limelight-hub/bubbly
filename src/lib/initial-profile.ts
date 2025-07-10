import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// load profile from db or create new one

export const initialProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    })
    return newProfile;
  } catch (error) {
    console.error("Error in initialProfile:", error);
    // If it's a prepared statement error, try to reconnect
    if (error instanceof Error && error.message.includes("prepared statement")) {
      console.log("Prepared statement error detected, please restart the dev server");
    }
    throw error; // Re-throw to handle it upstream
  }
};
