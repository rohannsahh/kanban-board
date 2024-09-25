"use client"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/ModeToggle"
import { UserNav } from "@/components/user-nav"

export default function DashboardLayout({
  children
  
}: {
  children: React.ReactNode;

})

{

  
  return (

      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-6">
              <UserNav />
            </div>
            <div className="mx-2"><ModeToggle/></div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </main>
      </div>
  )
}

