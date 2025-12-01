"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getGeminiResponse } from "@/lib/gemini";
import { Send, X, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

export function Clippy() {
  const [isOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{ role: "user" | "clippy"; text: string }[]>([
    { role: "clippy", text: "Hi! I'm Clippy. Ask me anything about Mahmudul Ahsan!" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isLoading]);

  // Token and rate limiting state
  const [tokens, setTokens] = useState(10);
  const lastMessageTimeRef = useRef<number>(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const storedTokens = localStorage.getItem("clippy_tokens");
    const cooldownStart = localStorage.getItem("clippy_cooldown_start");

    // Check if there's an active cooldown
    if (cooldownStart) {
      const start = parseInt(cooldownStart, 10);
      const now = Date.now();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

      if (now - start >= oneHour) {
        // Cooldown has expired, reset tokens
        setTokens(10);
        localStorage.setItem("clippy_tokens", "10");
        localStorage.removeItem("clippy_cooldown_start");
      } else {
        // Still in cooldown period
        setTokens(0);
        localStorage.setItem("clippy_tokens", "0");
      }
    } else {
      // No cooldown, load stored tokens or default
      if (storedTokens) {
        setTokens(parseInt(storedTokens, 10) || 10);
      } else {
        localStorage.setItem("clippy_tokens", "10");
      }
    }
  }, []);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    // Rate limiting: prevent spam (minimum 3 seconds between messages)
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTimeRef.current;
    const minDelay = 3000; // 3 seconds

    if (timeSinceLastMessage < minDelay && lastMessageTimeRef.current !== 0) {
      const remainingSeconds = Math.ceil((minDelay - timeSinceLastMessage) / 1000);

      // Detect rapid spam attempts (trying to send within 1 second)
      if (timeSinceLastMessage < 1000) {
        setIsRateLimited(true);
        setConversation(prev => [...prev, {
          role: "clippy",
          text: "⚠️ Spam detected! Please wait 30 seconds before trying again."
        }]);

        // Temporary ban for 30 seconds
        setTimeout(() => {
          setIsRateLimited(false);
        }, 30000);
        return;
      }

      setConversation(prev => [...prev, {
        role: "clippy",
        text: `Please wait ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''} before sending another message.`
      }]);
      return;
    }

    // Check if temporarily banned from spam
    if (isRateLimited) {
      setConversation(prev => [...prev, {
        role: "clippy",
        text: "You're temporarily restricted due to spam detection. Please wait."
      }]);
      return;
    }

    if (tokens <= 0) {
      setConversation(prev => [...prev, { role: "user", text: message }]);
      setMessage("");

      // Calculate remaining time
      const cooldownStart = localStorage.getItem("clippy_cooldown_start");
      let timeMsg = "later";
      if (cooldownStart) {
        const start = parseInt(cooldownStart, 10);
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const remaining = oneHour - (now - start);
        if (remaining > 0) {
          const minutes = Math.ceil(remaining / 60000);
          timeMsg = `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
      }

      setTimeout(() => {
        setConversation(prev => [...prev, {
          role: "clippy",
          text: `I've reached my interaction limit. Please try again ${timeMsg}!`
        }]);
      }, 500);
      return;
    }

    // Update last message timestamp
    lastMessageTimeRef.current = now;

    const userMsg = message;
    setConversation(prev => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setIsLoading(true);

    // Deduct token
    const newTokens = tokens - 1;
    setTokens(newTokens);
    localStorage.setItem("clippy_tokens", newTokens.toString());

    // Start cooldown when tokens reach 0
    if (newTokens === 0) {
      localStorage.setItem("clippy_cooldown_start", Date.now().toString());
    }

    try {
      const answer = await getGeminiResponse(userMsg);
      setConversation(prev => [...prev, { role: "clippy", text: answer }]);
    } catch {
      setConversation(prev => [...prev, { role: "clippy", text: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-2 sm:bottom-12 sm:right-4 z-[50] flex flex-col items-end gap-2 font-tahoma">
      {/* Chat Bubble */}
      {isChatOpen && (
        <Card className="bg-[#FFFFE1] border border-black rounded-lg shadow-lg p-0 w-[calc(100vw-2rem)] sm:w-64 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#4A7AC9] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Clippy AI Assistant</span>
              <div className="flex items-center gap-1 bg-black/10 px-1.5 py-0.5 rounded border border-white/10 shadow-inner" title="Remaining interactions">
                <span className="text-[10px] font-normal opacity-90">Tokens:</span>
                <span className={`text-[10px] ${tokens < 3 ? 'text-red-200' : 'text-white'}`}>{tokens}</span>
              </div>

            </div>
            <Button
              onClick={() => setIsChatOpen(false)}
              variant="ghost"
              size="icon"
              className="h-4 w-4 hover:bg-red-500 rounded px-0 text-white hover:text-white"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>

          <ScrollArea className="h-48 w-full bg-[#FFFFE1]">
            <div className="p-2 space-y-2 text-xs">
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-1.5 rounded ${msg.role === "user"
                      ? "bg-[#E1F0FF] border border-[#316AC5] text-black"
                      : "bg-white border border-gray-400 text-black"
                      }`}
                  >
                    {msg.role === "clippy" ? (
                      <MarkdownRenderer content={msg.text} />
                    ) : (
                      <span className="text-xs">{msg.text}</span>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-400 text-black max-w-[85%] p-1.5 rounded flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>


          <div className="p-2 border-t border-gray-300 bg-gray-50 flex gap-1">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Mahmudul Ahsan..."
              className="flex-1 border border-gray-400 px-1 py-0.5 text-xs outline-none focus-visible:ring-0 focus:border-blue-500 h-auto rounded-none bg-white"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="bg-white border border-gray-400 h-auto w-6 hover:bg-gray-100 rounded-none text-blue-600 p-0"
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      )}

      {/* Clippy Character */}
      <div
        className="relative cursor-pointer group hover:scale-110 transition-transform duration-200"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 relative animate-bounce-slow">
          <img src="/clippy.png" alt="clippy" />
        </div>

        {!isChatOpen && (
          <div className="absolute -top-6 sm:-top-8 right-0 bg-[#FFFFE1] border border-black px-2 py-1 text-[10px] rounded shadow whitespace-nowrap animate-pulse">
            Need help?
          </div>
        )}
      </div>
    </div>
  );
}
