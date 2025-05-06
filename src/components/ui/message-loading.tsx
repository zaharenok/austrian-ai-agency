"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function MessageLoading({ className }: { className?: string }) {
  return (
    <div className={cn("flex space-x-2", className)}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/20 [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/20 [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/20" />
    </div>
  )
}