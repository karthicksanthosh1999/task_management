import { ChatOllama } from "@langchain/ollama";

export const ollama = new ChatOllama({
    model: process.env.AI_MODEL || "gemma3:latest",
    baseUrl: process.env.OLLAMA_HOST || "http://localhost:11434",
    temperature: 0.2,
});
