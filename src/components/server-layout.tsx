import { ReactNode } from "react"
import { GetServerSidePropsContext } from "next"

interface ServerLayoutProps {
  children: ReactNode
  context?: GetServerSidePropsContext
}

export function ServerLayout({ children, context }: ServerLayoutProps) {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        {/* Server Sidebar will go here */}
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
          {/* Placeholder for now */}
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all">
            <span className="text-white font-semibold">D</span>
          </div>
        </div>
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  )
}
