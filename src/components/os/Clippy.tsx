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
  const [isOpen, setIsOpen] = useState(true);
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

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = message;
    setConversation(prev => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setIsLoading(true);

    try {
      const answer = await getGeminiResponse(userMsg);
      setConversation(prev => [...prev, { role: "clippy", text: answer }]);
    } catch (error) {
      setConversation(prev => [...prev, { role: "clippy", text: "Sorry, something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-12 right-4 z-[50] flex flex-col items-end gap-2 font-tahoma">
      {/* Chat Bubble */}
      {isChatOpen && (
        <Card className="bg-[#FFFFE1] border border-black rounded-lg shadow-lg p-0 w-64 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#4A7AC9] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
            <span>Clippy AI Assistant</span>
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
        <div className="w-36 h-36 relative animate-bounce-slow">
          <img src="/clippy.png" alt="clippy" />
        </div>

        {!isChatOpen && (
          <div className="absolute -top-8 right-0 bg-[#FFFFE1] border border-black px-2 py-1 text-[10px] rounded shadow whitespace-nowrap animate-pulse">
            Need help?
          </div>
        )}
      </div>
    </div>
  );
}
