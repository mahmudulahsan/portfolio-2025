"use client";

import { achievements } from "@/data/achievements";
import { blogs } from "@/data/blogs";
import { contactInfo } from "@/data/contact";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { researchItems } from "@/data/research";
import { skillGroups } from "@/data/skills";
import { Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Clippy() {
  const [isOpen, setIsOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ role: "user" | "clippy"; text: string }[]>([
    { role: "clippy", text: "Hi! I'm Clippy. Ask me anything about Mahmudul Ahsan!" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const getAnswer = (input: string) => {
    const q = input.toLowerCase();

    // Education
    if (q.includes("education") || q.includes("school") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("subject") || q.includes("cse") || q.includes("ruet")) {
      return `He has completed his graduation from CSE, RUET`;
    }

    // Skills
    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("know") || q.includes("frontend") || q.includes("backend") || q.includes("fullstack") || q.includes("interest") || q.includes("javascript")|| q.includes("react") || q.includes("next") || q.includes("node")) {
      const allSkills = skillGroups.flatMap(g => g.skills);
      const randomSkills = allSkills.slice(0, 5).join(", ");
      return `Mahmudul is skilled in ${randomSkills}, and more! Open "My Skills" to see the full list.`;
    }

    // Projects
    if (q.includes("project") || q.includes("built") || q.includes("work") || q.includes("portfolio") || q.includes("web") || q.includes("app ")) {
      const projectNames = projects.slice(0, 3).map(p => p.title).join(", ");
      return `He has worked on amazing projects like ${projectNames}. Check out the "My Projects" folder!`;
    }

    // Experience
    if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("work")) {
      const latest = experiences[0];
      return `He is currently working at ${latest.company} as a ${latest.role}. He has ${experiences.length} major roles in his history.`;
    }

    // Contact
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("hire")) {
      return `You can reach him at ${contactInfo.email} or find him on LinkedIn!`;
    }

    // Research
    if (q.includes("research") || q.includes("paper") || q.includes("publication") || q.includes("thesis") || q.includes("ai") || q.includes("machine") || q.includes("ml")) {
      return `He has published research like "${researchItems[0].title}". Check his profile for details!`;
    }

    // Achievements
    if (q.includes("achievement") || q.includes("award") || q.includes("certificate")) {
      return `He achieved "${achievements[0].title}"! Pretty cool, right?`;
    }
    
    // Blogs
    if (q.includes("blog") || q.includes("write") || q.includes("article")) {
      return `He writes about tech! Check out "${blogs[0].title}" in the Internet Explorer.`;
    }

    // General / Fallback
    if (q.includes("who") || q.includes("name")) {
      return "That's Mahmudul Ahsan, a passionate Software Engineer!";
    }

    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      return "Hello there! How can I help you explore this portfolio?";
    }

    return "I see you're asking about that. I'm best at answering questions about Ahsan's skills, projects, and experience. Try asking 'What are his skills?'";
  };

  const handleSend = () => {
    if (!message.trim()) return;

    const userMsg = message;
    setConversation(prev => [...prev, { role: "user", text: userMsg }]);
    setMessage("");

    // Simulate thinking delay
    setTimeout(() => {
      const answer = getAnswer(userMsg);
      setConversation(prev => [...prev, { role: "clippy", text: answer }]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-12 right-4 z-[50] flex flex-col items-end gap-2 font-tahoma">
      {/* Chat Bubble */}
      {isChatOpen && (
        <div className="bg-[#FFFFE1] border border-black rounded-lg shadow-lg p-0 w-64 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#4A7AC9] text-white px-2 py-1 text-xs font-bold flex justify-between items-center">
            <span>Clippy Assistant</span>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-red-500 rounded px-1">
              <X className="w-3 h-3" />
            </button>
          </div>
          
          <div className="h-48 overflow-y-auto p-2 space-y-2 text-xs">
            {conversation.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] p-1.5 rounded ${
                    msg.role === "user" 
                      ? "bg-[#E1F0FF] border border-[#316AC5] text-black" 
                      : "bg-white border border-gray-400 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t border-gray-300 bg-gray-50 flex gap-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Mahmudul Ahsan..."
              className="flex-1 border border-gray-400 px-1 py-0.5 text-xs outline-none focus:border-blue-500"
            />
            <button 
              onClick={handleSend}
              className="bg-white border border-gray-400 px-2 hover:bg-gray-100"
            >
              <Send className="w-3 h-3 text-blue-600" />
            </button>
          </div>
        </div>
      )}

      {/* Clippy Character */}
      <div 
        className="relative cursor-pointer group hover:scale-110 transition-transform duration-200"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {/* Simple CSS/SVG Clippy Representation */}
        <div className="w-36 h-36 relative animate-bounce-slow">
            {/* Using an image if available would be best, but constructing a CSS/SVG one is safer for now */}
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
