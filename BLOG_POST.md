---
title: Building a Nostalgic Windows XP Portfolio with Next.js 16 & Tailwind CSS
published: false
description: A deep dive into creating an interactive Windows XP-themed portfolio using modern web technologies - complete with draggable windows, Clippy assistant, and authentic XP aesthetics!
tags: nextjs, react, webdev, portfolio
cover_image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/YOUR_COVER_IMAGE.png
canonical_url: https://yourwebsite.com/blog/windows-xp-portfolio
---

# 🖥️ Building a Nostalgic Windows XP Portfolio with Next.js 16

Remember the good old days of Windows XP? The iconic blue taskbar, the satisfying "Start" button click, and of course, everyone's favorite assistant - Clippy? Well, I decided to bring that nostalgia back by building my entire portfolio as a Windows XP desktop experience!

![Windows XP Portfolio Demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/YOUR_DEMO_GIF.gif)

## 🎯 Why Windows XP?

For many of us who grew up in the early 2000s, Windows XP was our first real computer experience. From playing Road Rash and SkyRoads to exploring the internet with Internet Explorer, XP holds a special place in our hearts. This project is a tribute to that era while showcasing modern web development skills.

## ✨ Features

- **Authentic XP UI**: Pixel-perfect recreation of Windows XP interface
- **Draggable Windows**: Fully functional window management system
- **Clippy Assistant**: AI-powered (simulated) helper that answers questions about my skills and experience
- **Multiple "Applications"**:
  - 📁 My Projects - File explorer style project showcase
  - 💼 My Profile - Professional information viewer
  - 🌐 Internet Explorer - Blog reader
  - 📝 Notepad - README viewer
  - ⚙️ System Properties - Fun system info
- **Theme Switcher**: Classic Blue, Olive Green, and Silver themes
- **Fully Responsive**: Works on mobile and desktop
- **SEO Optimized**: Dynamic sitemaps, metadata, and Open Graph tags

## 🛠️ Tech Stack

Here's what powers this nostalgic experience:

```json
{
  "framework": "Next.js 16 (App Router)",
  "language": "TypeScript",
  "styling": "Tailwind CSS v4",
  "ui-components": "Shadcn UI (Radix UI)",
  "icons": "Lucide React",
  "interactions": "react-draggable"
}
```

## 🏗️ Architecture & Project Structure

The project follows a clean, modular architecture:

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Main entry point
│   ├── manifest.ts        # PWA manifest
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # Dynamic sitemap
├── components/
│   ├── os/                # Core OS components
│   │   ├── Desktop.tsx    # Main desktop environment
│   │   ├── Taskbar.tsx    # Bottom taskbar
│   │   ├── StartMenu.tsx  # Start menu
│   │   ├── Window.tsx     # Draggable window component
│   │   └── Clippy.tsx     # Clippy assistant
│   ├── apps/              # Application windows
│   │   ├── ProfileViewer.tsx
│   │   ├── ProjectsViewer.tsx
│   │   └── InternetExplorer.tsx
│   └── ui/                # Reusable UI components (Shadcn)
├── data/                  # Static data files
│   ├── config.ts          # Main configuration
│   ├── projects.ts        # Projects data
│   ├── skills.ts          # Skills data
│   └── clippyKnowledge.tsx # Clippy's brain
└── lib/                   # Utility functions
```

## 💡 Key Implementation Details

### 1. Draggable Windows System

One of the most challenging parts was implementing the window management system. Here's how I did it:

```typescript
import Draggable from 'react-draggable';

export function Window({ 
  title, 
  isOpen, 
  isMinimized, 
  onClose, 
  onMinimize,
  children 
}: WindowProps) {
  const [zIndex, setZIndex] = useState(10);

  return (
    <Draggable handle=".window-title-bar">
      <div 
        className="absolute bg-white border-2 border-[#0831D9]"
        style={{ zIndex }}
        onClick={() => setZIndex(Date.now())} // Bring to front
      >
        {/* Title bar with XP styling */}
        <div className="window-title-bar bg-gradient-to-r from-[#0054E3] to-[#2F89F5]">
          <span>{title}</span>
          <div className="flex gap-1">
            <button onClick={onMinimize}>_</button>
            <button onClick={onClose}>X</button>
          </div>
        </div>
        
        {/* Window content */}
        <div className="p-2">{children}</div>
      </div>
    </Draggable>
  );
}
```

### 2. Clippy - The AI Assistant

Clippy uses keyword matching to answer questions about my skills and experience:

```typescript
export function getClippyAnswer(input: string) {
  const q = input.toLowerCase();
  const has = (...keywords: string[]) => 
    keywords.some(k => q.includes(k));

  if (has("skills", "tech", "stack")) {
    return `I'm skilled in React, Next.js, TypeScript, Node.js, and more!`;
  }

  if (has("projects", "portfolio")) {
    return `Check out the "My Projects" folder to see my work!`;
  }

  // ... more responses
}
```

### 3. Authentic XP Styling with Tailwind

Recreating the XP look required precise color values and gradients:

```css
/* Taskbar gradient */
background: linear-gradient(
  to bottom, 
  #245EDC 0%, 
  #3F8CF3 9%, 
  #245EDC 18%, 
  #245EDC 92%, 
  #1941A5 100%
);

