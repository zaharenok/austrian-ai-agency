"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useAutoScroll } from "@/components/hooks/use-auto-scroll";
import { useTranslations } from "@/context/language-context";

const N8N_WEBHOOK_URL = "https://n8n.aaagency.at/webhook/1eac4cc6-3cc6-4455-b740-73cd625f87e0";
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

  const suspiciousPatterns = [/<\s*script/i, /javascript:/i];
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      sanitized = sanitized.replace(pattern, "");
    }
  }

  return sanitized;
}

export function ContactClient() {
  const { t, locale } = useTranslations();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: t("chatBot.greeting"),
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
    id: Number.MAX_SAFE_INTEGER,
    content:
      typeof t("chatBot.rateLimit") === "string"
        ? (t("chatBot.rateLimit") as string)
        : "Please wait a few seconds before sending another message.",
    sender: "ai" as const,
    animated: true,
  }), [t]);

  const handleSubmit = useCallback(
    async (message: string) => {
      const sanitizedMessage = sanitizeMessage(message);
      if (!sanitizedMessage) return;
      if (honeypot.trim().length > 0) {
        console.warn("[Security] Honeypot triggered, aborting submission.");
        return;
      }

      const now = Date.now();
      const recentRequests = requestHistoryRef.current.filter((ts) => now - ts < RATE_LIMIT_WINDOW);
      if (recentRequests.length >= MAX_MESSAGES_PER_MINUTE) {
        setMessages((prev) => [
          ...prev,
          { ...rateLimitExceededMessage, id: prev.length + 1 },
        ]);
        setIsLoading(false);
        setIsWaiting(false);
        return;
      }

      recentRequests.push(now);
      requestHistoryRef.current = recentRequests;

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: sanitizedMessage,
          sender: "user",
          animated: true,
        },
      ]);

      setIsLoading(true);
      setIsWaiting(true);

      try {
        const languageMap: Record<string, string> = {
          en: "english",
          de: "german",
          ru: "russian",
        };

        const webhookPayload = {
          message: sanitizedMessage,
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          locale,
          language: languageMap[locale] || "english",
          sessionId: sessionIdRef.current,
        };

        let data: { response: string } | null = null;
        let useDirectWebhook = true;

        if (
          typeof window !== "undefined" &&
          (window.location.hostname === "localhost" || window.location.hostname.includes("127.0.0.1"))
        ) {
          try {
            const response = await fetch(PROXY_API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: sanitizedMessage,
                locale,
                sessionId: webhookPayload.sessionId,
                timestamp: webhookPayload.timestamp,
                honeypot,
              }),
              cache: "no-store",
            });

            if (response.ok) {
              data = await response.json();
              useDirectWebhook = false;
            } else if (response.status === 429) {
              console.warn("[Security] Proxy request blocked.");
              setIsLoading(false);
              setIsWaiting(false);
              return;
            }
          } catch (error) {
            console.log("Proxy request failed, falling back to direct webhook", error);
          }
        }

        if (useDirectWebhook && N8N_WEBHOOK_URL) {
          const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookPayload),
            cache: "no-store",
          });

          if (response.ok) {
            const webhookResponse = await response.json();
            let botResponse = t("chatBot.response");

            if (webhookResponse) {
              if (Array.isArray(webhookResponse) && webhookResponse[0]?.output) {
                botResponse = webhookResponse[0].output;
              } else if (webhookResponse?.output) {
                botResponse = webhookResponse.output;
              }
            }

            data = { response: botResponse };
          } else {
            throw new Error(`N8N webhook failed with status ${response.status}`);
          }
        }

        if (!data) {
          data = { response: t("chatBot.response") as string };
        }

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              content: data?.response || t("chatBot.response"),
              sender: "ai",
              animated: true,
            },
          ]);
          setIsLoading(false);
          setIsWaiting(false);
        }, 1300);
      } catch (error) {
        console.error("Error contacting webhook:", error);

        const errorMessage =
          error instanceof Error ? `${error.name}: ${error.message}` : String(error);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              content:
                `${
                  typeof t("chatBot.errorResponse") === "string"
                    ? t("chatBot.errorResponse")
                    : "Извините, произошла ошибка. Попробуйте позже."
                } (Тех. информация: ${errorMessage})`,
              sender: "ai",
              animated: true,
            },
          ]);
          setIsLoading(false);
          setIsWaiting(false);
        }, 600);
      }
    },
    [honeypot, locale, t]
  );

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;
      const value = input;
      setInput("");
      await handleSubmit(value);
    }, [handleSubmit, input, isLoading]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div className="flex items-center">
        <Link href={`/${locale}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("navigation.backToHome")}
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border border-primary/10 bg-white/80 shadow-lg backdrop-blur-lg dark:bg-white/10">
        <div className="border-b p-4 text-center">
          <h1 className="text-xl font-semibold text-foreground">{t("chatBot.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("chatBot.subtitle")}</p>
        </div>

        <div ref={chatContainerRef} className="chat-container h-[360px] overflow-y-auto p-4">
          <ChatMessageList>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`transition-all duration-300 ease-in-out ${
                  message.animated ? "animate-fade-in animate-slide-up" : ""
                }`}
                style={{ opacity: 1, transform: "translateY(0)" }}
              >
                <ChatBubble variant={message.sender === "user" ? "sent" : "received"}>
                  <ChatBubbleAvatar
                    className="h-8 w-8 shrink-0"
                    src={message.sender === "user" ? "/user-avatar.png" : "/company-logo.png"}
                    fallback={message.sender === "user" ? "YOU" : "AI"}
                  />
                  <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
                    {message.content}
                  </ChatBubbleMessage>
                </ChatBubble>
              </div>
            ))}

            {isLoading && (
              <div className="animate-fade-in animate-slide-up">
                <ChatBubble variant="received">
                  <ChatBubbleAvatar className="h-8 w-8 shrink-0" src="/company-logo.png" fallback="AI" />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              </div>
            )}

            {isWaiting && (
              <div className="my-2 text-center text-xs text-muted-foreground animate-pulse">
                {typeof t("chatBot.searchingInfo") === "string"
                  ? t("chatBot.searchingInfo")
                  : "Ищу информацию в базе знаний..."}
              </div>
            )}
          </ChatMessageList>
        </div>

        <div className="relative border-t p-4">
          <div className="rounded-full border bg-background focus-within:ring-1 focus-within:ring-primary">
            <div className="flex items-center p-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  typeof t("chatBot.inputPlaceholder") === "string"
                    ? (t("chatBot.inputPlaceholder") as string)
                    : "Type your message..."
                }
                className="flex-1 border-0 bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
                onKeyDown={async (event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    await sendMessage();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {typeof t("chatBot.sendButton") === "string" ? t("chatBot.sendButton") : "Send"}
                <CornerDownLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <input
            type="text"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-px w-px opacity-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
