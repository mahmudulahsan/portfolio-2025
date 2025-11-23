"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onMinimize: () => void;
  defaultPosition?: { x: number; y: number };
  width?: string;
  height?: string;
  theme?: "Blue" | "Olive" | "Silver";
}

export function Window({ 
  title, 
  children, 
  isOpen, 
  onClose, 
  isMinimized, 
  onMinimize,
  defaultPosition = { x: 50, y: 50 },
  width = "auto",
  height = "auto",
  theme = "Blue"
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaximizeState, setPreMaximizeState] = useState<{ x: number, y: number, width: string, height: string } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);

  // Theme styles
  const themeStyles = {
    Blue: {
      header: "bg-gradient-to-r from-[#0058EE] to-[#3593FF]",
      border: "border-[#0058EE]",
      text: "text-white text-shadow-sm"
    },
    Olive: {
      header: "bg-gradient-to-r from-[#A0BA62] to-[#B5C689]",
      border: "border-[#A0BA62]",
      text: "text-white text-shadow-sm"
    },
    Silver: {
      header: "bg-gradient-to-r from-[#B8B9BD] to-[#D0D1D5]",
      border: "border-[#B8B9BD]",
      text: "text-black"
    }
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && windowRef.current) {
      // On mobile, center the window
      if (isMobile) {
        const { innerWidth, innerHeight } = window;
        const { offsetWidth, offsetHeight } = windowRef.current;
        
        setPosition({
          x: Math.max(0, (innerWidth - offsetWidth) / 2),
          y: Math.max(0, (innerHeight - offsetHeight) / 2)
        });
      } else {
        // Ensure window opens within viewport on desktop
        const { innerWidth, innerHeight } = window;
        const { offsetWidth, offsetHeight } = windowRef.current;
        
        let newX = position.x;
        let newY = position.y;

        if (newX + offsetWidth > innerWidth) newX = Math.max(0, innerWidth - offsetWidth - 20);
        if (newY + offsetHeight > innerHeight) newY = Math.max(0, innerHeight - offsetHeight - 40);

        setPosition({ x: newX, y: newY });
      }
    }
  }, [isOpen, isMobile]);

  if (!isOpen || isMinimized) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isMobile) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleMaximize = () => {
    if (isMobile) return; // Disable maximize on mobile
    
    if (isMaximized) {
      if (preMaximizeState) {
        setPosition({ x: preMaximizeState.x, y: preMaximizeState.y });
      }
      setIsMaximized(false);
    } else {
      setPreMaximizeState({ x: position.x, y: position.y, width: width || "auto", height: height || "auto" });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  // Responsive width and height
  const responsiveWidth = isMobile ? "calc(100vw - 16px)" : (isMaximized ? "100vw" : width);
  const responsiveHeight = isMobile ? "auto" : (isMaximized ? "calc(100vh - 30px)" : height);
  const maxHeight = isMobile ? "calc(100vh - 100px)" : "none";

  return (
    <div
      ref={windowRef}
      className={cn(
        "absolute flex flex-col bg-[#ECE9D8] rounded-t-lg shadow-xl overflow-hidden border-2 md:border-[3px]",
        currentTheme.border,
        isMobile && "!left-2 !top-12"
      )}
      style={{
        left: isMobile ? 8 : position.x,
        top: isMobile ? 48 : position.y,
        width: responsiveWidth,
        height: responsiveHeight,
        maxHeight: maxHeight,
        zIndex: 50,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "flex items-center justify-between px-1.5 sm:px-2 py-0.5 sm:py-1 select-none cursor-default",
          currentTheme.header,
          !isMaximized && !isMobile && "cursor-move"
        )}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className={cn("flex items-center gap-1 sm:gap-2 font-bold text-[11px] sm:text-[13px] truncate", currentTheme.text)}>
          <span className="drop-shadow-md truncate">{title}</span>
        </div>
        <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] flex items-center justify-center bg-[#2C6AF7] rounded-[3px] border border-white/30 hover:bg-[#1F54D4] active:bg-[#1643B0] shadow-inner group"
          >
            <div className="w-1.5 h-[2px] sm:w-2 sm:h-[2px] bg-white/90 group-hover:bg-white rounded-sm mt-0.5 sm:mt-1" />
          </button>
          {!isMobile && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
              className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] flex items-center justify-center bg-[#2C6AF7] rounded-[3px] border border-white/30 hover:bg-[#1F54D4] active:bg-[#1643B0] shadow-inner group"
            >
              <div className="w-[8px] h-[7px] sm:w-[10px] sm:h-[9px] border-[2px] border-white/90 group-hover:border-white rounded-[1px] mb-[1px]" />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] flex items-center justify-center bg-[#E94D3D] rounded-[3px] border border-white/30 hover:bg-[#D63526] active:bg-[#B52012] shadow-inner group"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-sm" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto relative">
        {children}
      </div>
    </div>
  );
}
