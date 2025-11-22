import { IWork } from "@/app/types/workTypes";
import { suggestionTool } from "../tools/suggestionTool";

export async function suggestionChain(tasks: string) {
    return await suggestionTool(tasks);
}
