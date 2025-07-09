"use client"

import { useState } from "react"
import { useRouter } from "next/router"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const InitialModal = () => {
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    try {
      setIsLoading(true)

      const response = await fetch("/api/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      if (response.ok) {
        const server = await response.json()
        router.push(`/servers/${server.id}`)
      }
    } catch (error) {
      console.error("Error creating server:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Your First Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a name to get started. You can always change it
            later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-8 px-6">
            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                Server name
              </Label>
              <Input
                disabled={isLoading}
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                placeholder="Enter server name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4">
            <Button
              disabled={isLoading || !name.trim()}
              type="submit"
              variant="default"
              className="w-full"
            >
              {isLoading ? "Creating..." : "Create Server"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InitialModal
