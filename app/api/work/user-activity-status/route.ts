import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";



type StatusKey = "progress" | "planning" | "completed" | "pending";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;

        const userId = searchParams.get("userId") || "";

        if (!userId) {
            return warningMessage("User id is required", 400);
        }


        const work = await prisma.work.findMany({
            where: {
                userId
            },
            include: { project: true },
        });
        const projectSummary: Record<
            string,
            {
                project: string;
                progress: number;
                planning: number;
                completed: number;
                pending: number;
            }
        > = {};

        work.forEach((item) => {
            const projectName = item.project.title;
            const status = item.state.toLowerCase() as StatusKey;

            if (!projectSummary[projectName]) {
                projectSummary[projectName] = {
                    project: projectName,
                    progress: 0,
                    planning: 0,
                    completed: 0,
                    pending: 0,
                };
            }

            projectSummary[projectName][status] += 1;
        });

        const result = Object.values(projectSummary);

        return successMessage(200, result);
    } catch (error) {
        console.log(error);
        return errorMessage("Internal Server Error", 500);
    }
}
