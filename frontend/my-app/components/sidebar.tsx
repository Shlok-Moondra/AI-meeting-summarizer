"use client"

import { useState } from "react"
import { Upload, FileText, Brain, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Upload, label: "Upload Recording", id: "upload" },
  { icon: FileText, label: "Summaries", id: "summaries" },
  { icon: Brain, label: "AI Insights", id: "insights" },
  { icon: Settings, label: "Settings", id: "settings" },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("upload")

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex flex-col gap-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                activeItem === item.id
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-foreground hover:bg-accent/50 hover:text-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
