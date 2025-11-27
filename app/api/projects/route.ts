import { projectValidationSchema } from "@/app/projects/schema/projectSchema";
import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const projectBody = await req.json();
    const parsedProject = projectValidationSchema.safeParse(projectBody);
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
        state: state,
      },
    });

    return successMessage(201, project, "Project Created Successfully");
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    if (!id) {
      return warningMessage("Project ID is required", 400);
    }
    const project = await prisma.project.findUnique({ where: { id } });
    return successMessage(200, project, "User deleted successfully");
  } catch (error) {
    return errorMessage(
      error instanceof Error ? error.message : String(error),
      500
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const projectJsonData = await req.json();
    const { searchParams } = req.nextUrl;

    const parsedData = projectValidationSchema.safeParse(projectJsonData);

    const id = searchParams.get("id") || "";

    if (!parsedData.success) {
      return warningMessage("Please fill the all fields", 400);
    }

    const { endDate, startDate, state, title, userId } = parsedData.data;
    if (!id) {
      return warningMessage("Project ID is required", 400);
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        endDate,
        startDate,
        state,
        title,
        userId,
      },
    });
    return successMessage(200, project, "Project updated successfully");
  } catch (error) {
    return errorMessage(
      error instanceof Error ? error.message : String(error),
      500
    );
  }
}
