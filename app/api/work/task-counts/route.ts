import { errorMessage, successMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const completed = await prisma.work.count({ where: { state: "Completed" } });
        const pending = await prisma.work.count({ where: { state: "Pending" } });
        const planning = await prisma.work.count({ where: { state: "Planning" } });
        const progress = await prisma.work.count({ where: { state: "Progress" } });
        const total = await prisma.work.count()
        const data = {
            Total: total,
            Completed: completed,
            Pending: pending,
            Planning: planning,
            Progress: progress,
        }

        return successMessage(200, data)
    } catch (error) {
        return errorMessage("Internal server error", 500, String(error))
    }
}