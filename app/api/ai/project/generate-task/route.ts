import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorMessage } from "@/lib/apiHandler";
import { suggestionChain } from "@/lib/ai/chains/suggestionChain";
import { IWork } from "@/app/types/workTypes";

// Create today's start and end timestamps
function getTodayRange() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    return { start, end };
}

// Convert tasks -> safe summary (not full data)
function summarizeTasks(tasks: IWork[]) {
    if (!tasks || tasks.length === 0) return "No tasks today.";

    return tasks
        .map((t) => `• ${t.title} — status: ${t.state}`)
        .join("\n");
}

export async function GET(_req: Request) {
    try {
        const { start, end } = getTodayRange();

        const tasks = await prisma.work.findMany({
            where: {
                startDate: {
                    gte: start,
                    lt: end,
                },
            },
        });

        // Only send summary to AI (secure + efficient)
        const summary = summarizeTasks(tasks);

        const suggestion = await suggestionChain(summary);

        return NextResponse.json({ suggestion });
    } catch (error) {
        return errorMessage(
            "Internal Server Error",
            500,
            String(error)
        );
    }
}
