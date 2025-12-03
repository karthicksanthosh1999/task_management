import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const { status } = await req.json();
        console.log(id, status)
        if (!id) return warningMessage("Id is required", 400);

        const existingUser = await prisma.work.update({
            where: { id },
            data: {
                state: status
            },
            include: { project: true, assignedUsers: true }
        })
        return successMessage(200, existingUser, "User fetched successfully");
    } catch (error) {
        return errorMessage("Internal Server Error", 500, String(error))
    }
}