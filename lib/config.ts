import { IWork } from "@/app/types/workTypes";

export function safeJsonParse(response: string, fallback: IWork) {
    try {
        const jsonStart = response.indexOf("{");
        const jsonEnd = response.lastIndexOf("}");
        const jsonStr = response.substring(jsonStart, jsonEnd + 1);

        return JSON.parse(jsonStr);
    } catch (err) {
        console.error("JSON Parse Failed:", err);
        return fallback;
    }
}
