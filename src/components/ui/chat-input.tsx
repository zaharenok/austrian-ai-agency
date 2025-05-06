"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

interface ChatInputProps {
  onSubmit: (message: string) => void
  placeholder?: string
}

export function ChatInput({
  onSubmit,
  placeholder = "Type your message...",
}: ChatInputProps) {
  const [input, setInput] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input)
      setInput("")
    }
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-2 border rounded"
      />
      <Button type="submit" onClick={handleSubmit}>Send</Button>
    </div>
  )
}
