"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">MeetMind</div>
        </div>

        <div className="flex items-center gap-6">
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            Upload
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-primary">
            History
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/diverse-user-avatars.png" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
