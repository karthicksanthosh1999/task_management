import { summarizedAgent } from "@/lib/ai/tools/chats/summarizeTasks";
import { errorMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        // Fetch tasks from DB
        const works = await prisma.work.findMany();

        // Extract only the useful fields (e.g., title)
        const workTitles = works.map(w => w.title || w.state || "").filter(Boolean);

        // Call the agent with a string
        const result = await summarizedAgent.invoke(
            { messages: `${message}: ${workTitles.join(", ")}` }
        );

        return NextResponse.json(result?.messages);
    } catch (error) {
        console.error(error);
        return errorMessage();
    }
}
