export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  tech: string;
  link: string;
  category: "Real Life Projects" | "Hobby Projects" | "Landing Pages";
}

export const projects: Project[] = [
  {
    id: "mypainlog",
    title: "Atlas Athlete",
    type: "Web Application",
    description: "Contributed to building AI-integrated web applications, implementing component-based design and integrating au-tomated user interactions via voice. Worked on human annotation modules for AI workflows and participated in modernizing legacy codebases into newer, efficient design technologies",
    tech: "Javascript, Reactjs, Redux, SCSS",
    link: "https://www.atlasathlete.ai/",
    category: "Real Life Projects"
  },
  {
    id: "scribelogs",
    title: "ScribeLogs",
    type: "Chrome Extension",
    description: "Developed a Chrome extension that summarizes YouTube videos by extracting transcripts and using the OpenAI API. Optimized costs by storing pre-generated summaries in Firestore and handling user queries by sending only the summary instead of the full transcript, enabling efficient chatbot-style interactions.",
    tech: "JavaScript, OpenAI API, Firebase",
    link: "",
    category: "Real Life Projects"
  },
  {
    id: "hospital",
    title: "Hospital Billing",
    type: "Web Application",
    description: "Built a hospital management and billing app using React.js and Tailwind CSS, with localStorage caching to reduceread/write load. Optimized UI performance and integrated dynamic reports for actionable admin insights",
    tech: "React, Express.js, Firebase Auth, Sequelize ORM, Ant.js, Chart.js",
    link: "",
    category: "Real Life Projects"
  },
  {
    id: "logiclifters",
    title: "LogicLifters",
    type: "Web Application",
    description: "Developed a dynamic course management website with an admin panel to add new courses and content, enabling users to access course materials directly from the platform",
    tech: "Reactjs, Nodejs, Expressjs, Nodejs, Firebase, TailwindCSS",
    link: "https://logiclifters.web.app/",
    category: "Real Life Projects"
  },
  {
    id: "edars",
    title: "E-Dars",
    type: "Web Application",
    description: "Developed a Quran learning platform using React.js and public APIs, featuring Bangla translation, audio playback, and user favorites. Built interactive Salat courses with quizzes, scoring, word tracking, and a real-time leaderboard.",
    tech: "Reactjs, Firebase, TailwindCSS, DaisyUI",
    link: "https://e-dars-bd.web.app/",
    category: "Hobby Projects"
  },
  {
    id: "token-lagbe",
    title: "Token Lagbe",
    type: "Web Application",
    description: "Developed a token management platform where hall students can buy and sell tokens from different halls in RUET.",
    tech: "Reactjs, Firebase, TailwindCSS, DaisyUI",
    link: "https://token-lagbe.web.app/",
    category: "Real Life Projects"
  },
  {
    id: "course-compass",
    title: "Course Compass",
    type: "Web Application",
    description: "Developed a course reviewing platform where students can review courses and rate them according to their experience for the juniors",
    tech: "Reactjs, Firebase, TailwindCSS, DaisyUI",
    link: "https://course-compass-ruet.web.app/",
    category: "Real Life Projects"
  },
  {
    id: "my-cf-tracker",
    title: "My Codeforces Tracker",
    type: "Web Application",
    description: "Developed a codeforces tracker where users can track their progress and get insights about their performance",
    tech: "HTML, CSS, Bootstrap, JavaScript, Codeforces API",
    link: "https://my-cf-tracker.netlify.app/home",
    category: "Hobby Projects"
  },
  {
    id: "github-profile-finder",
    title: "Github Profile Finder",
    type: "Web Application",
    description: "Developed a github profile finder where users can find github profiles by username",
    tech: "HTML, CSS, Bootstrap, JavaScript, Github API",
    link: "https://mahmudulahsan.github.io/github-finder-web-app/",
    category: "Hobby Projects"
  },
  {
    id: "merlin-group",
    title: "Merlin Group",
    type: "Landing Webpage",
    description: "Developed a landing page for Merlin Group",
    tech: "Reactjs, Firebase Hosting, TailwindCSS",
    link: "",
    category: "Landing Pages"
  },
  {
    id: "merlin-global",
    title: "Merlin Global Studies",
    type: "Landing Webpage",
    description: "Developed a landing page for Merlin Global Studies",
    tech: "Reactjs, Firebase Hosting, TailwindCSS",
    link: "https://merlinglobalstudy.com/",
    category: "Landing Pages"
  },
  {
    id: "ruet-cse-19-allumni",
    title: "RUET CSE 19 Allumni Database",
    type: "Web Application",
    description: "Developed a alumni platform by extracting data from google sheets for RUET CSE 19",
    tech: "Reactjs, Firebase Hosting, TailwindCSS",
    link: "https://ruet-cse-19-hof.web.app/",
    category: "Real Life Projects"
  },
];
