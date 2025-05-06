import React from "react"
import { ChatBubble } from "@/components/ui/chat-bubble"

interface ChatMessageListProps {
  children: React.ReactNode
}

export function ChatMessageList({
  children,
}: ChatMessageListProps) {
  return (
    <div className="flex flex-col gap-2 p-4 overflow-y-auto">
      {children}
    </div>
  )
}
