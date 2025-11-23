"use client";


import { useState } from "react";

interface DisplayPropertiesProps {
  onClose: () => void;
  onContact: () => void;
  theme: "Blue" | "Olive" | "Silver";
  setTheme: (theme: "Blue" | "Olive" | "Silver") => void;
  wallpaper: string;
  setWallpaper: (wallpaper: string) => void;
}

export function DisplayProperties({ onClose, onContact, theme, setTheme, wallpaper, setWallpaper }: DisplayPropertiesProps) {
  const [pendingTheme, setPendingTheme] = useState(theme);
  const [pendingWallpaper, setPendingWallpaper] = useState(wallpaper);

  const handleApply = () => {
    setTheme(pendingTheme);
    setWallpaper(pendingWallpaper);
  };

  const handleOk = () => {
    handleApply();
    onClose();
  };

  return (
    <div className="flex flex-col h-full bg-[#ECE9D8] font-tahoma text-[11px] select-none">
      {/* Tabs */}
      <div className="flex px-2 pt-2 gap-1 border-b border-gray-400">
        {["Themes", "Desktop", "Screen Saver", "Appearance", "Settings"].map((tab, i) => (
          <div
            key={tab}
            className={`px-3 py-1 rounded-t border-t border-l border-r border-gray-400 relative -bottom-[1px] ${
              tab === "Settings" ? "bg-white z-10 font-bold" : "bg-[#ECE9D8] text-gray-600"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 bg-white border border-gray-400 m-2 mt-0 flex flex-col">
        {/* Monitor Area */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-32 h-28 bg-[#ECE9D8] border border-gray-500 rounded-t-xl relative flex items-center justify-center">
             <div className="w-28 h-20 bg-[#3A6EA5] border border-gray-600 relative overflow-hidden">
                {/* Wallpaper Preview */}
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${pendingWallpaper}')` }} />
             </div>
             {/* Stand */}
             <div className="absolute -bottom-4 w-12 h-4 bg-[#ECE9D8] border border-gray-500 border-t-0 rounded-b" />
             <div className="absolute -bottom-5 w-20 h-1 bg-[#ECE9D8] border border-gray-500 rounded-full" />
          </div>
        </div>

        {/* Settings Grid */}
        <div className="flex justify-between gap-4 p-4 border border-gray-300 rounded bg-[#ECE9D8] flex-1">
           {/* Desktop Background */}
           <div className="flex flex-col gap-2 flex-1">
              <span className="text-black">Desktop background</span>
              <select 
                value={pendingWallpaper}
                onChange={(e) => setPendingWallpaper(e.target.value)}
                className="w-full p-1 border border-gray-400 text-xs"
              >
                <option value="/wallpaper.jpeg">Bliss (Default)</option>
                <option value="https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop">Gradient Blue</option>
                <option value="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&h=1080&fit=crop">Gradient Purple</option>
                <option value="https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=1080&fit=crop">Gradient Orange</option>
                <option value="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1920&h=1080&fit=crop">Dark Theme</option>
              </select>
              <div className="text-[10px] text-gray-600 mt-1">
                Choose a background for your desktop
              </div>
           </div>

           {/* Color Scheme */}
           <div className="flex flex-col gap-2 flex-1">
              <span className="text-black">Color scheme</span>
              <select 
                value={pendingTheme}
                onChange={(e) => setPendingTheme(e.target.value as any)}
                className="w-full p-1 border border-gray-400 text-xs"
              >
                 <option value="Blue">Default (Blue)</option>
                 <option value="Olive">Olive Green</option>
                 <option value="Silver">Silver</option>
              </select>
              <div className="flex flex-col gap-2 mt-auto justify-end w-full">
                 <button 
                   onClick={onContact}
                   className="px-3 py-1 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-white active:bg-gray-200 text-center"
                 >
                   Troubleshoot...
                 </button>
                 <button 
                   onClick={() => alert("You are already viewing the advanced version of Mahmudul's Portfolio!")}
                   className="px-3 py-1 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-white active:bg-gray-200 text-center"
                 >
                   Advanced
                 </button>
              </div>
           </div>
        </div>
      </div>


      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 px-4 pb-3">
         <button onClick={handleOk} className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black">
           OK
         </button>
         <button onClick={onClose} className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black">
           Cancel
         </button>
         <button onClick={handleApply} className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black">
           Apply
         </button>
      </div>
    </div>
  );
}
