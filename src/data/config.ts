/**
 * Portfolio Configuration
 * 
 * This is the main configuration file for your Windows XP Portfolio.
 * Update the values below to personalize your portfolio.
 */

export const portfolioConfig = {
  // Personal Information
  owner: {
    name: "Mahmudul Ahsan",
    firstName: "Mahmudul",
    lastName: "Ahsan",
    initials: "MA",
    title: "Software Engineer",
    subtitle: "Full Stack Developer",
    location: "Dhaka, Bangladesh",
    bio: "A passionate Software Engineer with strong expertise in Frontend development, React/Next.js, Node.js, AI research, and full-stack systems.",
    profileImage: "/pro.jpg", // Path to your profile image in /public folder
  },

  // Website Metadata (for SEO)
  site: {
    name: "Mahmudul Ahsan Portfolio",
    url: "https://ahsan-xp.vercel.app",
    description: "Explore the portfolio of Mahmudul Ahsan, a passionate Software Engineer specializing in Full Stack Development, React, Next.js, and modern web technologies. Experience a nostalgic Windows XP theme.",
    keywords: [
      "Mahmudul Ahsan",
      "Software Engineer",
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "Portfolio",
      "Windows XP Theme",
      "Web Developer",
      "Frontend Engineer",
      "Bangladesh",
    ],
    ogImage: "/og-image.png", // Open Graph image (1200x630px recommended)
    twitterHandle: "@mahmudulahsan", // Your Twitter handle (optional)
  },

  // Theme Colors
  theme: {
    primaryColor: "#245EDC", // Windows XP Blue
    defaultTheme: "Blue" as "Blue" | "Olive" | "Silver",
    defaultWallpaper: "/wallpaper.jpeg",
  },

  // Desktop Icons Configuration
  desktop: {
    showSkills: true,
    showProjects: true,
    showProfile: true,
    showContact: true,
    showReadme: true,
    showInternetExplorer: true,
  },

  // Resume/CV
  resume: {
    fileName: "Mahmudul_Ahsan_Resume.pdf",
    filePath: "/Mahmudul_Ahsan_Resume.pdf", // Path in /public folder
  },

  // Clippy Assistant
  clippy: {
    enabled: true,
    welcomeMessage: "Hi! I'm Clippy. Ask me anything about Mahmudul Ahsan!",
  },

  // README.txt content for Notepad
  readme: {
    content: `I'm Mahmudul Ahsan from Dhaka, Bangladesh, a graduate of CSE, RUET and currently working as a Software Engineer at MyMedicalHub International. I love thinking creatively and enjoy bringing engineering concepts into real-life applications.

My journey with computers began almost 20 years ago with Windows XP, a system I still feel deeply nostalgic about. From Road Rash to SkyRoads and countless games from those classic mixed DVDs in friday-morning, Windows XP shaped many of my earliest tech memories. That's why this website is designed to look and feel like Windows XP, my all-time favorite OS.

Feel free to explore my skills, experience, and projects—all presented through a nostalgic XP-style interface.

This website is developed using Next.js, TypeScript Tailwind CSS and shadcn ui.`,
  },

  // System Properties
  system: {
    computerName: "MAHMUDUL-PC",
    osName: "Portfolio OS XP",
    processor: "Full Stack Developer Brain",
    memory: "Unlimited Creativity",
  },

  // Footer
  footer: {
    text: "© Mahmudul Ahsan",
    showCoffeeIcon: false,
  },
};
