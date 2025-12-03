import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, JWT_SECRET);

    // fetch user from DB if needed
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Invalid token" },
      { status: 401 }
    );
  }
}
