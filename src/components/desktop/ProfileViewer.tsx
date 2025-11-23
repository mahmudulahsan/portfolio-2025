"use client";

import { achievements } from "@/data/achievements";
import { contactInfo } from "@/data/contact";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { researchItems } from "@/data/research";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Briefcase, Code, Github, GraduationCap, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useState } from "react";

interface ProfileViewerProps {
  onClose: () => void;
}

export function ProfileViewer({ onClose }: ProfileViewerProps) {
  const [activeTab, setActiveTab] = useState<"general" | "experience" | "projects" | "skills" | "research">("general");

  const tabs = [
    { id: "general", label: "General" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "research", label: "Research" },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] font-tahoma text-xs select-text">
      {/* Header / User Info */}
      <div className="flex items-center gap-4 p-3 pb-0">
        <div className="p-1 bg-white border border-[#ACA899] shadow-inner shrink-0">
          <div className="h-16 w-16 bg-gradient-to-br from-[#E3E3E3] to-[#C0C0C0] flex items-center justify-center border border-[#8E8E8E]">
            {/* <User className="h-10 w-10 text-[#808080]" /> */}
            <img src="/pro.jpg" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-sm text-black">Mahmudul Ahsan</h2>
          <p className="text-[#555555]">Software Engineer</p>
          <div className="flex items-center gap-3 mt-1 text-[#555555]">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{contactInfo.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-2 pt-3 flex items-end gap-0.5 border-b border-white">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3 py-1 rounded-t-[3px] border-t border-l border-r border-[#919B9C] relative top-[1px]",
              activeTab === tab.id
                ? "bg-white z-10 font-bold pb-1.5"
                : "bg-[#ECE9D8] text-[#444] hover:bg-[#F3F3F3]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white border border-[#919B9C] m-2 mt-0 p-4 overflow-y-auto shadow-sm">
        
        {activeTab === "general" && (
          <div className="space-y-4">
            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Summary</legend>
              <p className="leading-relaxed text-black">
                Passionate Jr. Software Engineer with a strong foundation in Computer Science. 
                Experienced in building AI-integrated web applications and modernizing legacy codebases. 
                Solved 500+ algorithmic problems across various platforms.
              </p>
            </fieldset>

            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Education</legend>
              <div className="flex gap-3">
                <GraduationCap className="h-8 w-8 text-[#003399] shrink-0" />
                <div>
                  <h3 className="font-bold text-black">Rajshahi University of Engineering & Technology</h3>
                  <p className="text-black">B.Sc in Computer Science & Engineering</p>
                  <p className="text-[#555] mt-1">Jan 2020 - June 2025 • CGPA: 3.33 / 4.00</p>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Contact & Profiles</legend>
              <div className="grid grid-cols-2 gap-2">
                {contactInfo.links.map((link) => {
                   let Icon = Mail;
                   if (link.id === 'linkedin') Icon = Linkedin;
                   if (link.id === 'github') Icon = Github;
                   if (link.id === 'codeforces') Icon = Code;
                   if (link.id === 'youtube') Icon = Youtube;

                   return (
                     <a key={link.id} href={link.href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                       <Icon className="h-3.5 w-3.5" /> {link.value}
                     </a>
                   );
                })}
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex gap-3">
                  <Briefcase className="h-5 w-5 text-[#003399] mt-1 shrink-0" />
                  <div>
                    <h3 className="font-bold text-black text-sm">{exp.company}</h3>
                    <p className="text-[#003399] font-medium">{exp.role}</p>
                    <p className="text-[#555] mb-2">{exp.period}</p>
                    <ul className="list-disc pl-4 space-y-1 text-black marker:text-[#555]">
                      {exp.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {index < experiences.length - 1 && (
                  <div className="h-[1px] bg-[#ECE9D8] w-full mt-4" />
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            {(["Real Life Projects", "Hobby Projects", "Landing Pages"] as const).map((category) => (
              <fieldset key={category} className="border border-[#D0D0BF] p-3 rounded-sm relative">
                <legend className="px-1 text-[#003399] font-medium">{category}</legend>
                <div className="space-y-3">
                  {projects
                    .filter((p) => p.category === category)
                    .map((project) => (
                      <div key={project.id} className="border-b border-[#D0D0BF] last:border-0 pb-2 last:pb-0">
                        <h3 className="font-bold text-[#003399] text-sm flex items-center gap-2">
                          {project.title}
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs font-normal text-blue-600 hover:underline"
                            >
                              [Visit]
                            </a>
                          )}
                        </h3>
                        <p className="text-[#555] text-[10px] mb-0.5 italic">{project.tech}</p>
                        <p className="text-black leading-tight">{project.description}</p>
                      </div>
                    ))}
                </div>
              </fieldset>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Technical Skills</legend>
              <div className="space-y-3">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <span className="font-bold text-black">{group.title}:</span>
                    <p className="text-black">{group.skills.join(", ")}</p>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Certifications & Achievements</legend>
              <ul className="list-disc pl-4 space-y-1 text-black">
                {achievements.map((achievement, index) => (
                  <li key={index}>
                    <span className="font-bold">{achievement.title}:</span> {achievement.description}
                    {achievement.link && (
                      <>
                        {" - "}
                        <a 
                          href={achievement.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          [View Certificate]
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        )}

        {activeTab === "research" && (
          <div className="space-y-4">
            {researchItems.map((item, index) => (
              <div key={index} className="border-l-2 border-[#003399] pl-3">
                <h3 className="font-bold text-black">{item.title}</h3>
                <p className="text-[#003399] font-medium italic">{item.subtitle}</p>
                <p className="text-black mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 pt-2 flex justify-end gap-2">
        <button 
          onClick={onClose}
          className="px-4 py-1 bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black min-w-[70px]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
