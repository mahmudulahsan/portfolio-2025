# 🖥️ Windows XP Portfolio

A nostalgic, interactive portfolio website built with modern web technologies, designed to replicate the classic **Windows XP** desktop experience.

![Project Preview](/public/xp.png)

## ✨ Features

- **Authentic Windows XP UI**: Meticulously crafted desktop environment with a functional Taskbar, Start Menu, and System Tray.
- **Boot & Lock Screen**: Classic Windows XP login experience with customizable lock screen.
- **Interactive Windows**: Draggable, minimizable, and stackable windows with proper z-index management.
- **AI-Powered Clippy Assistant**: 
  - Real-time AI responses powered by Google Gemini API
  - Smart rate limiting (3-second cooldown between messages)
  - Anti-spam protection with temporary bans
  - Token-based usage limits (10 messages per hour)
  - Persistent cooldown across page refreshes
- **Applications**:
  - **My Profile (ahsan.js)**: A detailed profile viewer with download resume functionality.
  - **Internet Explorer**: Modern blog reader with tab-like card UI and classic Windows styling.
  - **My Projects**: Interactive file explorer to browse projects with categorized views.
  - **My Skills**: Comprehensive skills viewer with technology categories.
  - **Contact Me**: Quick access to contact information and social links.
  - **Notepad**: Simple text viewer for the "Read Me" file.
  - **Run Dialog**: Execute custom URLs directly from the classic Run window.
  - **Display Properties**: Customize themes and wallpapers.
  - **System Properties**: View system information.
- **Multiple Themes**: Switch between 8 classic Windows XP themes:
  - Blue (Default)
  - Olive Green
  - Silver
  - Metallic
  - Homestead
  - Energy Blue
  - Navy Dark
  - Black Dark
- **Context Menu**: Right-click desktop for quick actions and settings.
- **SEO Optimized**: Fully optimized with dynamic sitemaps, metadata, and Open Graph tags.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) for Clippy Assistant
- **Utilities**: `react-draggable`, `clsx`, `tailwind-merge`

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Google Gemini API Key (for AI Clippy feature)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/portfolio-mahi.git
    cd portfolio-mahi
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory and add your Gemini API key:

    ```env
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
    ```

    Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

The project follows a clean, industry-standard structure:

```
src/
├── app/                 # Next.js App Router pages and layouts
│   ├── layout.tsx       # Root layout with SEO metadata
│   ├── page.tsx         # Main entry point (renders Desktop)
│   └── ...
├── components/
│   ├── apps/            # Application-specific components (IE, Projects, etc.)
│   ├── os/              # Core OS components (Desktop, Taskbar, Window, etc.)
│   └── ui/              # Reusable UI components (Shadcn/Radix)
├── data/                # Static data files (projects, skills, blogs)
├── lib/                 # Utility functions
└── ...
```

## 🔍 SEO & Performance

This portfolio is built with performance and SEO in mind:
- **Dynamic Metadata**: Optimized title and description tags.
- **Sitemap & Robots.txt**: Automatically generated for better crawling.
- **Open Graph**: Social media preview cards.
- **PWA Ready**: Includes a web app manifest.

## 🔒 Security & Rate Limiting

The AI Clippy Assistant includes robust security measures:
- **Rate Limiting**: 3-second minimum delay between messages
- **Spam Detection**: Automatic detection of rapid-fire requests
- **Temporary Bans**: 30-second cooldown for spam attempts
- **Token System**: 10 messages per user per hour
- **Persistent Cooldown**: 1-hour lockout stored in localStorage
- **API Protection**: Multi-layer defense against script-based attacks

## 🎨 Customization

Make this portfolio your own by updating the configuration files:

### Personal Information
- **`src/data/config.ts`**: Update system info, footer text, and personal details
- **`src/data/contact.ts`**: Add your contact information and social links
- **`src/data/skills.ts`**: List your technical skills and expertise
- **`src/data/projects.ts`**: Showcase your projects with descriptions and links
- **`src/data/blogs.ts`**: Add your blog posts and articles

### Styling
- **Themes**: Modify theme colors in `src/components/os/Window.tsx`
- **Wallpapers**: Add custom wallpapers in the Display Properties
- **Icons**: Replace icons in the `public/` folder

### AI Assistant
- **Prompts**: Customize Clippy's personality in `src/lib/gemini.ts`
- **Rate Limits**: Adjust token limits and cooldown times in `src/components/os/Clippy.tsx`

## 🤝 Contributing

Contributions are welcome! If you have ideas for new "apps" or features to add to this XP simulation, feel free to fork the repo and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

**Mahmudul Ahsan** - Software Engineer

- **Website**: [mahmudulahsan.com](https://mahmudulahsan.com)
- **LinkedIn**: [linkedin.com/in/ahsanmahmudul](https://www.linkedin.com/in/ahsanmahmudul/)
- **GitHub**: [github.com/mahmudulahsan](https://github.com/mahmudulahsan)

---

**Built with nostalgia and modern web technologies ☕**

*A tribute to Windows XP - the OS that started it all for many developers.*
