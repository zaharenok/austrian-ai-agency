"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageLoading } from "@/components/ui/message-loading";

const chatBubbleVariants = cva(
  "flex items-start gap-3 mb-4 group",
  {
    variants: {
      variant: {
        sent: "flex-row-reverse",
        received: "flex-row",
      },
      size: {
        sm: "gap-2",
        md: "gap-3", 
        lg: "gap-4",
      },
    },
    defaultVariants: {
      variant: "received",
      size: "md",
    },
  }
);

const messageVariants = cva(
  "relative rounded-lg p-3 max-w-xs md:max-w-sm lg:max-w-md transition-all duration-200",
  {
    variants: {
      variant: {
        sent: "bg-primary text-primary-foreground ml-auto",
        received: "bg-card border border-border shadow-sm",
      },
      size: {
        sm: "p-2 text-sm max-w-xs",
        md: "p-3 max-w-sm", 
        lg: "p-4 text-lg max-w-md",
      },
    },
    defaultVariants: {
      variant: "received",
      size: "md",
    },
  }
);

interface ChatBubbleProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  children: React.ReactNode;
}

export function EnhancedChatBubble({
  variant = "received",
  size = "md",
  className,
  children,
  ...props
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(chatBubbleVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface ChatBubbleMessageProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof messageVariants> {
  isLoading?: boolean;
  timestamp?: string;
  status?: "sending" | "sent" | "delivered" | "read";
  children?: React.ReactNode;
}

export function EnhancedChatBubbleMessage({
  variant = "received",
  size = "md",
  isLoading = false,
  timestamp,
  status,
  className,
  children,
  ...props
}: ChatBubbleMessageProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className={cn(messageVariants({ variant, size }), className)} {...props}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <MessageLoading />
            <span className="text-sm text-muted-foreground">Typing...</span>
          </div>
        ) : (
          <>
            {children}
            
            {/* Message tail/pointer */}
            <div className={cn(
              "absolute top-3 w-2 h-2 rotate-45",
              variant === "sent" 
                ? "bg-primary -right-1" 
                : "bg-card border-l border-b border-border -left-1"
            )} />
          </>
        )}
      </div>
      
      {/* Timestamp and status */}
      {(timestamp || status) && (
        <div className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground px-1",
          variant === "sent" ? "justify-end" : "justify-start"
        )}>
          {timestamp && <span>{timestamp}</span>}
          {status && (
            <Badge variant="outline" className="text-xs py-0 px-2">
              {status}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

interface EnhancedChatBubbleAvatarProps {
  src?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  status?: "online" | "offline" | "away";
  className?: string;
}

export function EnhancedChatBubbleAvatar({
  src,
  fallback = "AI",
  size = "md",
  status,
  className,
}: EnhancedChatBubbleAvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  };

  return (
    <div className="relative">
      <Avatar className={cn(sizeClasses[size], className)}>
        {src && <AvatarImage src={src} alt="Avatar" />}
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
          {fallback}
        </AvatarFallback>
      </Avatar>
      
      {status && (
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
          statusColors[status]
        )} />
      )}
    </div>
  );
}

interface EnhancedChatBubbleActionsProps {
  variant?: "sent" | "received";
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
  className?: string;
}

export function EnhancedChatBubbleActions({
  variant = "received",
  actions = [],
  className,
}: EnhancedChatBubbleActionsProps) {
  if (actions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className={cn(
        "flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity",
        variant === "sent" ? "justify-end" : "justify-start",
        className
      )}
    >
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-primary/10"
          onClick={action.onClick}
          title={action.label}
        >
          {action.icon}
        </Button>
      ))}
    </motion.div>
  );
}