"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { invoke } from "@tauri-apps/api/tauri"
import {
  Album,
  CreditCard,
  Keyboard,
  ListMusic,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Podcast,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import { nanoid } from "nanoid"

import { listenNowAlbums, madeForYouAlbums, playlists } from "@/lib/data"
import { cn } from "@/lib/utils"
import { LeftMenu } from "@/components/left-menu"
import { Titlebar } from "@/components/titlebar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Album {
  name: string
  artist: string
  cover: string
}

function App() {
  const [greetMsg, setGreetMsg] = useState("")
  const [name, setName] = useState("")

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }))
  }

  useEffect(() => {
    // inspect console: Hello, World! You've been greeted from Rust!
    invoke("greet", { name: "World" }).then(console.log).catch(console.error)
  })

  return (
    <div className="h-screen overflow-hidden border rounded-md border-slate-200 dark:border-slate-800">
      <Titlebar />
      <div className="overflow-hidden transition-all bg-white dark:bg-slate-900">
        <div className="grid grid-cols-4 xl:grid-cols-5">
          <LeftMenu />
          <div className="col-span-3 border-l border-l-slate-200 dark:border-l-slate-700 xl:col-span-4">
            <div className="h-full px-8 py-6">
              <Tabs defaultValue="music" className="h-full space-y-6">
                <div className="flex items-center space-between">
                  <TabsList>
                    <TabsTrigger value="music" className="relative">
                      Music
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    <TabsTrigger value="live" disabled>
                      Live
                    </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto mr-4">
                    <h3 className="text-sm font-semibold">Welcome back</h3>
                  </div>
                  <div className="flex items-center justify-end h-16 gap-4 p-4">
                    <SignedOut>
                      <SignInButton />
                      <SignUpButton>
                        <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                          Sign Up
                        </button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                    </SignedIn>
                  </div>
                </div>
                <TabsContent value="music" className="p-0 border-none">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Listen Now
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Top picks for you. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <div className="relative flex space-x-4">
                      {listenNowAlbums.map((album) => (
                        <AlbumArtwork
                          key={nanoid()}
                          album={album}
                          className="w-[250px]"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Made for You
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Your personal playlists. Updated daily.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex pb-4 space-x-4">
                        {madeForYouAlbums.map((album) => (
                          <AlbumArtwork
                            key={nanoid()}
                            album={album}
                            className="w-[150px]"
                            aspectRatio={1 / 1}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                      <Podcast className="w-10 h-10 text-slate-400" />
                      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
                        No episodes added
                      </h3>
                      <p className="mt-2 mb-4 text-sm text-slate-500 dark:text-slate-400">
                        You have not added any podcasts. Add one below.
                      </p>
                      <Dialog>
                        <DialogTrigger>
                          <Button size="sm" className="relative">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Podcast
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Podcast</DialogTitle>
                            <DialogDescription>
                              Copy and paste the podcast feed URL to import.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="url">Podcast URL</Label>
                              <Input
                                id="url"
                                placeholder="https://example.com/feed.xml"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button>Import Podcast</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: number
}

function AlbumArtwork({
  album,
  aspectRatio = 2.8 / 4,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <AspectRatio
            ratio={aspectRatio}
            className="overflow-hidden rounded-md"
          >
            <Image
              src={album.cover}
              alt={album.name}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </AspectRatio>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <ListMusic className="w-4 h-4 mr-2" /> {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {album.artist}
        </p>
      </div>
    </div>
  )
}
