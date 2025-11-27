import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorMessage, successMessage } from "@/lib/apiHandler";
import { Prisma, Status } from "@/lib/generated/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const search = searchParams.get("search") || "";
    const status = searchParams.get("state") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const whereClass: Prisma.ProjectWhereInput = {};

    if (search) {
      whereClass.OR = [{ title: { contains: search, mode: "insensitive" } }];
    }

    if (status && status !== "All") {
      whereClass.state = status as Status;
    }

    if (
      startDate &&
      endDate &&
      !isNaN(new Date(startDate).getTime()) &&
      !isNaN(new Date(endDate).getTime())
    ) {
      whereClass.AND = [
        { startDate: { gte: new Date(startDate) } },
        { endDate: { lte: new Date(endDate) } },
      ];
    }

    const project = await prisma.project.findMany({
      where: whereClass,
      orderBy: { startDate: "desc" },
      include: { user: true },
    });

    return successMessage(200, project, "Projects fetched successfully");
  } catch (error) {
    console.error("Error fetching projects:", error);
    return errorMessage("Internal Server Error", 500);
  }
}
