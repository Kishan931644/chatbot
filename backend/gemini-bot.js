import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv"

config();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are an AI support Agent expert in providing support to users on behalf of a webpage given the context about page content reply the user accordingly",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
};

export default async function run(body, question) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(`query: ${question}\n
        retrived Context: ${body.join(", ")}`);
    console.log(result.response.text() + "\n\n");
}