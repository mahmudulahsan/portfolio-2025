"use client";

import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import React from "react";

interface DesktopIconProps {
  label: string;
  onClick: () => void;
  onDoubleClick?: () => void;
  icon?: React.ReactNode;
  selected?: boolean;
}

export function DesktopIcon({ label, onClick, onDoubleClick, icon, selected }: DesktopIconProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick?.();
      }}
      className="group flex w-16 sm:w-20 flex-col items-center gap-1 cursor-pointer"
    >
      <div className="relative h-8 w-8 sm:h-10 sm:w-10">
        {icon || <FileText className="h-full w-full text-yellow-400 fill-yellow-400" />}
        {selected && (
          <div className="absolute inset-0 bg-[#0B61FF]/30 rounded-sm" />
        )}
      </div>
      <span
        className={cn(
          "px-1 text-center text-[10px] sm:text-xs text-white font-medium line-clamp-2",
          selected 
            ? "bg-[#0B61FF] outline outline-1 outline-dotted outline-yellow-200" 
            : "drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
        )}
        style={selected ? {} : { textShadow: "1px 1px 1px black" }}
      >
        {label}
      </span>
    </div>
  );
}
