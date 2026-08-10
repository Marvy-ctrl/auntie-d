import { OrderStatus, PaymentStatus } from "@/src/generated/prisma";
import z from "zod";
export const PaymentMethodEnum = z.enum(["BANK_TRANSFER"])

const orderItemSchema = z.object({
    productId: z.string().min(1, "product ID is required"),
    variantId: z.string().optional(),
    quantity: z.number().int().positive("Quantity must be at least 1")

});

export const createOrderSchema = z.object({
    customerName: z.string().min(2, "Name is required"),
    deliveryAddress: z.string().min(5, "Delivery Address is required"),
    customerPhone: z.string().optional().or(z.literal("")),
    customerEmail: z.email("Invalid email address").optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    customerNote: z.string().optional(),
    paymentMethod: PaymentMethodEnum.optional(),
    items: z.array(orderItemSchema).min(1, "Your cart cannot be empty"),
    
});

export const updateOrderSchema = z.object({
    status: z.enum(OrderStatus).optional(),
    paymentStatus: z.enum(PaymentStatus).optional()
})

export type updateOrderInput = z.infer<typeof updateOrderSchema>
export type OrderItemInput = z.infer<typeof orderItemSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>