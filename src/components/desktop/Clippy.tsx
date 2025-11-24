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

    // Helper to check any keyword
    const has = (...keywords: string[]) => keywords.some(k => q.includes(k));

    // ========== LOCATION ==========
    if (has("live", "stay", "home", "house", "country", "city", "reside", "born")) {
      return `Mahmudul Ahsan is from Dhaka, Bangladesh.`;
    }

    // ========== EDUCATION ==========
    if (has("education", "study", "school", "college", "university", "degree", "graduation", "cse", "ruet", "bsc")) {
      return `Mahmudul completed his BSc in Computer Science & Engineering from Rajshahi University of Engineering & Technology (RUET).`;
    }

    // ========== SKILLS ==========
    if (has(
      "skill", "skills", "stack", "tech", "technology", "know", "expertise",
      "frontend", "backend", "fullstack", "javascript", "typescript", "react", "next", "node", "sql", "mysql", "system design"
    )) {
      const allSkills = skillGroups.flatMap(g => g.skills);
      const sampleSkills = allSkills.slice(0, 6).join(", ");
      return `He is skilled in ${sampleSkills}, and many more. Explore the "My Skills" section for the complete set.`;
    }

    // ========== RESEARCH / THESIS / PUBLICATION ==========
    if (has("research", "researcher", "paper", "publication", "thesis", "ai", "machine learning", "ml", "xai", "explainable")) {
      return `He has completed research on spyware/anomaly detection using Machine Learning and Explainable AI (SHAP). His thesis focuses on detection in banking systems with Random Forest and SHAP-based feature importance.`;
    }

    // ========== PROJECTS ==========
    if (has("project", "projects", "built", "build", "make", "portfolio", "app", "application", "software", "webapp")) {
      const names = projects.slice(0, 4).map(p => p.title).join(", ");
      return `Some of his notable projects include ${names}. You can explore them inside the "My Projects" folder.`;
    }

    // ========== EXPERIENCE ==========
    if (has("experience", "job", "company", "work", "working", "career", "role", "position")) {
      const latest = experiences[0];
      return `He is currently working as a ${latest.role} at ${latest.company}. His experience includes ${experiences.length} major roles across different domains.`;
    }

    // ========== TECH FOCUS AREAS ==========
    if (has("frontend", "react", "nextjs", "next", "typescript", "astro", "vercel", "github actions", "performance")) {
      return `He specializes in modern Frontend development with React, Next.js, TypeScript, Astro, and performance optimization. He has practical experience deploying apps on Vercel and using GitHub Actions for CI/CD.`;
    }

    if (has("backend", "node", "express", "api", "rest", "mysql", "sequelize")) {
      return `He has backend experience with Node.js, Express, REST APIs, MySQL, and is currently migrating projects from raw SQL to Sequelize ORM.`;
    }

    // ========== FIREBASE / TWILIO (SMS PROJECTS) ==========
    if (has("firebase", "firestore", "twilio", "sms", "hospital", "serial", "appointment", "functions")) {
      return `He has built an SMS-based patient serial tracker using React, Firebase Firestore, Cloud Functions, Twilio, and Tailwind — helping hospitals manage patient queues efficiently.`;
    }

    // ========== CONTACT ==========
    if (has("contact", "email", "phone", "reach", "hire", "connect")) {
      return `You can reach him at ${contactInfo.email}. He is also active on LinkedIn if you'd like to connect professionally.`;
    }

    // ========== BLOGS ==========
    if (has("blog", "blogs", "write", "writing", "article")) {
      return `He writes about technology, development, and engineering topics. Explore his latest articles in the Blogs section.`;
    }

    // ========== ACHIEVEMENTS ==========
    if (has("achievement", "achievements", "award", "awards", "certificate", "certification")) {
      return `He has earned recognitions such as "${achievements[0].title}" along with several technical certificates and academic accomplishments.`;
    }

    // ========== GENERAL IDENTITY ==========
    if (has("who", "name", "about you", "about him", "identity", "mahmudul", "mahmudul ahsan", "mahi")) {
      return `That's Mahmudul Ahsan — a passionate Software Engineer with strong expertise in Frontend development, React/Next.js, Node.js, AI research, and full-stack systems.`;
    }

    // ========== GREETINGS ==========
    if (has("hi", "hello", "hey", "assalamu", "salam", "hola")) {
      return "Hello! How can I assist you in exploring Mahmudul's portfolio today?";
    }

    // ========== FALLBACK ==========
    return `I noticed your question. I'm best at answering about Mahmudul's education, skills, experience, research, or projects. Try asking “What are his skills?” or “Show his projects.”`;
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
                  className={`max-w-[85%] p-1.5 rounded ${msg.role === "user"
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
