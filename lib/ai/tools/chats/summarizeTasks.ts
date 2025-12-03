import { createAgent, tool } from 'langchain';
import z from 'zod';
import { ollama } from '../../ai-config';

export const workSummarizedTool = tool(
    ({ works }) => {
        return `Searching for: ${works.join(", ")}`;
    },
    {
        name: "search",
        description: "Search for information",
        schema: z.object({
            works: z.array(z.string())
        })
    }
);


export const summarizedAgent = createAgent({
    model: ollama,
    tools: [workSummarizedTool],
})