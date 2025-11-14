import prisma from "@/lib/prisma";
import { errorMessage, successMessage } from "@/lib/apiHandler";

function convertBigInt(obj: any) {
    return JSON.parse(
        JSON.stringify(obj, (_, value) =>
            typeof value === "bigint" ? value.toString() : value
        )
    );
}


export async function GET() {
    try {
        const result = await prisma.$queryRawUnsafe(`
      SELECT 
        DATE("startDate") AS day,
        SUM(CASE WHEN state = 'Completed' THEN 1 ELSE 0 END) AS completed,
        SUM(CASE WHEN state = 'Pending' THEN 1 ELSE 0 END) AS pending,
        SUM(CASE WHEN state = 'Planning' THEN 1 ELSE 0 END) AS planning,
        SUM(CASE WHEN state = 'Progress' THEN 1 ELSE 0 END) AS progress
      FROM "Work"
      GROUP BY DATE("startDate")
      ORDER BY day ASC;
    `);
        const safe = convertBigInt(result);
        return successMessage(200, safe);
    } catch (error) {
        return errorMessage("Internal server error", 500, String(error));
    }
}
