"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  tech: string;
}

const projects: Project[] = [
  {
    id: "scribelogs",
    title: "ScribeLogs",
    type: "Chrome Extension",
    description: "AI-Powered Chrome extension that summarizes YouTube videos using OpenAI API. Optimized costs by storing summaries in Firestore.",
    tech: "JavaScript, OpenAI API, Firebase Firestore"
  },
  {
    id: "hospital",
    title: "Hospital Billing",
    type: "Web Application",
    description: "Hospital management app with localStorage caching and dynamic reports for admin insights.",
    tech: "React, LocalStorage, Chart.js"
  },
  {
    id: "logiclifters",
    title: "LogicLifters",
    type: "Web Application",
    description: "Dynamic course management website with admin panel for content management.",
    tech: "MERN Stack"
  },
  {
    id: "edars",
    title: "E-Dars",
    type: "Web Application",
    description: "Quran learning platform with audio playback, quizzes, and real-time leaderboard.",
    tech: "Next.js, Audio API"
  }
];

export function ProjectsViewer() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <div className="flex h-full bg-white font-tahoma text-xs">
      {/* Sidebar (Common Tasks) */}
      <div className="w-48 bg-[#7BA2E7] p-3 flex flex-col gap-3 overflow-y-auto shrink-0" style={{ background: "linear-gradient(to bottom, #7BA2E7 0%, #6375D6 100%)" }}>

        {/* Details Box */}
        <div className="bg-white rounded-t-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#0054E3] to-[#2F89F5] px-3 py-1 flex justify-between items-center cursor-pointer">
            <span className="font-bold text-white">Details</span>
            <ChevronDown className="h-4 w-4 text-white" />
          </div>
          <div className="p-3 bg-[#D6DFF7] min-h-[100px]">
            {selectedProject ? (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-black">{projects.find(p => p.id === selectedProject)?.title}</span>
                <span className="text-gray-600">{projects.find(p => p.id === selectedProject)?.type}</span>
                <div className="h-[1px] bg-[#A0A0A0]" />
                <span className="text-black">{projects.find(p => p.id === selectedProject)?.tech}</span>
              </div>
            ) : (
              <span className="text-black">Select an item to view its description.</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Address Bar (Fake) */}
        <div className="border-b border-[#D6D3CE] p-1 flex items-center gap-2 bg-[#ECE9D8]">
           <span className="text-gray-500">Address</span>
           <div className="flex-1 bg-white border border-[#7F9DB9] px-1 py-0.5 flex items-center gap-1">
             <img src="/folder.ico" className="w-4 h-4" />
             <span>C:\Desktop\My Projects</span>
           </div>
        </div>

        {/* Projects Grid */}
        <div className="p-4 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 content-start h-full overflow-y-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className={`
                group flex flex-col items-center gap-1 p-2 border border-transparent rounded hover:bg-[#E8F0FA] hover:border-[#B2C7E6] cursor-pointer
                ${selectedProject === project.id ? "bg-[#C1D2EE] border-[#316AC5] opacity-80" : ""}
              `}
            >
              <img src="/folder.ico" alt="Project" className="w-12 h-12 drop-shadow-md" />
              <span className="text-center text-black group-hover:text-black leading-tight">
                {project.title}
              </span>
              <span className="text-[10px] text-gray-500 text-center">
                {project.type}
              </span>
            </div>
          ))}
        </div>
        
        {/* Status Bar */}
        <div className="border-t border-[#D6D3CE] bg-[#ECE9D8] px-2 py-0.5 flex gap-4 text-black">
           <span>{projects.length} objects</span>
           <div className="w-[1px] bg-[#ACA899] h-full mx-1" />
           <span>{(projects.length * 1.5).toFixed(1)} MB</span>
           <div className="w-[1px] bg-[#ACA899] h-full mx-1" />
           <span>My Computer</span>
        </div>
      </div>
    </div>
  );
}
