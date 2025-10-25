"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { UploadSection } from "@/components/upload-section"
import { SummaryCards } from "@/components/summary-cards"
import { AIChat } from "@/components/ai-chat"

export default function Home() {
  const [showSummary, setShowSummary] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-8">
            <div className="mb-8">
              <h1 className="mb-2 text-balance text-4xl font-bold text-foreground">AI Meeting Summarizer</h1>
              <p className="text-pretty text-lg text-muted-foreground">
                Upload your meeting recording and let AI handle the rest.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                {!showSummary ? <UploadSection onUploadComplete={() => setShowSummary(true)} /> : <SummaryCards />}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <AIChat />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-border bg-card py-6">
        <div className="mx-auto max-w-7xl px-8 text-center text-sm text-muted-foreground">
          © 2025 MeetMind | By shlok moondra
        </div>
      </footer>
    </div>
  )
}
