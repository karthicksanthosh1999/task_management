import { userValidationSchema } from "@/app/login/schema/loginValidationSchema";
import { errorMessage, successMessage } from "@/lib/apiHandler";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const userJson = await req.json();
    const parsedUser = userValidationSchema.safeParse(userJson);
    if (!parsedUser.success) {
      return errorMessage("Please fill the all fields", 400);
    }
    const { email, password } = parsedUser.data;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return errorMessage("User not exist", 401);
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser?.password
    );

    if (!isValidPassword) {
      return errorMessage("Invalid Password", 401);
    }

    const token = jwt.sign(existingUser, JWT_SECRET, { expiresIn: "7d" });

    const response = successMessage(200, { existingUser }, "Login successful");

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true, // ✅ cannot be accessed by JS
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return errorMessage(error instanceof Error ? error.message : String(error));
  }
}
