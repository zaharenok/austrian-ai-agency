"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useAutoScroll } from "@/components/hooks/use-auto-scroll";
import { useTranslations } from "@/context/language-context";

const N8N_WEBHOOK_URL = (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "").trim();
const PROXY_API_URL = "/api/chat";

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES_PER_MINUTE = 6;
const RATE_LIMIT_WINDOW = 60_000;

type ChatMessage = {
  id: number;
  content: string;
  sender: "user" | "ai";
  animated: boolean;
};

function sanitizeMessage(value: string): string {
  let sanitized = value.replace(/[\r\n\t]+/g, " ");
  sanitized = sanitized.replace(/<[^>]*>?/g, "");
  sanitized = sanitized.replace(/\s{2,}/g, " ").trim();
  if (sanitized.length > MAX_MESSAGE_LENGTH) {
    sanitized = sanitized.slice(0, MAX_MESSAGE_LENGTH);
  }
  return sanitized;
}

export function HomeChatCTA() {
  const { t } = useTranslations();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: typeof t("chatBot.greeting") === "string"
        ? (t("chatBot.greeting") as string)
        : "Hello! I'm the Austrian AI Agency assistant. How can I help you with AI compliance?",
      sender: "ai",
      animated: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const chatContainerRef = useAutoScroll<HTMLDivElement>([messages, isLoading, isWaiting]);
  const requestHistoryRef = useRef<number[]>([]);
  const sessionIdRef = useRef<string>(
    typeof window !== "undefined" && window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `chat-${Date.now()}`
  );

  const rateLimitExceededMessage = useMemo(() => ({
    content: typeof t("chatBot.rateLimit") === "string"
      ? (t("chatBot.rateLimit") as string)
      : "Please wait a few seconds before sending another message.",
    sender: "ai" as const,
    animated: true,
  }), [t]);

  const handleSubmit = useCallback(
    async (message: string) => {
      const sanitized = sanitizeMessage(message);
      if (!sanitized) return;

      const now = Date.now();
      requestHistoryRef.current = requestHistoryRef.current.filter(
        (t) => now - t < RATE_LIMIT_WINDOW
      );
      if (requestHistoryRef.current.length >= MAX_MESSAGES_PER_MINUTE) {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, ...rateLimitExceededMessage },
        ]);
        return;
      }
      requestHistoryRef.current.push(now);

      const userMessage: ChatMessage = {
        id: messages.length + 1,
        content: sanitized,
        sender: "user",
        animated: false,
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setIsWaiting(true);

      try {
        const useDirectWebhook = !window.location.hostname.includes("localhost");
        let data: { response?: string } | null = null;

        if (useDirectWebhook && N8N_WEBHOOK_URL) {
          const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: sanitized,
              sessionId: sessionIdRef.current,
              locale: "auto",
            }),
          });
          const webhookResponse = await response.json();
          let botResponse = typeof t("chatBot.response") === "string"
            ? (t("chatBot.response") as string)
            : "I received your message. Let me look into that.";
          if (webhookResponse) {
            if (Array.isArray(webhookResponse) && webhookResponse[0]?.output) {
              botResponse = webhookResponse[0].output;
            } else if (webhookResponse.output) {
              botResponse = webhookResponse.output;
            } else if (typeof webhookResponse === "string") {
              botResponse = webhookResponse;
            }
          }
          data = { response: botResponse };
        } else {
          const res = await fetch(PROXY_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: sanitized, sessionId: sessionIdRef.current }),
          });
          data = await res.json();
        }

        if (!data) {
          data = { response: typeof t("chatBot.response") === "string" ? (t("chatBot.response") as string) : "I received your message." };
        }

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              content: data?.response || (typeof t("chatBot.response") === "string" ? (t("chatBot.response") as string) : "I received your message."),
              sender: "ai",
              animated: true,
            },
          ]);
          setIsLoading(false);
          setIsWaiting(false);
        }, 500);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              content: `${typeof t("chatBot.errorResponse") === "string" ? t("chatBot.errorResponse") : "Sorry, an error occurred. Please try again."} (${errorMessage})`,
              sender: "ai",
              animated: true,
            },
          ]);
          setIsLoading(false);
          setIsWaiting(false);
        }, 500);
      }
    },
    [messages.length, t, rateLimitExceededMessage]
  );

  const sendMessage = useCallback(async () => {
    if (input.trim() && !isLoading) {
      await handleSubmit(input);
    }
  }, [handleSubmit, input, isLoading]);

  return (
    <section className="py-20 bg-white/80 dark:bg-zinc-900/80 border-y border-primary/10 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
        <div className="space-y-4 text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-spektr-cyan/10 px-4 py-1.5 text-sm font-medium text-spektr-cyan">
            <Bot className="h-4 w-4" />
            {typeof t("homeChat.badge") === "string" ? t("homeChat.badge") : "AI Agent"}
          </div>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            {typeof t("homeChat.title") === "string" ? t("homeChat.title") : "Chat with our AI agent"}
          </h2>
          <p className="text-muted-foreground">
            {typeof t("homeChat.subtitle") === "string"
              ? t("homeChat.subtitle")
              : "Ask anything about AI compliance, EU AI Act, or our services."}
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/90 dark:bg-white/5 backdrop-blur-md shadow-lg overflow-hidden">
          <div ref={chatContainerRef} className="chat-container h-[300px] overflow-y-auto p-4">
            <ChatMessageList>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
                >
                  <ChatBubble variant={message.sender === "user" ? "user" : "ai"}>
                    <ChatBubbleAvatar
                      className={message.sender === "user" ? "bg-spektr-cyan text-white" : "bg-muted"}
                      fallback={message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    />
                    <ChatBubbleMessage
                      variant={message.sender === "user" ? "user" : "ai"}
                      animated={message.animated}
                    >
                      {message.content}
                    </ChatBubbleMessage>
                  </ChatBubble>
                </div>
              ))}
              {isWaiting && (
                <div className="flex justify-start mb-3">
                  <ChatBubble variant="ai">
                    <ChatBubbleAvatar className="bg-muted" fallback={<Bot className="h-4 w-4" />} />
                    <ChatBubbleMessage variant="ai" isLoading />
                  </ChatBubble>
                </div>
              )}
            </ChatMessageList>
          </div>

          <div className="border-t p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={typeof t("homeChat.placeholder") === "string" ? (t("homeChat.placeholder") as string) : "Ask about AI compliance..."}
                className="flex-1 rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-spektr-cyan/40"
                disabled={isLoading}
                maxLength={MAX_MESSAGE_LENGTH}
              />
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!input.trim() || isLoading}
                className="gap-1.5 rounded-xl px-4"
              >
                <CornerDownLeft className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {typeof t("homeChat.disclaimer") === "string"
            ? t("homeChat.disclaimer")
            : "This is an AI agent. Responses are automated and may not always be accurate."}
        </p>
      </div>
    </section>
  );
}
