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
    });
    return successMessage(201, work, "Work created successfully");
  } catch (error) {
    return errorMessage("Internal Server Error", 500);
  }
}
