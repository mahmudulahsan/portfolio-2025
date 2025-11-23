"use client";

import {
  Download,
  Github,
  HelpCircle,
  Linkedin,
  LogOut,
  PlayCircle,
  Settings,
  User
} from "lucide-react";
import { useEffect, useRef } from "react";

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (action: string) => void;
}

export function StartMenu({ isOpen, onClose, onItemClick }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        const startButton = document.getElementById("start-button");
        if (startButton && startButton.contains(event.target as Node)) {
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const leftMenuItems = [
    { 
      label: "My Profile", 
      icon: User, 
      action: "ahsan.js",
      description: "View resume & info"
    },
    { 
      label: "GitHub", 
      icon: Github, 
      action: "github",
      description: "Visit my repositories"
    },
    { 
      label: "LinkedIn", 
      icon: Linkedin, 
      action: "linkedin",
      description: "Connect with me"
    },
    { 
      label: "Download Resume", 
      icon: Download, 
      action: "download_resume",
      description: "Get my CV"
    },
  ];

  const rightMenuItems = [
    { label: "Settings", icon: Settings, action: "settings" },
    { label: "Help", icon: HelpCircle, action: "help" },
    { label: "Run...", icon: PlayCircle, action: "run" },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute bottom-8 sm:bottom-10 left-0 z-[9999] flex w-80 sm:w-96 flex-col rounded-tr-lg rounded-tl-lg overflow-hidden shadow-2xl font-sans"
      style={{
        border: "1px solid #0831D9",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.5)"
      }}
    >
      {/* User Profile Header */}
      <div 
        className="flex items-center gap-3 px-3 py-2 text-white border-b border-[#003399]"
        style={{
          background: "linear-gradient(to right, #166ADE 0%, #207CF6 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)"
        }}
      >
        <div className="h-10 w-10 rounded border-2 border-white/40 bg-gradient-to-br from-[#F0F0F0] to-[#C0C0C0] flex items-center justify-center shadow-md overflow-hidden">
          <User className="h-7 w-7 text-[#003399]" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm drop-shadow-md">Mahmudul Ahsan</p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="flex bg-white min-h-[380px] border-t border-[#FF9933]">
        {/* Left Column - Frequent Programs */}
        <div className="flex-1 p-1.5 bg-white flex flex-col border-r border-[#95BDEE]">
          <div className="space-y-0.5">
            {leftMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    onItemClick(item.action);
                    onClose();
                  }}
                  className="group flex w-full items-center gap-2 px-2 py-1.5 rounded hover:bg-[#316AC5] hover:text-white transition-colors"
                >
                  <Icon className="h-7 w-7 text-[#207CF6] group-hover:text-white drop-shadow-sm" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-[#333333] group-hover:text-white">{item.label}</span>
                    <span className="text-[9px] text-gray-500 group-hover:text-blue-100 leading-none">{item.description || "Click to open"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex-1" /> {/* Spacer */}
        </div>

        {/* Right Column - All Programs & System */}
        <div 
          className="w-36 sm:w-44 p-1.5 flex flex-col"
          style={{
            background: "#D3E5FA",
            borderLeft: "1px solid #95BDEE"
          }}
        >
          <div className="space-y-0.5">
            {rightMenuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    onItemClick(item.action);
                    onClose();
                  }}
                  className="group flex w-full items-center gap-2 px-2 py-1 rounded hover:bg-[#316AC5] hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4 text-[#00136B] group-hover:text-white" />
                  <span className="text-xs font-medium text-[#00136B] group-hover:text-white">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="flex-1" /> {/* Spacer */}

          <div className="my-1 h-[1px] bg-gradient-to-r from-transparent via-[#95BDEE] to-transparent" />
          
          <div className="flex items-center gap-1 justify-end pt-1">
            <button
              onClick={() => {
                onItemClick("lock");
                onClose();
              }}
              className="group flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#316AC5] hover:text-white transition-colors mr-auto"
            >
              <div className="bg-[#E6AA2E] p-0.5 rounded-sm">
                <LogOut className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-medium text-[#00136B] group-hover:text-white">Log Off</span>
            </button>

            <button
              onClick={() => {
                onItemClick("shutdown");
                onClose();
              }}
              className="group flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#316AC5] hover:text-white transition-colors"
            >
              <div className="bg-[#E81123] p-0.5 rounded-sm">
                <LogOut className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-medium text-[#00136B] group-hover:text-white">Turn Off Computer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
