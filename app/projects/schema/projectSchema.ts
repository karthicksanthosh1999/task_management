import z from "zod";
export const projectValidationSchema = z.object({
  id: z.string().optional(),
  userId: z.string({ message: "UserId is required" }),
  title: z.string({ message: "Title is required" }),
  state: z.enum(["Pending", "Completed", "Planning", "Progress"]),
  startDate: z.coerce.date({ message: "Start Date is required" }),
  endDate: z.coerce.date({ message: "End Date is required" }),
});

export type TProjectValidationSchema = z.infer<typeof projectValidationSchema>;

export const projectFilterValidationSchema = z.object({
  state: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type TProjectFilterValidation = z.infer<
  typeof projectFilterValidationSchema
>;
