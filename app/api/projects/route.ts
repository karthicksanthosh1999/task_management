import { projectValidationSchema } from "@/app/projects/schema/projectSchema";
import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const projectBody = await req.json();
    const parsedProject = projectValidationSchema.safeParse(projectBody);
    console.log(projectBody, parsedProject);
    if (!parsedProject.success) {
      return warningMessage("Please fill the all inputs", 400);
    }
    const { endDate, startDate, state, title, userId } = parsedProject.data;
    const project = await prisma.project.create({
      data: {
        endDate,
        startDate,
        title,
        userId,
        state,
      },
    });

    return successMessage(201, project, "Project Created Successfully");
  } catch (error) {
    return errorMessage("Internal Server Error", 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const project = await prisma.project.findMany({
      orderBy: { startDate: "desc" },
      include: { user: true },
    });
    return successMessage(200, project, "Projects fetch successfully");
  } catch (error) {
    return errorMessage("Internal Server Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return warningMessage("Project ID is required", 400);
    }

    const project = await prisma.project.delete({ where: { id } });

    return successMessage(200, project, "User deleted successfully");
  } catch (error: any) {
    return errorMessage(error.message || "Internal Server Error", 500);
  }
}
