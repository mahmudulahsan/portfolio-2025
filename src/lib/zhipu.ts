
import { getPortfolioContext } from "./portfolioContext";

const API_KEY = process.env.NEXT_PUBLIC_ZHIPU_API_KEY;
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

export async function getZhipuResponse(userQuery: string): Promise<string> {
    if (!API_KEY) {
        console.error("NEXT_PUBLIC_ZHIPU_API_KEY is not set");
        return "My API key is missing. Please check the configuration.";
    }

    try {
        const context = await getPortfolioContext();

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "glm-4",
                messages: [
                    {
                        role: "system",
                        content: `You are Clippy, a helpful assistant for Mahmudul Ahsan's portfolio. 
                        
                        Context about Mahmudul Ahsan:
                        ${context}
                        
                        Please answer the user's question based on the context provided. Be helpful, concise, and friendly.`
                    },
                    {
                        role: "user",
                        content: userQuery
                    }
                ],
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Zhipu API Error:", response.status, errorText);
            return "I am currently having trouble connecting to Zhipu AI. Please try again later.";
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "I couldn't generate a response.";

    } catch (error) {
        console.error("Error calling Zhipu API:", error);
        return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
}
