import { achievements } from "@/data/achievements";
import { contactInfo } from "@/data/contact";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { hasKeyword } from "@/lib/utils";

export function getClippyAnswer(input: string) {
  const q = input.toLowerCase();

  // Helper to check any keyword
  const has = (...keywords: string[]) => hasKeyword(q, ...keywords);

  // ========== LOCATION ==========
  if (has("live", "stay", "home", "house", "country", "city", "reside", "born")) {
    return `Mahmudul Ahsan is from Dhaka, Bangladesh.`;
  }

  // ========== EDUCATION ==========
  if (has("education", "study", "school", "college", "university", "degree", "graduation", "cse", "ruet", "bsc")) {
    return `Mahmudul completed his BSc in Computer Science & Engineering from Rajshahi University of Engineering & Technology (RUET).`;
  }

  // ========== SKILLS ==========
  if (has(
    "skill", "skills", "stack", "tech", "technology", "know", "expertise",
    "frontend", "backend", "fullstack", "javascript", "typescript", "react", "next", "node", "sql", "mysql", "system design"
  )) {
    const allSkills = skillGroups.flatMap(g => g.skills);
    const sampleSkills = allSkills.slice(0, 6).join(", ");
    return `He is skilled in ${sampleSkills}, and many more. Explore the "My Skills" section for the complete set.`;
  }

  // ========== RESEARCH / THESIS / PUBLICATION ==========
  if (has("research", "researcher", "paper", "publication", "thesis", "ai", "machine learning", "ml", "xai", "explainable")) {
    return `He has completed research on spyware/anomaly detection using Machine Learning and Explainable AI (SHAP). His thesis focuses on detection in banking systems with Random Forest and SHAP-based feature importance.`;
  }

  // ========== PROJECTS ==========
  if (has("project", "projects", "built", "build", "make", "portfolio", "app", "application", "software", "webapp")) {
    const names = projects.slice(0, 4).map(p => p.title).join(", ");
    return `Some of his notable projects include ${names}. You can explore them inside the "My Projects" folder.`;
  }

  // ========== EXPERIENCE ==========
  if (has("experience", "job", "company", "work", "working", "career", "role", "position")) {
    const latest = experiences[0];
    return `He is currently working as a ${latest.role} at ${latest.company}. His experience includes ${experiences.length} major roles across different domains.`;
  }

  // ========== TECH FOCUS AREAS ==========
  if (has("frontend", "react", "nextjs", "next", "typescript", "astro", "vercel", "github actions", "performance")) {
    return `He specializes in modern Frontend development with React, Next.js, TypeScript, Astro, and performance optimization. He has practical experience deploying apps on Vercel and using GitHub Actions for CI/CD.`;
  }

  if (has("backend", "node", "express", "api", "rest", "mysql", "sequelize")) {
    return `He has backend experience with Node.js, Express, REST APIs, MySQL, and is currently migrating projects from raw SQL to Sequelize ORM.`;
  }

  // ========== FIREBASE / TWILIO (SMS PROJECTS) ==========
  if (has("firebase", "firestore", "twilio", "sms", "hospital", "serial", "appointment", "functions")) {
    return `He has built an SMS-based patient serial tracker using React, Firebase Firestore, Cloud Functions, Twilio, and Tailwind — helping hospitals manage patient queues efficiently.`;
  }

  // ========== CONTACT ==========
  if (has("contact", "email", "phone", "reach", "hire", "connect")) {
    return `You can reach him at ${contactInfo.email}. He is also active on LinkedIn if you'd like to connect professionally.`;
  }

  // ========== BLOGS ==========
  if (has("blog", "blogs", "write", "writing", "article")) {
    return `He writes about technology, development, and engineering topics. Explore his latest articles in the Blogs section.`;
  }

  // ========== ACHIEVEMENTS ==========
  if (has("achievement", "achievements", "award", "awards", "certificate", "certification")) {
    return `He has earned recognitions such as "${achievements[0].title}" along with several technical certificates and academic accomplishments.`;
  }

  // ========== GENERAL IDENTITY ==========
  if (has("who", "name", "about you", "about him", "identity", "mahmudul", "mahmudul ahsan", "mahi")) {
    return `That's Mahmudul Ahsan — a passionate Software Engineer with strong expertise in Frontend development, React/Next.js, Node.js, AI research, and full-stack systems.`;
  }

  // ========== GREETINGS ==========
  if (has("hi", "hello", "hey", "assalamu", "salam", "hola")) {
    return "Hello! How can I assist you in exploring Mahmudul's portfolio today?";
  }

  // ========== FALLBACK ==========
  return `I noticed your question. I'm best at answering about Mahmudul's education, skills, experience, research, or projects. Try asking “What are his skills?” or “Show his projects.”`;
}
