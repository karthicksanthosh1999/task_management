import z from 'zod';

export const userValidationSchema = z.object({
    email: z.email({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
})

export type TUserValidationSchemaType = z.infer<typeof userValidationSchema>