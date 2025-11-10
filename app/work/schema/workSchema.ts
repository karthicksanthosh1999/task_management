import { z } from "zod";

export const workSchema = z.object({
  userId: z.string({ message: "UserId is required" }),
  title: z.string({ message: "Title is required" }),
  projectId: z.string({ message: "Project is required" }),
  state: z.string({ message: "Status is required" }),
  startDate: z.string({ message: "Company is required" }),
});

export type TWorkSchemaType = z.infer<typeof workSchema>;
