import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";

config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export default async function generateEmbedding(text) {
    try {
        const result = await model.embedContent({
            model: "text-embedding-004",
            content: {
                parts: [{ text: text }]
            }
        });
        const embeddingValues = result.embedding.values; // ✅ Fix Here

        return embeddingValues;
    } catch (error) {
        console.error("Error generating embedding:", error);
        return null;
    }
}
