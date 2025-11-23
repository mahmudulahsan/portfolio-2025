"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Calendar({ isOpen, onClose }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        const clockButton = document.getElementById("clock-button");
        if (clockButton && clockButton.contains(event.target as Node)) {
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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div
      ref={calendarRef}
      className="fixed bottom-12 right-2 z-[9999] bg-[#ECE9D8] rounded-sm shadow-2xl font-tahoma"
      style={{
        border: "1px solid #0831D9",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.5)"
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0054E3] to-[#0A6EF1] px-2 py-1.5 flex items-center justify-between">
        <button
          onClick={previousMonth}
          className="p-0.5 hover:bg-white/20 rounded transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>
        <span className="text-white font-bold text-xs">
          {monthNames[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-0.5 hover:bg-white/20 rounded transition-colors"
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-2">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div
              key={day}
              className="text-center text-[10px] font-bold text-[#003399] w-6 h-5 flex items-center justify-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={index}
                className={`
                  text-center text-[10px] w-6 h-5 flex items-center justify-center rounded-sm
                  ${day ? "text-black cursor-default" : ""}
                  ${isToday ? "bg-[#316AC5] text-white font-bold" : "hover:bg-[#D1E5FA]"}
                `}
              >
                {day || ""}
              </div>
            );
          })}
        </div>

        {/* Today's Date */}
        <div className="mt-2 pt-2 border-t border-[#ACA899] text-center">
          <span className="text-[10px] text-black">
            Today: {today.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
