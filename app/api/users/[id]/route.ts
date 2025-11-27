import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return warningMessage("Invalid user id", 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      return warningMessage("User not found", 404);
    }

    return successMessage(200, existingUser, "User fetched successfully");
  } catch (error) {
    return errorMessage(
      "Internal Server Error",
      500,
      error instanceof Error ? error.message : String(error)
    );
  }
}
