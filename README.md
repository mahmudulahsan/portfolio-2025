# 🖥️ Windows XP Portfolio

A nostalgic, interactive portfolio website built with modern web technologies, designed to replicate the classic **Windows XP** desktop experience.

![Project Preview](/public/xp.png)

## ✨ Features

- **Authentic Windows XP UI**: Meticulously crafted desktop environment with a functional Taskbar, Start Menu, and System Tray.
- **Interactive Windows**: Draggable, minimizable, and stackable windows for various "applications".
- **Clippy Assistant**: A helpful, AI-powered (simulated) Clippy that answers questions about my skills and experience.
- **Applications**:
  - **My Profile (ahsan.js)**: A detailed profile viewer.
  - **Internet Explorer**: A blog reader interface.
  - **My Projects**: An interactive file explorer to browse my projects.
  - **Notepad**: A simple text viewer for the "Read Me" file.
  - **Winamp / Media Player**: (Planned/In-progress features).
- **Themes**: Switch between classic Blue, Olive, and Silver themes.
- **SEO Optimized**: Fully optimized with dynamic sitemaps, metadata, and Open Graph tags.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `react-draggable`, `clsx`, `tailwind-merge`

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

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

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
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
*Built with a cup of nostalgia ☕*
