import { OrderStatus, PaymentStatus } from "@/src/generated/prisma";
import { createOrderSchema, updateOrderSchema } from "@/src/modules/orders/order.schema";
import { createOrder, getOrders, updateOrderStatuses } from "@/src/modules/orders/order.service";


export async function POST(req: Request) {
  const body = await req.json();
  const result = createOrderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        message: "Validation failed",
        errors: result.error.issues,
      },
      { status: 400 },
    );
  }

  const order = await createOrder(result.data);

  return Response.json({ data: order }, { status: 201 });
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status") as OrderStatus | null;
        const paymentStatus = searchParams.get("paymentStatus") as PaymentStatus | null
        const orders = await getOrders({ status: status || undefined, paymentStatus: paymentStatus || undefined});

        return Response.json({ data: orders });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return Response.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}

