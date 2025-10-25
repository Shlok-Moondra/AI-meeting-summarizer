"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileAudio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadSectionProps {
  onUploadComplete: () => void
}

export function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            onUploadComplete()
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="space-y-6">
      <Card
        className={cn(
          "border-2 border-dashed transition-all",
          isDragging ? "border-accent bg-accent/5" : "border-border bg-card",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 rounded-full bg-accent/10 p-6">
            {selectedFile ? (
              <FileAudio className="h-12 w-12 text-accent" />
            ) : (
              <Upload className="h-12 w-12 text-accent" />
            )}
          </div>

          {selectedFile ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Drop your recording here</h3>
              <p className="mb-4 text-sm text-muted-foreground">or click to browse files</p>
            </>
          )}

          <input type="file" id="file-upload" className="hidden" accept=".mp3,.mp4,.wav" onChange={handleFileSelect} />

          {!selectedFile && (
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer bg-transparent" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          )}
        </div>
      </Card>

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Processing...</span>
            <span className="font-medium text-foreground">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {selectedFile && !isUploading && (
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleUpload}
            className="w-full max-w-md rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Upload & Summarize
          </Button>
          <p className="text-xs text-muted-foreground">Supports .mp3, .mp4, .wav formats</p>
        </div>
      )}
    </div>
  )
}
