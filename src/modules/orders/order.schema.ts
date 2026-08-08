import z from "zod";
export const PaymentMethodEnum = z.enum(["BANK TRANSFER"])

const orderSchema = z.object({
    productId: z.string().min(1, "product ID is required"),
    variantId: z.string().optional(),
    quantity: z.number().int().positive("Quantity must be at least 1")

});

export const createOrderSchema = z.object({
    customerName: z.string().min(2, "Name is required"),
    deliveryAddress: z.string().min(5, "Delivery Address is required"),
    customerPhone: z.string().optional(),
    customerEmail: z.email("Invalid email address").optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    customerNote: z.string().optional(),
    paymentMethod: PaymentMethodEnum.optional(),
    items: z.array(orderSchema).min(1, "Your cart cannot be empty"),
    
});
export type OrderInput = z.infer<typeof orderSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>