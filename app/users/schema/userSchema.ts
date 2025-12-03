import { z } from "zod";

export const userSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  email: z.email({ message: "Email is required" }),
  mobile: z.string({ message: "Mobile is required" }),
  password: z.string({ message: "Password is required" }),
  company: z.string({ message: "Company is required" }),
  role: z.enum(["Admin", "Employee"], { message: "Role is required" })
});

export type UserSchemaType = z.infer<typeof userSchema>;

export const updateUserValidationSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "Name is required" }).min(1, "Name is required"),
  email: z.email({ message: "Email is required" }),
  mobile: z.string({ message: "Mobile is required" }),
  password: z.string().optional(),
  company: z.string({ message: "Company is required" }),
  role: z.enum(["Admin", "Employee"], { message: "Role is required" })
});

export type TUpdateUserValidationSchemaType = z.infer<
  typeof updateUserValidationSchema
>;
