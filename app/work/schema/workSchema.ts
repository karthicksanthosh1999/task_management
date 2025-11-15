import { z } from "zod";

export const workSchema = z.object({
  id: z.string().optional(),
  userId: z.string({ message: "UserId is required" }),
  title: z.string({ message: "Title is required" }),
  projectId: z.string({ message: "Project is required" }),
  state: z.enum(["Pending", "Completed", "Planning", "Progress"], {
    error: "State is required",
  }),
  startDate: z.coerce.date({ message: "Start Date is required" }),
  endDate: z.coerce.date({ message: "End Date is required" }),
});

export type TWorkSchemaType = z.infer<typeof workSchema>;

export const workExportValidationSchema = z.object({
  projectId: z.string().optional(),
  state: z.enum(["Pending", "Completed", "Planning", "Progress"]).optional(),
  startDate: z.coerce.date({ message: "Start Date is required" }),
  endDate: z.coerce.date({ message: "End Date is required" }),
});

export type TWorkExportValidationSchema = z.infer<
  typeof workExportValidationSchema
>;
