import { updateOrderSchema } from "@/src/modules/orders/order.schema";
import { getOrderById, updateOrderStatuses } from "@/src/modules/orders/order.service";
import { headers } from "next/headers";
import { auth } from "@/src/lib/auth";


export async function PATCH(req: Request, context: {params: Promise<{id: string}>}) {
    try {
        const session = await auth.api.getSession({ 
            headers: await headers() 
        });
        if (!session || session.user.role !== "admin") {
            return Response.json(
                { error: "Unauthorized. Admin access required." },
                { status: 401 }
            );
        }
        const resolvedParams = await context.params
        const orderId = resolvedParams.id;
        if (!orderId) {
            return Response.json(
                { error: "Order ID is required in the URL." },
                { status: 400 }
            );
        }
        const body = await req.json();
        const updatedData = updateOrderSchema.parse(body);
        const updatedOrder = await updateOrderStatuses(orderId, updatedData);

        return Response.json(
            { message: "Order updated successfully", data: updatedOrder },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Failed to update order:", error);
                if (error.name === "ZodError") {
            return Response.json(
                { error: "Validation failed", details: error.errors },
                { status: 400 }
            );
        }
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await context.params;
        const orderId = resolvedParams.id;

        if (!orderId) {
            return Response.json(
                { error: "Order ID is required in the URL." },
                { status: 400 }
            );
        }
        const order = await getOrderById(orderId);

        if (!order) {
            return Response.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }
        return Response.json(
            { data: order },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Failed to fetch order:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}