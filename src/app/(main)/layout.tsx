import React from "react";

import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

export default async function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="fixed top-10 left-0 z-30 flex flex-col h-[calc(100vh-40px)] w-[72px] bg-[#e3e5e8] dark:bg-[#1e1f22] space-y-4 items-center text-primary">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
}
