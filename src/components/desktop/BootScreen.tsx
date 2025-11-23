"use client";

import { useEffect } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000); // 4 seconds boot time
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center font-sans select-none cursor-none px-4">
      <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 pb-12 sm:pb-16 md:pb-20">
        {/* Logo Section */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Windows Flag */}
          <img src="/windows.png" alt="Windows Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
          
          {/* Text */}
          <div className="flex flex-col text-white leading-none">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold italic tracking-tighter mb-1">Microsoft</span>
            <div className="flex items-start">
              <span className="text-4xl sm:text-5xl md:text-7xl font-bold italic tracking-tighter">Windows</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-[#FF6600] ml-2 sm:ml-3 mt-0.5 sm:mt-1">xp</span>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-40 sm:w-48 md:w-56 h-3 sm:h-3.5 border border-[#585858] rounded-[3px] p-[2px] relative overflow-hidden bg-black">
          <div className="h-full w-full relative">
            <style>{`
              @keyframes bootLoad {
                0% { left: -40%; }
                100% { left: 140%; }
              }
              .boot-loader {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 60px;
                background: linear-gradient(90deg, 
                  transparent 0%, 
                  #2D76E5 30%, 
                  #99C2FF 50%, 
                  #2D76E5 70%, 
                  transparent 100%
                );
                border-radius: 2px;
                animation: bootLoad 2s linear infinite;
                opacity: 0.8;
                box-shadow: 0 0 10px #2D76E5;
              }
              @media (min-width: 640px) {
                .boot-loader {
                  width: 70px;
                }
              }
              @media (min-width: 768px) {
                .boot-loader {
                  width: 80px;
                }
              }
              /* Scanlines effect */
              .scanlines {
                background: linear-gradient(
                  to bottom,
                  rgba(255,255,255,0),
                  rgba(255,255,255,0) 50%,
                  rgba(0,0,0,0.2) 50%,
                  rgba(0,0,0,0.2)
                );
                background-size: 100% 4px;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 10;
              }
            `}</style>
            <div className="boot-loader" />
            <div className="boot-loader" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 flex items-center gap-2 px-4">
        <span className="text-white text-xs sm:text-sm text-center">Copyright © Microsoft Corporation</span>
      </div>
      
      <div className="hidden sm:block absolute bottom-8 sm:bottom-10 md:bottom-12 right-8 sm:right-10 md:right-12 text-white font-bold italic text-lg sm:text-xl">
        Microsoft
      </div>

      {/* CRT Scanline Effect Overlay */}
      <div className="scanlines" />
    </div>
  );
}
