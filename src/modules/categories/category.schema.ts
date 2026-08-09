import z from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, "Name is required"),
    // slug: z.string().min(2, "Slug is required"),
    description: z.string().optional(),
    imageUrl: z.url().optional(),

});
export type CategoryInput = z.infer<typeof categorySchema>;