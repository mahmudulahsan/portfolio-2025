# 🎨 Customization Guide

This guide will help you personalize this Windows XP Portfolio template to make it your own!

## 📝 Quick Start - 3 Simple Steps

### Step 1: Update Your Personal Information

Edit `src/data/config.ts` - This is your main configuration file:

```typescript
export const portfolioConfig = {
  owner: {
    name: "Your Full Name",           // Your name
    firstName: "Your",                 // First name
    lastName: "Name",                  // Last name
    initials: "YN",                    // Your initials (for avatar fallback)
    title: "Your Job Title",           // e.g., "Software Engineer"
    subtitle: "Your Subtitle",         // e.g., "Full Stack Developer"
    location: "Your City, Country",    // Your location
    bio: "Your bio here...",           // Short bio about yourself
    profileImage: "/your-photo.jpg",   // Path to your photo in /public folder
  },

  site: {
    name: "Your Portfolio Name",
    url: "https://yourwebsite.com",
    description: "Your portfolio description...",
    keywords: ["Your", "Keywords", "Here"],
    ogImage: "/og-image.png",
    twitterHandle: "@yourhandle",
  },

  resume: {
    fileName: "Your_Resume.pdf",
    filePath: "/Your_Resume.pdf",
  },

  clippy: {
    welcomeMessage: "Hi! I'm Clippy. Ask me anything about [Your Name]!",
  },

  readme: {
    content: `Your readme content here...`,
  },

  system: {
    computerName: "YOUR-PC",
    osName: "Portfolio OS XP",
    processor: "Your Processor Description",
    memory: "Your Memory Description",
  },

  footer: {
    text: "© Your Name | Your tagline",
    showCoffeeIcon: true,
  },
};
```

### Step 2: Update Your Data Files

All data files are in `src/data/` directory:

#### `contact.ts` - Your Contact Information
```typescript
export const contactInfo = {
  email: "your@email.com",
  phone: "+1234567890",
  address: "Your City, Country",
  links: [
    {
      id: "email",
      label: "Email",
      value: "your@email.com",
      href: "mailto:your@email.com"
    },
    // Add your social media links...
  ]
};
```

#### `skills.ts` - Your Technical Skills
```typescript
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["JavaScript", "Python", "Java", ...]
  },
  {
    title: "Frontend",
    skills: ["React", "Vue", "Angular", ...]
  },
  // Add more categories...
];
```

#### `experience.ts` - Your Work Experience
```typescript
export const experiences: Experience[] = [
  {
    company: "Company Name",
    role: "Your Role",
    period: "Jan 2023 - Present",
    points: [
      "Achievement 1",
      "Achievement 2",
    ]
  },
  // Add more experiences...
];
```

#### `projects.ts` - Your Projects
```typescript
export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Name",
    type: "Web Application",
    description: "Project description...",
    tech: "React, Node.js, MongoDB",
    link: "https://project-url.com",
    category: "Real Life Projects" // or "Hobby Projects" or "Landing Pages"
  },
  // Add more projects...
];
```

#### `blogs.ts` - Your Blog Posts
```typescript
export const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "Blog Post Title",
    description: "Brief description...",
    link: "https://blog-url.com",
    platform: "Medium", // or "Dev.to", "Hashnode", "Personal Blog"
    date: "Jan 1, 2024"
  },
  // Add more blogs...
];
```

#### `achievements.ts` - Your Achievements & Certifications
```typescript
export const achievements: Achievement[] = [
  {
    title: "Achievement Title",
    description: "Description or issuing organization",
    link: "https://certificate-url.com" // Optional
  },
  // Add more achievements...
];
```

#### `research.ts` - Your Research Work (Optional)
```typescript
export const researchItems: Research[] = [
  {
    title: "Conference Paper | Venue 2024",
    subtitle: "Research Title",
    description: "Brief description of your research..."
  },
  // Add more research...
];
```

### Step 3: Update SEO & Metadata

Edit `src/app/layout.tsx` to update SEO information:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Your Name - Your Title",
    template: "%s | Your Name",
  },
  description: "Your portfolio description...",
  keywords: ["Your", "Keywords"],
  authors: [{ name: "Your Name", url: "https://yoursite.com" }],
  // ... update other fields
};
```

Edit `src/app/manifest.ts`:
```typescript
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Your Portfolio Name',
    short_name: 'Your Name',
    description: 'Your Description',
    // ...
  }
}
```

Edit `src/app/sitemap.ts`:
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourwebsite.com',
      lastModified: new Date(),
      // ...
    },
  ]
}
```

Edit `src/app/robots.ts`:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yourwebsite.com/sitemap.xml',
  }
}
```

## 🖼️ Adding Your Images

Place these files in the `/public` folder:

1. **Profile Photo**: `/public/your-photo.jpg` (Update path in config.ts)
2. **Resume/CV**: `/public/Your_Resume.pdf` (Update in config.ts)
3. **OG Image**: `/public/og-image.png` (1200x630px for social media previews)
4. **Favicon**: Already has `/public/mycomputer.ico`, replace if needed
5. **Wallpaper**: `/public/wallpaper.jpeg` (or add your own)

## 🎨 Customizing Clippy's Knowledge

Edit `src/data/clippyKnowledge.tsx` to customize how Clippy responds to questions about you.

The function `getClippyAnswer` uses keyword matching. Update the responses to reflect your information:

```typescript
// Example: Update location response
if (has("live", "stay", "home", ...)) {
  return `[Your Name] is from [Your Location].`;
}

// Update education response
if (has("education", "study", ...)) {
  return `[Your Name] completed [Your Degree] from [Your University].`;
}
```

## 🚀 Testing Your Changes

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. Test all features:
   - ✅ Desktop icons open correctly
   - ✅ Profile information is accurate
   - ✅ Projects display properly
   - ✅ Contact links work
   - ✅ Clippy responds with your information
   - ✅ Resume downloads correctly

## 📦 Building for Production

When you're ready to deploy:

```bash
npm run build
npm start
```

## 🎯 Common Customizations

### Change Theme Colors
Edit `src/data/config.ts`:
```typescript
theme: {
  primaryColor: "#YOUR_COLOR",
  defaultTheme: "Blue", // or "Olive" or "Silver"
}
```

### Hide/Show Desktop Icons
Edit `src/data/config.ts`:
```typescript
desktop: {
  showSkills: true,
  showProjects: true,
  showProfile: true,
  showContact: true,
  showReadme: true,
  showInternetExplorer: true,
}
```

### Disable Clippy
Edit `src/data/config.ts`:
```typescript
clippy: {
  enabled: false,
}
```

## 🐛 Troubleshooting

**Images not showing?**
- Make sure images are in the `/public` folder
- Use correct paths (e.g., `/image.jpg` not `./image.jpg`)

**Clippy not responding correctly?**
- Check `src/data/clippyKnowledge.tsx`
- Update keyword matching logic

**SEO not working?**
- Verify all metadata files are updated
- Check `layout.tsx`, `manifest.ts`, `sitemap.ts`, `robots.ts`

## 📚 Need Help?

- Check the main `README.md` for installation instructions
- Review the code comments in data files
- All configuration is centralized in `src/data/` folder

---

**Happy Customizing! 🎉**

Make this portfolio truly yours by updating all the data files. The UI and functionality will remain the same, but the content will be all about you!
