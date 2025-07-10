import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export const currentUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return null;
    }
    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
    return profile;
  } catch (error) {
    console.error("Error fetching current user profile:", error);
    return null;
  }
};
