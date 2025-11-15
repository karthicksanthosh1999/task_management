import { workSchema } from "@/app/work/schema/workSchema";
import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const workBody = await req.json();
  const parsedWork = workSchema.safeParse(workBody);
  if (!parsedWork.success) {
    return warningMessage("Please fill the all fields", 400);
  }

  const { endDate, projectId, startDate, state, title, userId } =
    parsedWork.data;
  try {
    const work = await prisma.work.create({
      data: {
        endDate,
        startDate,
        title,
        projectId,
        userId,
        state: state,
      },
      include: { project: true },
    });
    return successMessage(201, work, "Work created successfully");
  } catch (error) {
    return errorMessage("Internal Server Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id") || "";

    const user = await prisma.work.delete({
      where: { id },
    });
    return successMessage(200, user, "Work Deleted Successfully");
  } catch (error) {
    return errorMessage("Internal Server Error", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const bodyParsed = await req.json();

    const id = searchParams.get("id") || "";

    if (!id) {
      return warningMessage("Invalid work id", 400);
    }

    const parsedWork = workSchema.safeParse(bodyParsed);

    if (!parsedWork.success) {
      return warningMessage("Please fill the all fields");
    }
    console.log(id, parsedWork.data);
    const { endDate, projectId, startDate, state, title, userId } =
      parsedWork.data;

    const work = await prisma.work.update({
      where: { id },
      data: {
        userId,
        endDate,
        projectId,
        startDate,
        state,
        title,
      },
      include: { project: true },
    });
    return successMessage(201, work, "Work updated successfully");
  } catch (error) {
    return errorMessage("Internal Server error", 500, String(error));
  }
}
