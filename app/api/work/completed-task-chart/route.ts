import { prisma } from "@/lib/prisma";
import { errorMessage, successMessage } from "@/lib/apiHandler";

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<{ month: string; count: number }[]>`
      SELECT
        TO_CHAR("endDate", 'Mon') AS month,
        COUNT(*)::int AS count
      FROM "Work"
      WHERE state = 'Completed'
      GROUP BY month
      ORDER BY MIN("endDate");
    `;

    const categories = rows.map(
      (r: { month: string; count: number }) => r.month
    );
    const series = rows.map((r: { month: string; count: number }) => r.count);

    let data = {
      success: true,
      categories,
      series,
    };

    return successMessage(200, data);
  } catch (error) {
    return errorMessage("Internal server error", 500, String(error));
  }
}
