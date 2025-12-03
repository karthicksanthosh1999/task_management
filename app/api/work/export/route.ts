import { TExcelCell } from "@/app/types/excelRowTypes";
import { errorMessage } from "@/lib/apiHandler";
import { Status } from "@/lib/generated/prisma";
import { Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(req: NextRequest) {
  try {
    const HEADER_TITLES: Record<string, string> = {
      name: "Task Name",
      status: "Status",
      startDate: "Start Date",
      endDate: "End Date",
      "project.title": "Project Name",
      "user.name": "User Name",
      "user.email": "User Email",
    };
    type TExcelRow = Record<string, TExcelCell>;

    const { searchParams } = req.nextUrl;

    const status = searchParams.get("status") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const project = searchParams.get("project") || "";

    const fields = (searchParams.get("fields") || "")
      .split(",")
      .filter(Boolean);

    const whereClass: Prisma.WorkWhereInput = {};

    if (status) whereClass.state = status as Status;
    if (project) whereClass.projectId = project;

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

    const work = await prisma.work.findMany({
      where: whereClass,
      orderBy: { startDate: "desc" },
      include: { project: true, user: true },
    });

    const filteredWork: TExcelRow[] = work.map((item) => {
      const row: TExcelRow = {};

      fields.forEach((f) => {
        const excelKey = HEADER_TITLES[f] || f;

        if (f.includes(".")) {
          const [parent, child] = f.split(".");
          const parentObj = (item as Record<string, any>)[parent] ?? null;
          const value = parentObj ? parentObj[child] : null;
          row[excelKey] = value as TExcelCell;
        } else {
          const value = (item as Record<string, any>)[f] ?? null;
          row[excelKey] = value as TExcelCell;
        }
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredWork);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    return new NextResponse(buffer, {
      headers: {
        "Content-Disposition": "attachment; filename=work.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Error fetching work:", error);
    return errorMessage("Internal Server Error", 500);
  }
}
