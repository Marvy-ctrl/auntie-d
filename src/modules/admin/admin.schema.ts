import z from "zod";

const adminSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email(),
    passwordHash: z.string().min(8, "Password must be at least 8 characters long")
})

export type AdminInput = z.infer<typeof adminSchema>
