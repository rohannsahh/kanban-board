"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Task Management Dashboard</h1>
        <p className="text-xl">Manage your tasks efficiently with our Task List and Kanban Board.</p>
      </div>
      <Button onClick={()=>{ router.push('/auth/login')}}>Log in</Button>
    </div>
  );
}
