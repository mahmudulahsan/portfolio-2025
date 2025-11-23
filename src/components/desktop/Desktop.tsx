"use client";

import { FileText, Mail, Monitor } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BootScreen } from "./BootScreen";
import { ContextMenu } from "./ContextMenu";
import { DesktopIcon } from "./DesktopIcon";
import { DisplayProperties } from "./DisplayProperties";
import { FileDownloadDialog } from "./FileDownloadDialog";
import { LockScreen } from "./LockScreen";
import { ProfileViewer } from "./ProfileViewer";
import { ProjectsViewer } from "./ProjectsViewer";
import { SkillsViewer } from "./SkillsViewer";
import { Taskbar } from "./Taskbar";
import { Window } from "./Window";

export function Desktop() {
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const locked = localStorage.getItem("isLocked");
    if (locked === "false") {
      setIsLocked(false);
    }
  }, []);

  const [isAhsanWindowOpen, setIsAhsanWindowOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);
  
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isRunOpen, setIsRunOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [runCommand, setRunCommand] = useState("https://www.linkedin.com/in/ahsanmahmudul/");

  // Minimized states
  const [isAhsanMinimized, setIsAhsanMinimized] = useState(false);
  const [isPropertiesMinimized, setIsPropertiesMinimized] = useState(false);
  const [isSettingsMinimized, setIsSettingsMinimized] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);
  const [isSkillsMinimized, setIsSkillsMinimized] = useState(false);
  const [isContactMinimized, setIsContactMinimized] = useState(false);
  const [isReadmeMinimized, setIsReadmeMinimized] = useState(false);
  const [isRunMinimized, setIsRunMinimized] = useState(false);

  const [theme, setTheme] = useState<"Blue" | "Olive" | "Silver">("Blue");
  const [wallpaper, setWallpaper] = useState("/wallpaper.jpeg");

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState("#5A8FD3");
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  } | null>(null);

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  const handleIconDoubleClick = (iconName: string) => {
    switch (iconName) {
      case "ahsan.js":
        setIsAhsanWindowOpen(true);
        setIsAhsanMinimized(false);
        break;
      case "properties":
        setIsPropertiesOpen(true);
        setIsPropertiesMinimized(false);
        break;
      case "settings":
        setIsSettingsOpen(true);
        setIsSettingsMinimized(false);
        break;
      case "projects":
        setIsProjectsOpen(true);
        setIsProjectsMinimized(false);
        break;
      case "skills":
        setIsSkillsOpen(true);
        setIsSkillsMinimized(false);
        break;
      case "contact":
        setIsContactOpen(true);
        setIsContactMinimized(false);
        break;
      case "readme":
        setIsReadmeOpen(true);
        setIsReadmeMinimized(false);
        break;
      case "run":
        setIsRunOpen(true);
        setIsRunMinimized(false);
        break;
      default:
        break;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "settings":
        setIsSettingsOpen(true);
        setIsSettingsMinimized(false);
        break;
      case "properties":
        setIsPropertiesOpen(true);
        setIsPropertiesMinimized(false);
        break;
      case "projects":
        setIsProjectsOpen(true);
        setIsProjectsMinimized(false);
        break;
      case "run":
        setIsRunOpen(true);
        setIsRunMinimized(false);
        break;
      case "ahsan.js":
        setIsAhsanWindowOpen(true);
        setIsAhsanMinimized(false);
        break;
      case "github":
        window.open("https://github.com/mahmudulahsan", "_blank");
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/ahsanmahmudul/", "_blank");
        break;
      case "download_resume":
        setIsDownloadOpen(true);
        break;
      case "lock":
        setIsLocked(true);
        localStorage.setItem("isLocked", "true");
        break;
      default:
        break;
    }
  };

  const minimizedWindows = [
    { id: "ahsan.js", title: "ahsan.js - Profile Viewer", isMinimized: isAhsanMinimized, onRestore: () => setIsAhsanMinimized(false) },
    { id: "projects", title: "My Projects", isMinimized: isProjectsMinimized, onRestore: () => setIsProjectsMinimized(false) },
    { id: "skills", title: "My Skills", isMinimized: isSkillsMinimized, onRestore: () => setIsSkillsMinimized(false) },
    { id: "contact", title: "Contact Me", isMinimized: isContactMinimized, onRestore: () => setIsContactMinimized(false) },
    { id: "readme", title: "Read Me.txt - Notepad", isMinimized: isReadmeMinimized, onRestore: () => setIsReadmeMinimized(false) },
    { id: "run", title: "Run", isMinimized: isRunMinimized, onRestore: () => setIsRunMinimized(false) },
    { id: "properties", title: "System Properties", isMinimized: isPropertiesMinimized, onRestore: () => setIsPropertiesMinimized(false) },
    { id: "settings", title: "Display Settings", isMinimized: isSettingsMinimized, onRestore: () => setIsSettingsMinimized(false) },
  ].filter(w => 
    (w.id === "ahsan.js" && isAhsanWindowOpen) ||
    (w.id === "projects" && isProjectsOpen) ||
    (w.id === "skills" && isSkillsOpen) ||
    (w.id === "contact" && isContactOpen) ||
    (w.id === "readme" && isReadmeOpen) ||
    (w.id === "run" && isRunOpen) ||
    (w.id === "properties" && isPropertiesOpen) ||
    (w.id === "settings" && isSettingsOpen)
  );

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  if (isLocked) {
    return <LockScreen onLogin={() => {
      setIsLocked(false);
      localStorage.setItem("isLocked", "false");
    }} />;
  }

  return (
    <div
      className="relative h-screen w-screen overflow-hidden font-sans text-black selection:bg-[#000080] selection:text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor: bgColor,
        backgroundImage: `url('${wallpaper}')`
      }}
      onClick={() => {
        setSelectedIcon(null);
        closeContextMenu();
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons Area */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-3 sm:gap-6 flex-wrap h-[calc(100vh-40px)] content-start">
          <DesktopIcon
            label="My Skills"
            selected={selectedIcon === "skills"}
            icon={<Monitor className="h-full w-full text-[#2866CC] drop-shadow-md" />}
            onClick={() => handleIconClick("skills")}
            onDoubleClick={() => handleIconDoubleClick("skills")}
          />
          <DesktopIcon
            label="My Projects"
            selected={selectedIcon === "projects"}
            icon={<img src="/project.ico" alt="Projects" className="h-full w-full object-contain drop-shadow-md" />}
            onClick={() => handleIconClick("projects")}
            onDoubleClick={() => handleIconDoubleClick("projects")}
          />
          <DesktopIcon
            label="ahsan.js"
            selected={selectedIcon === "ahsan.js"}
            icon={<img src="/folder.ico" alt="Folder" className="h-full w-full object-contain drop-shadow-md" />}
            onClick={() => handleIconClick("ahsan.js")}
            onDoubleClick={() => handleIconDoubleClick("ahsan.js")}
          />
          <DesktopIcon
            label="Contact Me"
            selected={selectedIcon === "contact"}
            icon={<img src="/globe.svg" alt="Contact" className="h-full w-full object-contain drop-shadow-md" />}
            onClick={() => handleIconClick("contact")}
            onDoubleClick={() => handleIconDoubleClick("contact")}
          />
          <DesktopIcon
            label="Read Me.txt"
            selected={selectedIcon === "readme"}
            icon={<FileText className="h-full w-full text-white drop-shadow-md fill-white" />}
            onClick={() => handleIconClick("readme")}
            onDoubleClick={() => handleIconDoubleClick("readme")}
          />
        </div>

        {/* Windows */}
        <Window
          title="ahsan.js - Profile Viewer"
          isOpen={isAhsanWindowOpen}
          isMinimized={isAhsanMinimized}
          onClose={() => {
            setIsAhsanWindowOpen(false);
            setIsAhsanMinimized(false);
          }}
          onMinimize={() => setIsAhsanMinimized(true)}
          defaultPosition={{ x: 100, y: 50 }}
          theme={theme}
        >
          <ProfileViewer onClose={() => {
            setIsAhsanWindowOpen(false);
            setIsAhsanMinimized(false);
          }} />
        </Window>

        <Window
          title="My Projects"
          isOpen={isProjectsOpen}
          isMinimized={isProjectsMinimized}
          onClose={() => {
            setIsProjectsOpen(false);
            setIsProjectsMinimized(false);
          }}
          onMinimize={() => setIsProjectsMinimized(true)}
          defaultPosition={{ x: 150, y: 80 }}
          theme={theme}
        >
          <ProjectsViewer />
        </Window>

        <Window
          title="My Skills"
          isOpen={isSkillsOpen}
          isMinimized={isSkillsMinimized}
          onClose={() => {
            setIsSkillsOpen(false);
            setIsSkillsMinimized(false);
          }}
          onMinimize={() => setIsSkillsMinimized(true)}
          defaultPosition={{ x: 200, y: 100 }}
          theme={theme}
        >
          <SkillsViewer />
        </Window>

        <Window
          title="Contact Me"
          isOpen={isContactOpen}
          isMinimized={isContactMinimized}
          onClose={() => {
            setIsContactOpen(false);
            setIsContactMinimized(false);
          }}
          onMinimize={() => setIsContactMinimized(true)}
          defaultPosition={{ x: 250, y: 120 }}
          width="400px"
          theme={theme}
        >
          <div className="p-4 bg-white h-full font-tahoma">
            <div className="flex items-center gap-4 mb-4">
              <img src="/globe.svg" className="w-12 h-12" />
              <div>
                <h2 className="text-lg font-bold">Contact Information</h2>
                <p className="text-sm text-gray-600">Get in touch with me</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#003399]" />
                <a href="mailto:mamahi1998@gmail.com" className="text-blue-600 hover:underline">mamahi1998@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold w-4 text-center">in</span>
                <a href="https://www.linkedin.com/in/ahsanmahmudul/" target="_blank" className="text-blue-600 hover:underline">LinkedIn Profile</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold w-4 text-center">GH</span>
                <a href="https://github.com/mahmudulahsan" target="_blank" className="text-blue-600 hover:underline">GitHub Profile</a>
              </div>
              <div className="mt-4 p-2 bg-[#FFFFE1] border border-[#ACA899] text-xs">
                <p>Feel free to reach out for collaborations or opportunities!</p>
              </div>
            </div>
          </div>
        </Window>

        <Window
          title="Read Me.txt - Notepad"
          isOpen={isReadmeOpen}
          isMinimized={isReadmeMinimized}
          onClose={() => {
            setIsReadmeOpen(false);
            setIsReadmeMinimized(false);
          }}
          onMinimize={() => setIsReadmeMinimized(true)}
          defaultPosition={{ x: 300, y: 150 }}
          width="500px"
          height="400px"
          theme={theme}
        >
          <div className="flex flex-col h-full font-mono text-sm bg-white">
            <div className="flex gap-2 px-1 py-0.5 border-b border-gray-200 text-xs">
              <span>File</span>
              <span>Edit</span>
              <span>Format</span>
              <span>View</span>
              <span>Help</span>
            </div>
            <textarea 
              className="flex-1 p-2 resize-none outline-none" 
              readOnly 
              defaultValue={`Welcome to my portfolio!

I am Mahmudul Ahsan, a passionate Jr. Software Engineer.
This website is designed to look like Windows XP, my favorite OS growing up.

Feel free to explore:
- "My Skills" to see what I can do.
- "My Projects" to see what I've built.
- "ahsan.js" to see my full profile.

Enjoy your stay!
`}
            />
          </div>
        </Window>

        {/* Properties Window */}
        <Window
          title="System Properties"
          isOpen={isPropertiesOpen}
          isMinimized={isPropertiesMinimized}
          onClose={() => {
            setIsPropertiesOpen(false);
            setIsPropertiesMinimized(false);
          }}
          onMinimize={() => setIsPropertiesMinimized(true)}
          theme={theme}
        >
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-bold border-b pb-2">System Information</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Computer Name:</strong> MAHMUDUL-PC</p>
              <p><strong>Operating System:</strong> Portfolio OS XP</p>
              <p><strong>Processor:</strong> Full Stack Developer Brain</p>
              <p><strong>Installed Memory:</strong> Unlimited Creativity</p>
            </div>
          </div>
        </Window>

        {/* Settings Window */}
        <Window
          title="Display Properties"
          isOpen={isSettingsOpen}
          isMinimized={isSettingsMinimized}
          onClose={() => {
            setIsSettingsOpen(false);
            setIsSettingsMinimized(false);
          }}
          onMinimize={() => setIsSettingsMinimized(true)}
          width="400px"
          theme={theme}
        >
          <DisplayProperties 
            onClose={() => {
              setIsSettingsOpen(false);
              setIsSettingsMinimized(false);
            }}
            onContact={() => {
              setIsContactOpen(true);
              setIsContactMinimized(false);
            }}
            theme={theme}
            setTheme={setTheme}
            wallpaper={wallpaper}
            setWallpaper={setWallpaper}
          />
        </Window>

        {/* Run Window */}
        <Window
          title="Run"
          isOpen={isRunOpen}
          isMinimized={isRunMinimized}
          onClose={() => {
            setIsRunOpen(false);
            setIsRunMinimized(false);
          }}
          onMinimize={() => setIsRunMinimized(true)}
          theme={theme}
        >
          <div className="p-4 space-y-4 bg-[#ECE9D8] font-tahoma">
            <div className="flex gap-4 items-start">
              <div className="shrink-0">
                 <img src="/run.png" alt="Run" className="w-8 h-8" />
              </div>
              <p className="text-xs text-black leading-relaxed">Type the name of a program, folder, document, or Internet resource, and Portfolio OS will open it for you.</p>
            </div>
            <div className="flex gap-2 items-center">
              <label className="text-xs text-black">Open:</label>
              <input
                type="text"
                value={runCommand}
                onChange={(e) => setRunCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (runCommand) {
                      window.open(runCommand.startsWith("http") ? runCommand : `https://${runCommand}`, "_blank");
                      setIsRunOpen(false);
                    }
                  }
                }}
                className="w-full border border-[#7F9DB9] px-2 py-1 text-xs outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button 
                onClick={() => {
                  if (runCommand) {
                    window.open(runCommand.startsWith("http") ? runCommand : `https://${runCommand}`, "_blank");
                    setIsRunOpen(false);
                  }
                }}
                className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black text-xs"
              >
                OK
              </button>
              <button
                onClick={() => {
                  setIsRunOpen(false);
                  setIsRunMinimized(false);
                }}
                className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black text-xs"
              >
                Cancel
              </button>
              <button className="px-4 py-1 min-w-[70px] bg-[#F4F4F4] border border-[#003C74] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-[#E3E3E3] active:bg-[#D4D4D4] active:shadow-inner text-black text-xs">
                Browse...
              </button>
            </div>
          </div>
        </Window>

      <FileDownloadDialog
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        fileName="Mahmudul_Ahsan_Resume.pdf"
        fileUrl="/Mahmudul_Ahsan_Resume.pdf"
      />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={closeContextMenu}
          items={[
            { label: "Arrange Icons By", disabled: true },
            { label: "Refresh", action: () => window.location.reload() },
            { separator: true, label: "" },
            { label: "New", disabled: true },
            { separator: true, label: "" },
            { label: "Properties", action: () => handleMenuAction("properties") },
          ]}
        />
      )}

      <Taskbar 
        onSettingsClick={() => setIsSettingsOpen(true)} 
        onMenuAction={handleMenuAction}
        minimizedWindows={minimizedWindows}
        theme={theme}
      />
    </div>
  );
}