/* Window title bar */
background: linear-gradient(
  to right, 
  #0054E3 0%, 
  #2F89F5 100%
);

/* Classic XP button */
.xp-button {
  background: #ECE9D8;
  border: 1px solid #003C74;
  box-shadow: inset 1px 1px 0px white;
}
```

### 4. Theme System

I implemented three classic XP themes:

```typescript
const themes = {
  Blue: {
    taskbar: "linear-gradient(...)",
    accent: "#245EDC"
  },
  Olive: {
    taskbar: "linear-gradient(...)",
    accent: "#A9B973"
  },
  Silver: {
    taskbar: "linear-gradient(...)",
    accent: "#C5C6C9"
  }
};
```

## 🎨 Making It Customizable

One of my goals was to make this project reusable. Anyone can fork it and create their own XP portfolio by simply updating data files:

```typescript
// src/data/config.ts
export const portfolioConfig = {
  owner: {
    name: "Your Name",
    title: "Your Title",
    profileImage: "/your-photo.jpg",
  },
  site: {
    url: "https://yoursite.com",
    description: "Your description",
  },
  // ... more config
};
```

All personal information is centralized in `/src/data/` folder:
- `config.ts` - Main configuration
- `projects.ts` - Your projects
- `skills.ts` - Your skills
- `experience.ts` - Work experience
- `contact.ts` - Contact information

## 🚀 Performance & SEO

Despite the retro look, the site is built with modern best practices:

### Performance
- ⚡ Next.js 16 App Router for optimal performance
- 🎯 Code splitting and lazy loading
- 📦 Optimized bundle size
- 🖼️ Image optimization with Next/Image

### SEO
- 📄 Dynamic sitemap generation
- 🤖 Robots.txt configuration
- 🔍 Structured metadata
- 📱 Open Graph tags for social sharing
- 🌐 PWA manifest for installability

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};
```

## 🎯 Challenges & Solutions

### Challenge 1: Window Stacking (Z-Index Management)
**Problem**: Multiple windows overlapping incorrectly.
**Solution**: Used timestamps for dynamic z-index on window focus.

### Challenge 2: Mobile Responsiveness
**Problem**: XP wasn't designed for mobile!
**Solution**: Adaptive layouts with Tailwind's responsive utilities while maintaining the XP aesthetic.

### Challenge 3: Authentic XP Look
**Problem**: Getting pixel-perfect XP styling.
**Solution**: Studied original XP screenshots and used exact color values and gradients.

## 📱 Mobile Experience

While Windows XP wasn't mobile-friendly, I made sure the portfolio works great on all devices:

```typescript
// Responsive desktop icons
<div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
  <DesktopIcon label="My Projects" />
</div>

// Adaptive window sizes
<Window 
  width="90vw" // Mobile
  sm:width="600px" // Desktop
/>
```

## 🎓 What I Learned

1. **Attention to Detail Matters**: Recreating XP required studying every pixel
2. **State Management**: Managing multiple windows and their states
3. **CSS Gradients**: XP's UI is all about those gradients!
4. **User Experience**: Balancing nostalgia with modern UX expectations
5. **Performance**: Keeping it fast despite all the interactions

## 🔮 Future Enhancements

Here are some features I'm planning to add:

- [ ] 🎵 Winamp-style music player
- [ ] 🎮 Minesweeper mini-game
- [ ] 📧 Outlook-style contact form
- [ ] 🖼️ Photo gallery with Windows Photo Viewer
- [ ] 🔊 XP sound effects
- [ ] 💾 "Save" theme preferences
- [ ] 🌙 Dark mode (Windows XP Dark Edition)

## 🚀 Try It Yourself!

The project is open source and fully customizable:

1. **Clone the repo**:
```bash
git clone https://github.com/yourusername/windows-xp-portfolio
cd windows-xp-portfolio
npm install
```

2. **Update your data**:
Edit files in `src/data/` folder with your information

3. **Run locally**:
```bash
npm run dev
```

4. **Deploy**:
```bash
npm run build
```

## 📚 Resources & Credits

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [react-draggable](https://github.com/react-grid-layout/react-draggable)
- Windows XP screenshots for reference

## 🎬 Conclusion

Building this Windows XP portfolio was a journey down memory lane combined with modern web development. It proves that you can create something unique and memorable while showcasing your skills.

The best part? It's not just a gimmick - it's a fully functional, SEO-optimized, performant portfolio that stands out from the crowd.

**What nostalgic tech would you like to see recreated with modern web technologies? Let me know in the comments!** 💬

---

## 🔗 Links

- 🌐 **Live Demo**: [your-portfolio-url.com](https://your-portfolio-url.com)
- 💻 **GitHub Repo**: [github.com/yourusername/windows-xp-portfolio](https://github.com/yourusername/windows-xp-portfolio)
- 📖 **Customization Guide**: [CUSTOMIZATION.md](https://github.com/yourusername/windows-xp-portfolio/blob/main/CUSTOMIZATION.md)

---

If you found this interesting, give it a ❤️ and follow me for more web development content!

**Built with a cup of nostalgia ☕**

#WebDev #NextJS #React #Portfolio #WindowsXP #Nostalgia #TypeScript #TailwindCSS
