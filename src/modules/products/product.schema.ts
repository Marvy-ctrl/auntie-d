import z from "zod";

export const ProductSizeEnum = z.enum(["ML_250", "Ml_500", "L_1"]);

export const productVariantSchema = z.object({
  label: z.string().min(1, "Variant label is required"),
  size: ProductSizeEnum,
  price: z.coerce.number().positive("Price must be greater than 0"),
});
export const productSchema = z.object({
    name: z.string().min(2, "name is required"),
    slug: z.string().min(2, "Slug is required"),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    price: z.coerce.number().positive("Price must be greater than 0"),
    benefits: z.array(z.string()).default([]),
    warnings: z.array(z.string()).default([]),  
    featured: z.boolean().default(false),
    categoryId: z.string().min(1, "You must select a category"),
    image: z.string().min(1, "Product image is required"), 
    variants: z.array(productVariantSchema).optional().default([]),

});
export type ProductVariantInput = z.infer<typeof productVariantSchema>;
export type ProductInput = z.infer<typeof productSchema>;
