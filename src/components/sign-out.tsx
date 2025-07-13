"use client"

import { useClerk } from "@clerk/nextjs"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function SignOutButtonCustom() {
  const { signOut } = useClerk()

  return (
    <Button
      onClick={() =>
        signOut(() => {
          window.location.href = "/"
        })
      }
      variant="destructive"
      size="sm"
      className="flex items-center gap-2 transition-all duration-200 ease-in-out transform group hover:scale-105"
    >
      <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      Sign Out
    </Button>
  )
}
