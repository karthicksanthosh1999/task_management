import z from "zod";
export const projectValidationSchema = z.object({
  userId: z.string({ message: "UserId is required" }),
  title: z.string({ message: "Title is required" }),
  state: z.enum(["Pending", "Completed", "Planning", "Progress"]),
  startDate: z
    .string()
    .transform((val) => {
      const [day, month, year] = val.split("-");
      return new Date(`${year}-${month}-${day}`);
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid start date format",
    }),
  endDate: z
    .string()
    .transform((val) => {
      const [day, month, year] = val.split("-");
      return new Date(`${year}-${month}-${day}`);
    })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid end date format",
    }),
});

export type TProjectValidationSchema = z.infer<typeof projectValidationSchema>;
