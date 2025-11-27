import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPortfolioContext } from "./portfolioContext";

// Get API key from environment variable
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
    throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function getGeminiResponse(userQuery: string): Promise<string> {
    try {
        const context = getPortfolioContext();
        const prompt = `${context}\n\nUser Question: ${userQuery}\nAnswer:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
}
