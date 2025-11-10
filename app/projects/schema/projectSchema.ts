import z from "zod";
export const projectValidationSchema = z.object({
  userId: z.string({ message: "UserId is required" }),
  title: z.string({ message: "Title is required" }),
  state: z.string({ message: "Status is required" }),
  startDate: z.coerce.date({ message: "Start Date is required" }),
  endDate: z.coerce.date({ message: "End Date is required" }),
});

export type TProjectValidationSchema = z.infer<typeof projectValidationSchema>;
