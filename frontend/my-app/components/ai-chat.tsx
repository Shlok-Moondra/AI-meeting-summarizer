"use client"

import { useState } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AIChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages([...messages, { role: "user", content: message }])
    setMessage("")

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "I'm here to help you understand your meeting better. What would you like to know?",
        },
      ])
    }, 1000)
  }

  return (
    <Card className="flex h-full flex-col shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-accent/10 p-2">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-sm text-muted-foreground">Ask AI anything about your meeting...</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-3 text-sm ${
                  msg.role === "user"
                    ? "ml-auto max-w-[80%] bg-primary text-primary-foreground"
                    : "mr-auto max-w-[80%] bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your question..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
