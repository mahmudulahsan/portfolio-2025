export interface Blog {
  id: string;
  title: string;
  description: string;
  link: string;
  platform: "Medium" | "Dev.to";
  date: string;
}

export const blogs: Blog[] = [
  {
    id: "blog-1",
    title: "Windows XP based portfolio",
    description: "",
    link: "https://dev.to/mahmudulahsan",
    platform: "Dev.to",
    date: "Nov 26, 2025"
  }
];
