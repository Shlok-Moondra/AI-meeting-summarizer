"use client"

import { Copy, Download, CheckCircle2, Clock, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

const summaryData = [
  {
    id: "summary",
    icon: CheckCircle2,
    title: "Summary of Discussion",
    content:
      "The team discussed the Q1 product roadmap, focusing on three key initiatives: improving user onboarding flow, implementing advanced analytics dashboard, and expanding API capabilities. The marketing team presented their campaign strategy for the upcoming product launch, emphasizing social media engagement and content marketing. Budget allocation was approved for hiring two additional engineers.",
  },
  {
    id: "action-items",
    icon: ListTodo,
    title: "Action Items / Tasks",
    content:
      "• Sarah to finalize the wireframes for the new onboarding flow by Friday\n• Mike to prepare technical specifications for the analytics dashboard\n• Jennifer to schedule follow-up meetings with potential partners\n• Team leads to submit hiring requirements by end of week\n• Product team to review and prioritize feature requests from customer feedback",
  },
  {
    id: "deadlines",
    icon: Clock,
    title: "Deadlines Extracted",
    content:
      "• March 15: Complete user research interviews\n• March 22: Submit Q1 budget report\n• March 29: Launch beta version of analytics dashboard\n• April 5: Finalize marketing campaign materials\n• April 12: Begin hiring process for engineering positions",
  },
]

export function SummaryCards() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      {summaryData.map((item) => {
        const Icon = item.icon
        return (
          <Card key={item.id} className="animate-fade-in shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(item.content, item.id)}
                  className="h-8 w-8"
                >
                  {copiedId === item.id ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{item.content}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
