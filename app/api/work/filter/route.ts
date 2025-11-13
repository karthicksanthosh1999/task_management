import { errorMessage, successMessage } from "@/lib/apiHandler";
import { Prisma, Status } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const { searchParams } = req.nextUrl;

        const search = searchParams.get('search') || "";
        const project = searchParams.get("project") || "";
        const status = searchParams.get("status") || "";
        const startDate = searchParams.get("startDate") || "";
        const endDate = searchParams.get("endDate") || "";

        const whereClass: Prisma.WorkWhereInput = {};

        if (search) {
            whereClass.title = { contains: search, mode: 'insensitive' }
        }

        if (status && status !== "All") {
            whereClass.state = status as Status
        }

        if (project && project !== "All") {
            whereClass.projectId = project
        }

        if (startDate && endDate && !isNaN(new Date(startDate).getTime()) && !isNaN(new Date(endDate).getTime())) {
            whereClass.AND = [
                { startDate: { gte: new Date(startDate) } },
                { endDate: { lte: new Date(endDate) } }
            ]
        }

        const work = await prisma.work.findMany({
            where: whereClass,
            orderBy: { startDate: "desc" },
            include: { project: true },
        })
        return successMessage(200, work, "Work fetched successfully");

    } catch (error) {
        console.error("Error fetching work:", error);
        return errorMessage("Internal Server Error", 500);
    }
}