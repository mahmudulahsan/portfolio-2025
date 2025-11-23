"use client";

import { User } from "lucide-react";

interface LockScreenProps {
  onLogin: () => void;
}

export function LockScreen({ onLogin }: LockScreenProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col font-sans text-white selection:bg-transparent">
      {/* Top Bar */}
      <div className="h-16 sm:h-20 md:h-24 bg-[#00309C] border-b-2 border-[#E6AA2E] flex items-end pb-2 sm:pb-3 md:pb-4 pl-4 sm:pl-6 md:pl-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00309C] to-[#00309C] opacity-50" />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#5A7EDC] flex items-center justify-center relative overflow-hidden px-4">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A7EDC] via-[#6487E2] to-[#5A7EDC]" />
        
        {/* Center Split Line - Hidden on mobile */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 h-[60%] w-[1px] bg-gradient-to-b from-transparent via-[#8FA6E9] to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row w-full max-w-4xl items-center gap-6 sm:gap-8 md:gap-12">
          {/* Left Side - Logo */}
          <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right md:pr-8">
            <div className="mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold italic tracking-tighter drop-shadow-md">
                Microsoft
              </span>
              <br />
              <span className="text-4xl sm:text-5xl md:text-7xl font-bold italic tracking-tighter drop-shadow-md">
                Windows
              </span>
              <span className="align-top text-lg sm:text-xl md:text-2xl font-bold italic ml-1">xp</span>
            </div>
            <p className="text-[#ABC0EE] font-medium text-sm sm:text-base md:text-lg px-4 md:px-0">
              Welcome to my portfolio! Click to explore
            </p>
          </div>

          {/* Right Side - Users */}
          <div className="flex-1 md:pl-8">
            <button
              onClick={onLogin}
              className="group flex items-center gap-3 sm:gap-4 p-2 sm:p-3 md:p-2 rounded-lg transition-all hover:bg-[#FDF9C3]/10 active:bg-[#FDF9C3]/20 w-full md:w-auto justify-center md:justify-start"
            >
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded border-2 border-[#FEEFA6] bg-gradient-to-br from-[#F0F0F0] to-[#C0C0C0] flex items-center justify-center shadow-lg overflow-hidden group-hover:border-[#FFF8D4]">
                <User className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-[#003399]" />
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-xl sm:text-2xl font-medium text-white group-hover:text-[#FFF8D4] drop-shadow-md">
                  Mahmudul Ahsan
                </span>
                <span className="text-xs sm:text-sm text-[#ABC0EE] group-hover:text-white">
                  Full Stack Developer
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-auto sm:h-20 md:h-24 bg-[#00309C] border-t-2 border-[#E6AA2E] flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-0 gap-3 sm:gap-0 relative">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
          <button 
            className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors text-[#ABC0EE] hover:text-white text-sm sm:text-base"
            onClick={() => window.close()}
          >
            <div className="bg-[#E6AA2E] p-1 rounded-sm">
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
            </div>
            <span className="font-medium">Turn off computer</span>
          </button>
        </div>

        <div className="text-[#ABC0EE] text-xs sm:text-sm text-center sm:text-right">
          This is a Windows XP themed portfolio website.<br className="hidden sm:block"/>
          <span className="hidden sm:inline">Click my name above to explore my projects, skills, and experience.</span>
          <span className="sm:hidden">Click above to explore.</span>
        </div>
      </div>
    </div>
  );
}
