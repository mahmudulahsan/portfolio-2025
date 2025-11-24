export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "HTML", "JSX", "Latex"]
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "CSS", "SCSS", "Tailwind CSS", "Shadcn", "DaisyUI", "Bootstrap", "Redux"]
  },
  {
    title: "Backend & DB",
    skills: ["Node.js", "Express.js", "Sequelize", "SQL", "MySQL", "MongoDB", "Firebase"]
  },
  {
    title: "Tools & Others",
    skills: ["Git", "GitHub", "GitHub Actions", "Azure DevOps", "Heroku", "Firebase Hosting", "Firebase Auth", "Notion", "VS Code", "WebStorm", "Postman"]
  }
];
