/**
 * Blogs Configuration
 * 
 * Add your blog posts and articles here.
 * These will be displayed in the "Internet Explorer" window.
 * 
 * Each blog entry should include:
 * - id: Unique identifier
 * - title: Blog post title
 * - description: Brief summary of the blog post
 * - link: URL to the blog post
 * - platform: Publishing platform (e.g., "Medium", "Dev.to", "Hashnode")
 * - date: Publication date
 */

export interface Blog {
  id: string;
  title: string;
  description: string;
  link: string;
  platform: "Medium" | "Dev.to" | "Hashnode" | "Personal Blog";
  date: string;
}

export const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "Windows XP based portfolio",
    description: "A nostalgic journey into building a portfolio with Windows XP aesthetics using modern web technologies.",
    link: "https://dev.to/mahmudulahsan",
    platform: "Dev.to",
    date: "Nov 26, 2025"
  }
];
