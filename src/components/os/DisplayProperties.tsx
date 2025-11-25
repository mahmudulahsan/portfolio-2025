"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
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
      <Tabs defaultValue="Settings" className="flex flex-col h-full">
        {/* Tabs */}
        <div className="px-2 pt-2 border-b border-gray-400">
          <TabsList className="bg-transparent p-0 h-auto gap-1 justify-start w-full rounded-none">
            {[
              { name: "Themes", disabled: true },
              { name: "Desktop", disabled: true },
              { name: "Screen Saver", disabled: true },
              { name: "Appearance", disabled: true },
              { name: "Settings", disabled: false }
            ].map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                disabled={tab.disabled}
                className={cn(
                  "px-2 py-1 rounded-t border-t border-l border-r border-gray-400 relative -bottom-[1px] rounded-b-none border-b-0 h-auto shadow-none text-[11px]",
                  "data-[state=active]:bg-white data-[state=active]:z-10 data-[state=active]:font-bold data-[state=active]:shadow-none",
                  "bg-[#ECE9D8] text-gray-600 hover:bg-[#ECE9D8] data-[state=inactive]:hover:bg-[#ECE9D8]",
                  "disabled:opacity-100 disabled:cursor-not-allowed"
                )}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 bg-white border border-gray-400 m-2 mt-0 flex flex-col">
          <TabsContent value="Settings" className="mt-0 flex flex-col h-full focus-visible:ring-0">
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
                  <Button
                    onClick={() => alert("You are already viewing the advanced version of Mahmudul's Portfolio!")}
                    variant="outline"
                    className="px-3 py-1 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-white active:bg-gray-200 text-center h-auto text-[11px] font-tahoma text-black"
                  >
                    Advanced
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>


      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 px-4 pb-3">
        <Button onClick={handleOk} className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black h-auto text-[11px] font-tahoma">
          OK
        </Button>
        <Button onClick={onClose} className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black h-auto text-[11px] font-tahoma">
          Cancel
        </Button>
        <Button onClick={handleApply} className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black h-auto text-[11px] font-tahoma">
          Apply
        </Button>
      </div>
    </div>
  );
}
