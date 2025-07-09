import { GetServerSideProps } from "next"

import { db } from "@/lib/db"
import { initialProfile } from "@/lib/initial-profile"
import InitialModal from "@/components/modals/initial-modal"

interface SetupPageProps {}

export default function SetupPage(props: SetupPageProps) {
  return <InitialModal />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const profile = await initialProfile(context)

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

    return {
      props: {}, // you could pass data here if needed
    }
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return {
        redirect: {
          destination: "/sign-in",
          permanent: false,
        },
      }
    }
    throw error
  }
}
