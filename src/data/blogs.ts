export interface Blog {
  id: string;
  title: string;
  description: string;
  link: string;
  platform: "Medium" | "Dev.to" | "Hashnode" | "Personal" | "Other";
  date: string;
}

export const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "Understanding React Server Components",
    description: "A deep dive into how RSCs work and why they matter for modern web development.",
    link: "#",
    platform: "Medium",
    date: "Oct 15, 2024"
  },
  {
    id: "blog-2",
    title: "Optimizing Next.js Performance",
    description: "Tips and tricks to make your Next.js applications fly.",
    link: "#",
    platform: "Dev.to",
    date: "Sep 22, 2024"
  },
   {
    id: "blog-3",
    title: "The Art of CSS Grid",
    description: "Mastering layouts with CSS Grid: A comprehensive guide.",
    link: "#",
    platform: "Hashnode",
    date: "Aug 10, 2024"
  }
];
