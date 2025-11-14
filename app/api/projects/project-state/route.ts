import prisma from "@/lib/prisma";
import { errorMessage, successMessage } from "@/lib/apiHandler";

export async function GET() {
    try {
        const result = await prisma.$queryRaw<{ state: string; count: number }[]>`
      SELECT state, COUNT(*)::int as count
      FROM "Project"
      GROUP BY state
      ORDER BY state ASC;
    `;

        const labels = result.map((item) => item.state)
        const series = result.map((item) => item.count)
        let data = { labels, series }
        return successMessage(200, data);
    } catch (error) {
        console.error("Status Count Error:", error);
        return errorMessage("Filter error", 500, String(error));
    }
}
