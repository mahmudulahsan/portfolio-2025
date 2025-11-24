"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { skillGroups } from "@/data/skills";
import { Cpu, Database, Layout, Terminal, Wrench } from "lucide-react";

export function SkillsViewer() {
  const getIcon = (title: string) => {
    switch (title) {
      case "Languages": return <Terminal className="w-8 h-8 text-[#2866CC]" />;
      case "Frontend": return <Layout className="w-8 h-8 text-[#2866CC]" />;
      case "Backend & DB": return <Database className="w-8 h-8 text-[#2866CC]" />;
      case "Tools & Others": return <Wrench className="w-8 h-8 text-[#2866CC]" />;
      default: return <Cpu className="w-8 h-8 text-[#2866CC]" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-tahoma text-xs">
      {/* Header / Info Bar */}
      <div className="bg-[#ECE9D8] border-b border-[#D6D3CE] p-2 flex items-center gap-2">
        <div className="bg-white border border-[#7F9DB9] px-2 py-1 w-full flex items-center gap-2">
          <Cpu className="w-4 h-4 text-gray-500" />
          <span>Skills</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-white">
        <ScrollArea className="h-full w-full">
          <div className="p-4 space-y-6">
            {skillGroups.map((group, index) => (
              <Card key={index} className="border-none shadow-none rounded-none bg-transparent">
                <CardHeader className="p-0 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="font-bold text-[#003399] text-sm border-b border-[#A0A0A0] w-full pb-0.5 flex items-center gap-2">
                      <span className="bg-white pr-2 relative top-1.5 inline-flex items-center gap-2">
                        {group.title}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {group.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 group cursor-default">
                        {/* XP Drive Icon Look-alike */}
                        <div className="w-8 h-8 shrink-0">
                           {getIcon(group.title)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-black group-hover:underline">{skill}</span>
                          {/* <span className="text-[10px] text-gray-500">Local Disk</span> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Status Bar */}
      <div className="border-t border-[#D6D3CE] bg-[#ECE9D8] px-2 py-0.5 flex gap-4 text-black">
         <span>{skillGroups.reduce((acc, g) => acc + g.skills.length, 0)} items</span>
         <div className="w-[1px] bg-[#ACA899] h-full mx-1" />
         <span>Total Capacity: Unlimited</span>
      </div>
    </div>
  );
}
