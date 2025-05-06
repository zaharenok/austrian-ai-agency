"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Paperclip, Mic, CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/context/language-context";
import { useState } from "react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useAutoScroll } from "@/components/hooks/use-auto-scroll";

// Добавляем стили для анимации сообщений
const messageAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function ContactPage() {
  const { t, locale } = useTranslations();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: t("chatBot.greeting"),
      sender: "ai",
      animated: false,
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Используем хук для автоматической прокрутки
  const chatContainerRef = useAutoScroll<HTMLDivElement>([messages, isLoading]);

  const handleSubmit = (message: string) => {
    if (!message.trim()) return;

    // Добавляем сообщение пользователя с флагом анимации
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: message,
        sender: "user",
        animated: true,
      },
    ]);
    setIsLoading(true);

    // Увеличиваем задержку перед ответом до 3 секунд
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: t("chatBot.response"),
          sender: "ai",
          animated: true,
        },
      ]);
      setIsLoading(false);
    }, 3000); // 3 секунды вместо 1
  };

  return (
    <AuroraBackground className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-4">
            <Link href={`/${locale}`} passHref>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t("navigation.backToHome") || "На главную"}
              </Button>
            </Link>
          </div>
          
          <div className="py-4">
            <div className="w-full max-w-2xl mx-auto bg-background/80 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-primary/10">
              <div className="flex flex-col h-[500px]">
                <div className="text-center p-3 border-b">
                  <h1 className="text-xl font-semibold">{t("chatBot.title") || "Чат с Austrian AI Agency ✨"}</h1>
                  <p className="text-sm text-muted-foreground">
                    {t("chatBot.subtitle") || "Наш виртуальный ассистент ответит на ваши вопросы"}
                  </p>
                </div>

                <div ref={chatContainerRef} className="flex-grow overflow-y-auto">
                  <ChatMessageList>
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`transition-all duration-300 ease-in-out ${message.animated ? "animate-fade-in animate-slide-up" : ""}`}
                        style={{
                          opacity: 1,
                          transform: "translateY(0)"
                        }}
                      >
                        <ChatBubble
                          variant={message.sender === "user" ? "sent" : "received"}
                        >
                          <ChatBubbleAvatar
                            className="h-8 w-8 shrink-0"
                            src={
                              message.sender === "user"
                                ? "/user-avatar.png"
                                : "/company-logo.png"
                            }
                            fallback={message.sender === "user" ? "YOU" : "AI"}
                          />
                          <ChatBubbleMessage
                            variant={message.sender === "user" ? "sent" : "received"}
                          >
                            {message.content}
                          </ChatBubbleMessage>
                        </ChatBubble>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="animate-fade-in animate-slide-up">
                        <ChatBubble variant="received">
                          <ChatBubbleAvatar
                            className="h-8 w-8 shrink-0"
                            src="/company-logo.png"
                            fallback="AI"
                          />
                          <ChatBubbleMessage isLoading />
                        </ChatBubble>
                      </div>
                    )}
                  </ChatMessageList>
                </div>

                {/* Новый дизайн поля ввода чата */}
                <div className="border-t p-3">
                  <div className="rounded-full border bg-background focus-within:ring-1 focus-within:ring-primary">
                    <div className="flex items-center p-1">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={typeof t("chatBot.inputPlaceholder") === 'string' ? t("chatBot.inputPlaceholder") as string : "Type your message..."}
                        className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 px-3 py-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && input.trim()) {
                            e.preventDefault();
                            handleSubmit(input);
                            setInput("");
                          }
                        }}
                      />
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="text-muted-foreground"
                        >
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon" 
                          type="button"
                          className="text-muted-foreground"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            if (input.trim()) {
                              handleSubmit(input);
                              setInput("");
                            }
                          }}
                          className="bg-black text-white hover:bg-gray-800 rounded-full px-4 py-2 flex items-center gap-2"
                        >
                          {typeof t("chatBot.sendButton") === 'string' ? t("chatBot.sendButton") : "Send message"}
                          <CornerDownLeft className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
