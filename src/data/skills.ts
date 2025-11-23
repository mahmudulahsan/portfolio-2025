export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "HTML", "Latex"]
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
    skills: ["Git", "GitHub", "Azure DevOps", "Notion", "VS Code", "Web Storm", "Postman"]
  }
];
