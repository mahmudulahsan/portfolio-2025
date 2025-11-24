"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Window } from "./Window";

interface FileDownloadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileUrl: string;
}

export function FileDownloadDialog({ isOpen, onClose, fileName, fileUrl }: FileDownloadDialogProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Getting file information...");
  const [timeLeft, setTimeLeft] = useState("Calculating...");
  const [transferRate, setTransferRate] = useState("0 KB/Sec");

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setStatus("Getting file information...");
      
      const totalTime = 3000; // 3 seconds download
      const intervalTime = 50;
      const steps = totalTime / intervalTime;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newProgress = Math.min((currentStep / steps) * 100, 100);
        setProgress(newProgress);

        // Update status text
        if (newProgress < 20) {
          setStatus(`Saving: ${fileName} from portfolio-os...`);
          setTimeLeft("Estimated time left: 3 sec");
          setTransferRate("15.4 KB/Sec");
        } else if (newProgress < 50) {
          setTimeLeft("Estimated time left: 2 sec");
          setTransferRate("45.2 KB/Sec");
        } else if (newProgress < 80) {
          setTimeLeft("Estimated time left: 1 sec");
          setTransferRate("120.5 KB/Sec");
        } else {
          setTimeLeft("Estimated time left: 0 sec");
          setTransferRate("Done");
        }

        if (newProgress >= 100) {
          clearInterval(timer);
          setStatus("Download complete");
          // Trigger actual download
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setTimeout(onClose, 1000); // Close after 1 second
        }
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [isOpen, fileName, fileUrl, onClose]);

  return (
    <Window
      title="File Download"
      isOpen={isOpen}
      isMinimized={false}
      onClose={onClose}
      onMinimize={() => {}}
      defaultPosition={{ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 150 }}
      width="400px"
    >
      <div className="p-3 bg-[#ECE9D8] font-tahoma text-[11px] select-none h-full flex flex-col">
        {/* Animation Area */}
        <div className="flex flex-col gap-4 mb-4 px-2">
          <div className="flex items-center justify-between px-8 py-4 relative h-20">
            {/* Source */}
            <div className="flex flex-col items-center gap-1 z-10">
              <img src="/globe.svg" alt="Internet" className="w-8 h-8" />
              <span className="text-[10px]">Internet</span>
            </div>

            {/* Flying Papers Animation */}
            <div className="absolute top-6 left-16 right-16 h-8 overflow-hidden">
               <style>{`
                 @keyframes fly {
                   0% { transform: translateX(0) scale(0.8); opacity: 0; }
                   20% { opacity: 1; }
                   80% { opacity: 1; }
                   100% { transform: translateX(180px) scale(0.8); opacity: 0; }
                 }
               `}</style>
               <div className="absolute top-0 left-0 animate-[fly_1.5s_linear_infinite]">
                 <FileText className="w-6 h-6 text-blue-600 fill-white" />
               </div>
               <div className="absolute top-0 left-0 animate-[fly_1.5s_linear_infinite_0.5s]">
                 <FileText className="w-6 h-6 text-blue-600 fill-white" />
               </div>
               <div className="absolute top-0 left-0 animate-[fly_1.5s_linear_infinite_1s]">
                 <FileText className="w-6 h-6 text-blue-600 fill-white" />
               </div>
            </div>

            {/* Destination */}
            <div className="flex flex-col items-center gap-1 z-10">
              <img src="/folder.ico" alt="Computer" className="w-8 h-8" />
              <span className="text-[10px]">My Computer</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-[70px_1fr] gap-y-1 gap-x-2 text-black">
            <div className="text-right">Saving:</div>
            <div className="truncate font-medium">{fileName} from portfolio-os</div>
            
            <div className="text-right">Estimated time left:</div>
            <div>{timeLeft.replace("Estimated time left: ", "")}</div>
            
            <div className="text-right">Download to:</div>
            <div className="truncate">C:\My Documents\Downloads</div>
            
            <div className="text-right">Transfer rate:</div>
            <div>{transferRate}</div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 space-y-1">
            <div className="w-full h-[15px] bg-white border border-[#828790] p-[1px] relative shadow-inner">
              <div 
                className="h-full bg-[#00E400] transition-all duration-100"
                style={{ 
                  width: `${progress}%`,
                  backgroundImage: "linear-gradient(to bottom, #D2FFD2 0%, #00E400 50%, #00C000 100%)"
                }} 
              />
              {/* Chunk separators */}
              <div className="absolute inset-0 flex">
                 {Array.from({ length: 30 }).map((_, i) => (
                   <div key={i} className="h-full w-[2px] bg-white ml-[10px] opacity-30" />
                 ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Checkbox 
              checked 
              disabled 
              className="w-3 h-3 border border-[#003C74] rounded-none data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
            <label className="text-black">Close this dialog box when download completes</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-auto pt-2 border-t border-[#D4D0C8]">
          <Button 
            disabled 
            variant="outline"
            className="px-4 py-1 min-w-[75px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] text-[#808080] cursor-not-allowed shadow-[inset_1px_1px_0px_white] h-auto text-[11px] font-tahoma hover:bg-[#F4F4F4]"
          >
            Open
          </Button>
          <Button 
            disabled 
            variant="outline"
            className="px-4 py-1 min-w-[75px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] text-[#808080] cursor-not-allowed shadow-[inset_1px_1px_0px_white] h-auto text-[11px] font-tahoma hover:bg-[#F4F4F4]"
          >
            Open Folder
          </Button>
          <Button 
            onClick={onClose}
            variant="outline"
            className="px-4 py-1 min-w-[75px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] text-black shadow-[inset_1px_1px_0px_white] h-auto text-[11px] font-tahoma"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Window>
  );
}
