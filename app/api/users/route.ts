import { userSchema } from "@/app/users/schema/userSchema";
import { errorMessage, successMessage, warningMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const parseUser = await req.json();
    const parsedUserSchema = userSchema.safeParse(parseUser);
    if (!parsedUserSchema.success) {
      return warningMessage("Please fill the all fields...", 400);
    }
    const { company, email, mobile, name, password } = parsedUserSchema.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        mobile,
        password: hashedPassword,
        company,
      },
    });

    return successMessage(201, user, "User created successfully");
  } catch (error) {
    return errorMessage(error instanceof Error ? error.message : String(error));
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = await req.nextUrl;
    const search = searchParams.get("search") || "";
    const user = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { mobile: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return successMessage(200, user, "User filter successfully");
  } catch (error) {
    return errorMessage("Internal Server Error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return warningMessage("User ID is required", 400);
    }

    const user = await prisma.user.delete({ where: { id } });

    return successMessage(200, user, "User deleted successfully");
  } catch (error: any) {
    return errorMessage(error.message || "Internal Server Error", 500);
  }
}
