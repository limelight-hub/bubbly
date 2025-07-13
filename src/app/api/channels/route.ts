// src/app/api/channels/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUserProfile } from "@/lib/current-profile";
import { ChannelType, MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const profile = await currentUserProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) return new NextResponse("Server ID Missing", { status: 400 });

    const { name, type } = await req.json();
    if (!name || !type || name === "general") {
      return new NextResponse("Invalid name or type", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id
          }
        }
      },
      include: {
        channels: true
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[CHANNELS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
