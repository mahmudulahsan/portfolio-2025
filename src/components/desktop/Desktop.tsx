"use client";

import { contactInfo } from "@/data/contact";
import { Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BootScreen } from "./BootScreen";
import { ContextMenu } from "./ContextMenu";
import { DesktopIcon } from "./DesktopIcon";
import { DisplayProperties } from "./DisplayProperties";
import { FileDownloadDialog } from "./FileDownloadDialog";
import { InternetExplorer } from "./InternetExplorer";
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
  const [isInternetExplorerOpen, setIsInternetExplorerOpen] = useState(false);
  
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
  const [isInternetExplorerMinimized, setIsInternetExplorerMinimized] = useState(false);

  const [theme, setTheme] = useState<"Blue" | "Olive" | "Silver">("Blue");
  const [wallpaper, setWallpaper] = useState("/wallpaper.jpeg");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "Blue" | "Olive" | "Silver";
    const savedWallpaper = localStorage.getItem("wallpaper");
    if (savedTheme) setTheme(savedTheme);
    if (savedWallpaper) setWallpaper(savedWallpaper);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("wallpaper", wallpaper);
  }, [wallpaper]);

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
      case "internet":
        setIsInternetExplorerOpen(true);
        setIsInternetExplorerMinimized(false);
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
      case "help":
        setIsReadmeOpen(true);
        setIsReadmeMinimized(false);
        break;
      case "internet":
        setIsInternetExplorerOpen(true);
        setIsInternetExplorerMinimized(false);
        break;
      case "skills":
        setIsSkillsOpen(true);
        setIsSkillsMinimized(false);
        break;
      case "contact":
        setIsContactOpen(true);
        setIsContactMinimized(false);
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
    { id: "internet", title: "Mahmudul's Tech Blog - Microsoft Internet Explorer", isMinimized: isInternetExplorerMinimized, onRestore: () => setIsInternetExplorerMinimized(false) },
  ].filter(w => 
    (w.id === "ahsan.js" && isAhsanWindowOpen) ||
    (w.id === "projects" && isProjectsOpen) ||
    (w.id === "skills" && isSkillsOpen) ||
    (w.id === "contact" && isContactOpen) ||
    (w.id === "readme" && isReadmeOpen) ||
    (w.id === "run" && isRunOpen) ||
    (w.id === "properties" && isPropertiesOpen) ||
    (w.id === "settings" && isSettingsOpen) ||
    (w.id === "internet" && isInternetExplorerOpen)
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
            onClick={() => handleIconClick("skills")}
            onDoubleClick={() => handleIconDoubleClick("skills")}
            icon={<img src="/skills.ico" alt="Skills" className="h-full w-full object-contain drop-shadow-md" />}
          />
          <DesktopIcon
            label="My Projects"
            selected={selectedIcon === "projects"}
            onClick={() => handleIconClick("projects")}
            onDoubleClick={() => handleIconDoubleClick("projects")}
            icon={<img src="/project.ico" alt="Projects" className="h-full w-full object-contain drop-shadow-md" />}
          />
          <DesktopIcon
            label="My Portfolio"
            selected={selectedIcon === "ahsan.js"}
            onClick={() => handleIconClick("ahsan.js")}
            onDoubleClick={() => handleIconDoubleClick("ahsan.js")}
            icon={<img src="/mycomputer.ico" alt="My Computer" className="h-full w-full object-contain drop-shadow-md" />}
          />
          <DesktopIcon
            label="Contact Me"
            selected={selectedIcon === "contact"}
            onClick={() => handleIconClick("contact")}
            onDoubleClick={() => handleIconDoubleClick("contact")}
            icon={<img src="/contact.ico" alt="Contact" className="h-full w-full object-contain drop-shadow-md" />}
          />
          <DesktopIcon
            label="Read Me.txt"
            selected={selectedIcon === "readme"}
            onClick={() => handleIconClick("readme")}
            onDoubleClick={() => handleIconDoubleClick("readme")}
            icon={<img src="/readme.ico" alt="Readme" className="h-full w-full object-contain drop-shadow-md" />}
          />
          <DesktopIcon
            label="Internet Explorer"
            selected={selectedIcon === "internet"}
            onClick={() => handleIconClick("internet")}
            onDoubleClick={() => handleIconDoubleClick("internet")}
            icon={<img src="/ie.ico" alt="Internet Explorer" className="h-full w-full object-contain drop-shadow-md" />}
          />
      </div>

      {/* Windows */}
      <div className="absolute inset-0 pointer-events-none [&>*]:pointer-events-auto">
        <Window
          title="Mahmudul's Tech Blog - Microsoft Internet Explorer"
          isOpen={isInternetExplorerOpen}
          isMinimized={isInternetExplorerMinimized}
          onClose={() => {
            setIsInternetExplorerOpen(false);
            setIsInternetExplorerMinimized(false);
          }}
          onMinimize={() => setIsInternetExplorerMinimized(true)}
          defaultPosition={{ x: 50, y: 50 }}
          width="800px"
          height="600px"
          theme={theme}
        >
          <InternetExplorer />
        </Window>

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
          width="500px"
          height="600px"
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
          width="900px"
          height="700px"
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
          width="600px"
          height="500px"
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
          height="300px"
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
              {contactInfo.links.map((link) => (
                <div key={link.id} className="flex items-center gap-2">
                  {link.id === 'email' ? (
                    <Mail className="w-4 h-4 text-[#003399]" />
                  ) : (
                    <span className="font-bold w-4 text-center text-[#003399] text-xs">
                      {link.id === 'linkedin' ? 'IN' : 
                       link.id === 'github' ? 'GH' : 
                       link.id === 'codeforces' ? 'CF' : 
                       link.id === 'youtube' ? 'YT' : '..'}
                    </span>
                  )}
                  <a href={link.href} target="_blank" className="text-blue-600 hover:underline">{link.value}</a>
                </div>
              ))}
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
          width="350px"
          theme={theme}
        >
          <div className="p-4 space-y-4 bg-[#ECE9D8] font-tahoma">
            <div className="flex gap-4 items-start">
              <div className="shrink-0">
                 <img src="/run.png" alt="Run" className="w-8 h-8" />
              </div>
              <p className="text-xs text-black leading-relaxed">Type any link, Portfolio OS will open it for you.</p>
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
            <div className="flex justify-end gap-2 pt-4">
              <button 
                onClick={() => {
                  if (runCommand) {
                    window.open(runCommand.startsWith("http") ? runCommand : `https://${runCommand}`, "_blank");
                    setIsRunOpen(false);
                  }
                }}
                className="px-4 py-1 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-white active:bg-gray-200 text-xs"
              >
                OK
              </button>
              <button 
                onClick={() => setIsRunOpen(false)}
                className="px-4 py-1 bg-[#ECE9D8] border border-gray-400 rounded shadow-sm hover:bg-white active:bg-gray-200 text-xs"
              >
                Cancel
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

      {/* Copyright Text */}
      <div className="absolute bottom-10 right-4 text-white/90 font-tahoma text-sm drop-shadow-[1px_1px_1px_rgba(0,0,0,1)] select-none pointer-events-none z-0">
        © Mahmudul Ahsan | Built with a cup of nostalgia
      </div>

      <Taskbar 
        onSettingsClick={() => setIsSettingsOpen(true)} 
        onMenuAction={handleMenuAction}
        minimizedWindows={minimizedWindows}
        theme={theme}
      />
    </div>
    </div>
  );
}
