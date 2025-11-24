"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { projects } from "@/data/projects";

export function ProjectsViewer() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Real Life Projects", "Hobby Projects", "Landing Pages"]);

  const toggleCategory = (category: string) => {
    const isCollapsing = expandedCategories.includes(category);
    
    if (isCollapsing && selectedProject) {
       const project = projects.find(p => p.id === selectedProject);
       if (project && project.category === category) {
          setSelectedProject(null);
       }
    }

    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

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
                <span className="text-black">{projects.find(p => p.id === selectedProject)?.description}</span>
                <hr />
                <span className="text-black">{projects.find(p => p.id === selectedProject)?.tech}</span>
                {projects.find(p => p.id === selectedProject)?.link && (
                  <>
                    <div className="h-[1px] bg-[#A0A0A0]" />
                    <a 
                      href={projects.find(p => p.id === selectedProject)?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {projects.find(p => p.id === selectedProject)?.link}
                    </a>
                  </>
                )}
              </div>
            ) : (
              <span className="text-black">Select an item to view its description.</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white min-h-0">
        {/* Address Bar (Fake) */}
        <div className="border-b border-[#D6D3CE] p-1 flex items-center gap-2 bg-[#ECE9D8]">
           <span className="text-gray-500">Address</span>
           <div className="flex-1 bg-white border border-[#7F9DB9] px-1 py-0.5 flex items-center gap-1">
             <img src="/folder.ico" className="w-4 h-4" />
             <span>C:\Desktop\My Projects</span>
           </div>
        </div>

        {/* Projects Grid & Preview */}
        <div className="flex-1 overflow-y-auto p-4 pb-8 flex flex-col">
          <div className="flex flex-col gap-6 mb-6">
            {["Real Life Projects", "Landing Pages", "Hobby Projects"].map((category) => (
              <div key={category}>
                <div 
                  className="flex items-center gap-2 mb-2 px-2 cursor-pointer group"
                  onClick={() => toggleCategory(category)}
                >
                   <div className="bg-white border border-gray-300 rounded-sm p-0.5">
                     <ChevronDown className={`w-3 h-3 text-[#003399] transition-transform ${expandedCategories.includes(category) ? "" : "-rotate-90"}`} />
                   </div>
                   <span className="font-bold text-[#003399] group-hover:underline">{category}</span>
                   <div className="h-[1px] bg-gradient-to-r from-[#003399] to-transparent flex-1" />
                </div>
                
                {expandedCategories.includes(category) && (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 content-start px-4 animate-in slide-in-from-top-2 duration-200">
                    {projects.filter(p => p.category === category).map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          setSelectedProject(project.id);
                          setExpandedCategories([project.category]);
                        }}
                        className={`
                          group flex flex-col items-center gap-1 p-2 border border-transparent rounded hover:bg-[#E8F0FA] hover:border-[#B2C7E6] cursor-pointer
                          ${selectedProject === project.id ? "bg-[#C1D2EE] border-[#316AC5] opacity-80" : ""}
                        `}
                      >
                        <img src="/network.ico" alt="Project" className="w-12 h-12 drop-shadow-md" />
                        <span className="text-center text-black group-hover:text-black leading-tight">
                          {project.title}
                        </span>
                        <span className="text-[10px] text-gray-500 text-center">
                          {project.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Live Preview Section */}
          {selectedProject && (
            <div className="flex flex-col gap-1 animate-in fade-in duration-300 mt-auto pt-4 border-t border-[#D6D3CE] max-w-5xl mx-auto w-full">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#0054E3] to-[#2F89F5] px-2 py-1 rounded-t-sm">
                <div className="flex items-center gap-2">
                  <img src="/ie.ico" alt="IE" className="w-4 h-4" />
                  <span className="font-bold text-white truncate">
                    {projects.find(p => p.id === selectedProject)?.link ? "Live Preview" : "Preview Unavailable"} - {projects.find(p => p.id === selectedProject)?.title}
                  </span>
                </div>
                {projects.find(p => p.id === selectedProject)?.link && (
                  <a 
                    href={projects.find(p => p.id === selectedProject)?.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline text-[10px] whitespace-nowrap ml-2"
                  >
                    Open in New Tab
                  </a>
                )}
              </div>
              
              <div className="border-2 border-[#0054E3] bg-white w-full shadow-md relative overflow-hidden">
                {projects.find(p => p.id === selectedProject)?.link ? (
                  <iframe 
                    src={projects.find(p => p.id === selectedProject)?.link}
                    className="w-full h-[500px] md:h-[600px] border-none"
                    title="Project Preview"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[300px] flex flex-col items-center justify-center bg-gray-100 text-gray-500 gap-4 p-8 text-center">
                    <img src="/ie_broken.png" alt="No Preview" className="w-16 h-16 opacity-50 grayscale" onError={(e) => e.currentTarget.src = "/ie.ico"} />
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-lg">Preview Not Available</span>
                      <span className="text-sm">This project does not have a live demo link.</span>
                      <span className="text-xs text-gray-400">It might be a backend service, a CLI tool, or a private repository.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
