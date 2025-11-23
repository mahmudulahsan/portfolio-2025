"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ContextMenuItem {
  label: string;
  action?: () => void;
  disabled?: boolean;
  separator?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x, y });

  useEffect(() => {
    if (menuRef.current) {
      const menu = menuRef.current;
      const rect = menu.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = x;
      let newY = y;

      // Adjust horizontal position
      if (x + rect.width > viewportWidth) {
        newX = x - rect.width;
      }

      // Adjust vertical position
      if (y + rect.height > viewportHeight) {
        newY = y - rect.height;
      }

      setPosition({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute z-[9999] min-w-[160px] bg-white font-sans"
      style={{ 
        top: position.y, 
        left: position.x,
        border: "1px solid #ACA899",
        boxShadow: "2px 2px 2px rgba(0,0,0,0.4)"
      }}
    >
      <div className="py-0.5 bg-[#F1F1F1] border border-white">
        {items.map((item, index) => {
          if (item.separator) {
            return (
              <div
                key={index}
                className="my-1 mx-1 h-[1px] bg-[#ACA899]"
              />
            );
          }

          return (
            <button
              key={index}
              onClick={() => {
                if (!item.disabled && item.action) {
                  item.action();
                  onClose();
                }
              }}
              disabled={item.disabled}
              className={cn(
                "w-full px-4 py-1 text-left text-[11px] font-normal flex items-center leading-tight",
                item.disabled
                  ? "text-[#8D8D8D] cursor-default"
                  : "text-black hover:bg-[#316AC5] hover:text-white cursor-pointer"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
