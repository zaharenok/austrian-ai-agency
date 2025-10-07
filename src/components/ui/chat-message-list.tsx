import React from "react"

interface ChatMessageListProps {
  children: React.ReactNode
}

export function ChatMessageList({
  children,
}: ChatMessageListProps) {
  return (
    <div className="flex flex-col gap-2 p-4">
      {children}
    </div>
  )
}
