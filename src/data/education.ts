export interface Education {
    institution: string;
    degree: string;
    field: string;
    period: string;
    cgpa?: string;
    location?: string;
}

export const education: Education[] = [
    {
        institution: "Rajshahi University of Engineering & Technology",
        degree: "B.Sc",
        field: "Computer Science & Engineering",
        period: "Jan 2020 - June 2025",
        // cgpa: "3.33 / 4.00",
        location: "Rajshahi, Bangladesh"
    }
];
