/**
 * Work Experience
 * 
 * Add your professional work experience here.
 * Each entry should include:
 * - company: Company name
 * - role: Your job title
 * - period: Duration (e.g., "Jan 2023 - Present")
 * - points: Array of key responsibilities or achievements
 * 
 * List experiences in reverse chronological order (most recent first).
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  points: string[];
}

export const experiences: Experience[] = [
  {
    company: "MyMedicalHub International",
    role: "Jr. Software Engineer",
    period: "Jul 2025 - Present",
    points: [
      "Contributed to building AI-integrated web applications using component-based design.",
      "Integrated automated user interactions via voice and worked on human annotation modules.",
      "Modernized legacy codebases into newer, efficient design technologies."
    ]
  },
  {
    company: "Vivasoft Limited",
    role: "Front-end Intern",
    period: "Oct 2023 - Mar 2024",
    points: [
      "Contributed to front-end development of the Visitor Management System.",
      "Developed optimized UI components using React.js and Tailwind CSS.",
      "Collaborated in an Agile team with Git and version control best practices."
    ]
  }
];
