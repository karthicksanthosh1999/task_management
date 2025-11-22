import { suggestionPrompt } from "../prompts/suggestionPrompt";
import { ollama } from "../ai-config";
import { StringOutputParser } from "@langchain/core/output_parsers";

export async function suggestionTool(tasks: string) {
    const today = new Date().toISOString().split("T")[0];

    const prompt = suggestionPrompt
        .replace("{tasks}", JSON.stringify(tasks, null, 2))
        .replace("{today}", today);

    const chain = ollama.pipe(new StringOutputParser());

    const output = await chain.invoke(prompt);
    return output.trim();
}
