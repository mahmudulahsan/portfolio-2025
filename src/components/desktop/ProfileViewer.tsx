"use client";

import { cn } from "@/lib/utils";
import { Briefcase, Code, Github, GraduationCap, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
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
            <User className="h-10 w-10 text-[#808080]" />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-sm text-black">Mahmudul Ahsan</h2>
          <p className="text-[#555555]">Jr. Software Engineer</p>
          <div className="flex items-center gap-3 mt-1 text-[#555555]">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+8801521561664</span>
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
                <a href="mailto:mamahi1998@gmail.com" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Mail className="h-3.5 w-3.5" /> mamahi1998@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/ahsanmahmudul/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn Profile
                </a>
                <a href="https://github.com/mahmudulahsan" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Github className="h-3.5 w-3.5" /> GitHub Profile
                </a>
                <div className="flex items-center gap-2 text-gray-600">
                  <Code className="h-3.5 w-3.5" /> Problem Solving Profile
                </div>
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Briefcase className="h-5 w-5 text-[#003399] mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-black text-sm">MyMedicalHub International</h3>
                <p className="text-[#003399] font-medium">Jr. Software Engineer</p>
                <p className="text-[#555] mb-2">Jul 2025 - Present</p>
                <ul className="list-disc pl-4 space-y-1 text-black marker:text-[#555]">
                  <li>Contributed to building AI-integrated web applications using component-based design.</li>
                  <li>Integrated automated user interactions via voice and worked on human annotation modules.</li>
                  <li>Modernized legacy codebases into newer, efficient design technologies.</li>
                </ul>
              </div>
            </div>

            <div className="h-[1px] bg-[#ECE9D8] w-full" />

            <div className="flex gap-3">
              <Briefcase className="h-5 w-5 text-[#003399] mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-black text-sm">Vivasoft Limited</h3>
                <p className="text-[#003399] font-medium">Front-end Intern</p>
                <p className="text-[#555] mb-2">Oct 2023 - Mar 2024</p>
                <ul className="list-disc pl-4 space-y-1 text-black marker:text-[#555]">
                  <li>Contributed to front-end development of the Visitor Management System.</li>
                  <li>Developed optimized UI components using React.js and Tailwind CSS.</li>
                  <li>Collaborated in an Agile team with Git and version control best practices.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-4">
            {[
              {
                name: "ScribeLogs - AI-Powered Chrome Extension",
                tech: "React, Node.js, Express.js, Firebase, TailwindCSS",
                desc: "Chrome extension that summarizes YouTube videos using OpenAI API. Optimized costs by storing summaries in Firestore."
              },
              {
                name: "Hospital Billing Management",
                tech: "React, Express.js, Sequelize (MySQL), Firebase Auth",
                desc: "Hospital management app with localStorage caching and dynamic reports for admin insights."
              },
              {
                name: "LogicLifters - Course Management Site",
                tech: "React, Firebase, TailwindCSS",
                desc: "Dynamic course management website with admin panel for content management."
              },
              {
                name: "E-Dars - Quran & Islamic Course Site",
                tech: "React, Firebase, TailwindCSS, DaisyUI",
                desc: "Quran learning platform with audio playback, quizzes, and real-time leaderboard."
              }
            ].map((project, i) => (
              <div key={i} className="border border-[#D0D0BF] p-2 rounded-sm bg-[#FBFBFB]">
                <h3 className="font-bold text-[#003399]">{project.name}</h3>
                <p className="text-[#555] text-[11px] mb-1 italic">{project.tech}</p>
                <p className="text-black">{project.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Technical Skills</legend>
              <div className="space-y-3">
                <div>
                  <span className="font-bold text-black">Languages:</span>
                  <p className="text-black">C, C++, Java, JavaScript, TypeScript, Python, HTML, Latex</p>
                </div>
                <div>
                  <span className="font-bold text-black">Frontend:</span>
                  <p className="text-black">React, Next.js, CSS, SCSS, Tailwind CSS, DaisyUI, Bootstrap, Redux</p>
                </div>
                <div>
                  <span className="font-bold text-black">Backend & DB:</span>
                  <p className="text-black">Node.js, Express.js, Sequelize, SQL, MySQL, MongoDB, Firebase</p>
                </div>
                <div>
                  <span className="font-bold text-black">Tools:</span>
                  <p className="text-black">Git, GitHub, Azure DevOps, Notion</p>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-[#D0D0BF] p-3 rounded-sm relative">
              <legend className="px-1 text-[#003399] font-medium">Certifications & Achievements</legend>
              <ul className="list-disc pl-4 space-y-1 text-black">
                <li>
                  <span className="font-bold">ITEE FE Level 2 (2024):</span> National Rank 5th
                </li>
                <li>
                  <span className="font-bold">RUET Day Innovation Idea Contest (2023):</span> 3rd Place
                </li>
              </ul>
            </fieldset>
          </div>
        )}

        {activeTab === "research" && (
          <div className="space-y-4">
            <div className="border-l-2 border-[#003399] pl-3">
              <h3 className="font-bold text-black">Conference Paper | NCIM 2025</h3>
              <p className="text-[#003399] font-medium italic">A Lightweight Framework for Facial Emotion Recognition</p>
              <p className="text-black mt-1">
                Developed a multimodal deep learning model for facial expression recognition, improving accuracy on challenging emotions with up to 94% accuracy.
              </p>
            </div>

            <div className="border-l-2 border-[#003399] pl-3">
              <h3 className="font-bold text-black">Undergraduate Thesis</h3>
              <p className="text-[#003399] font-medium italic">Optimizing Intrusion Detection in Banking Networks</p>
              <p className="text-black mt-1">
                Built ML models for anomaly detection and implemented SHAP-based Explainable AI techniques for transparency in threat detection.
              </p>
            </div>
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
