"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { StartMenu } from "./StartMenu";

interface MinimizedWindow {
  id: string;
  title: string;
  isMinimized: boolean;
  onRestore: () => void;
}

interface TaskbarProps {
  onSettingsClick: () => void;
  onMenuAction: (action: string) => void;
  minimizedWindows?: MinimizedWindow[];
  theme?: "Blue" | "Olive" | "Silver";
}

export function Taskbar({ 
  onSettingsClick, 
  onMenuAction,
  minimizedWindows = [],
  theme = "Blue"
}: TaskbarProps) {
  const [time, setTime] = useState<string>("");
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartItemClick = (action: string) => {
    console.log("Clicked:", action);
    if (action === "shutdown") {
        window.close();
        alert("It's now safe to turn off your computer.");
    } else if (action === "settings") {
        onSettingsClick();
    }
  };

  const themeStyles = {
    Blue: {
      background: "linear-gradient(to bottom, #245EDC 0%, #3F8CF3 9%, #245EDC 18%, #245EDC 92%, #1941A5 100%)",
      border: "#0831D9"
    },
    Olive: {
      background: "linear-gradient(to bottom, #A9B973 0%, #C5D68E 9%, #A9B973 18%, #A9B973 92%, #7A8A54 100%)",
      border: "#5B6A34"
    },
    Silver: {
      background: "linear-gradient(to bottom, #C5C6C9 0%, #DCDCDC 9%, #C5C6C9 18%, #C5C6C9 92%, #9A9A9D 100%)",
      border: "#7F7F7F"
    }
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-8 sm:h-10 flex items-center justify-between px-0.5 sm:px-1 z-50"
      style={{
        background: themeStyles[theme].background,
        borderTop: `1px solid ${themeStyles[theme].border}`
      }}
    >
      <StartMenu 
        isOpen={isStartOpen} 
        onClose={() => setIsStartOpen(false)} 
        onItemClick={(action) => {
          handleStartItemClick(action);
          onMenuAction(action);
        }}
      />
      
      <div className="flex items-center gap-1 sm:gap-2 h-full py-0.5 sm:py-1 flex-1 overflow-hidden">
        <Button
          id="start-button"
          onClick={() => setIsStartOpen(!isStartOpen)}
          className={cn(
            "flex h-6 sm:h-8 items-center gap-1 sm:gap-2 px-2 sm:px-3 rounded font-bold text-white text-xs sm:text-sm shadow-md transition-all flex-shrink-0",
            "bg-gradient-to-b from-[#5eac56] to-[#3c873c]",
            "hover:from-[#6bc462] hover:to-[#4a9d42]",
            isStartOpen && "from-[#4a9d42] to-[#3c873c]",
            "border border-[#2d6b2d] p-0"
          )}
          style={{
            boxShadow: isStartOpen 
              ? "inset 0 2px 4px rgba(0,0,0,0.3)" 
              : "0 1px 3px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
          }}
        >
          <img
            src="/windows.png"
            alt="Start"
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
          <span className="drop-shadow-sm hidden xs:inline sm:inline">Start</span>
        </Button>
        <div className="h-4 sm:h-6 w-[1px] bg-[#1941A5] mx-0.5 sm:mx-1 flex-shrink-0" />
        
        {/* Quick Launch */}
        <div className="flex items-center px-1 sm:px-2 gap-1">
          <Button
            onClick={() => onMenuAction("internet")}
            variant="ghost"
            size="icon"
            className="p-0.5 sm:p-1 hover:bg-white/10 rounded transition-colors group h-auto w-auto"
            title="Launch Internet Explorer"
          >
            <img src="/ie.ico" alt="IE" className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm group-hover:brightness-110" />
          </Button>
        </div>

        <div className="h-4 sm:h-6 w-[1px] bg-[#1941A5] mx-0.5 sm:mx-1 flex-shrink-0" />
        
        {/* Minimized Window Buttons */}
        {minimizedWindows.map((window) => (
          <Button
            key={window.id}
            onClick={window.onRestore}
            className={cn(
              "flex h-6 sm:h-8 items-center gap-1 sm:gap-2 px-2 sm:px-3 rounded text-white text-xs sm:text-sm transition-all flex-shrink-0 max-w-[120px] sm:max-w-[160px]",
              "bg-gradient-to-b from-[#3C7FB1] to-[#2A5A8A]",
              "hover:from-[#4A8FC1] hover:to-[#3A6A9A]",
              "border border-[#1A3A5A]"
            )}
            style={{
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)"
            }}
            title={window.title}
          >
            <span className="truncate text-left">{window.title}</span>
          </Button>
        ))}
      </div>

      <Button
        id="clock-button"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="flex h-5 sm:h-7 items-center justify-center px-2 sm:px-3 rounded mr-0.5 sm:mr-1 text-white text-[10px] sm:text-xs font-medium flex-shrink-0 hover:brightness-110 transition-all"
        style={{
          background: "linear-gradient(to bottom, #1CB0F6 0%, #1290D9 50%, #1CB0F6 100%)",
          border: "1px solid #0831D9",
          boxShadow: isCalendarOpen 
            ? "inset 0 2px 4px rgba(0,0,0,0.3)" 
            : "inset 0 1px 0 rgba(255,255,255,0.2)"
        }}
      >
        {time}
      </Button>

      <Calendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  );
}
