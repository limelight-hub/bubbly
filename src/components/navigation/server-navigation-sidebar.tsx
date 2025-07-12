import { redirect } from "next/navigation";
import { currentUserProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ClientNavigationSidebar } from "./client-navigation-sidebar"; // 👈 tạo ở bước 2

export async function NavigationSidebar() {
  const profile = await currentUserProfile();

  if (!profile) return redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return <ClientNavigationSidebar servers={servers} />;
}
