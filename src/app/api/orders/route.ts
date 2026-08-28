import { OrderStatus, PaymentStatus } from "@/src/generated/prisma";
import { createOrderSchema, updateOrderSchema } from "@/src/modules/orders/order.schema";
import { createOrder, getOrders, getOrdersPage, updateOrderStatuses } from "@/src/modules/orders/order.service";


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
        const rawStatus = searchParams.get("status");
        const rawPaymentStatus = searchParams.get("paymentStatus");
        const status = rawStatus && Object.values(OrderStatus).includes(rawStatus as OrderStatus)
          ? rawStatus as OrderStatus
          : undefined;
        const paymentStatus = rawPaymentStatus && Object.values(PaymentStatus).includes(rawPaymentStatus as PaymentStatus)
          ? rawPaymentStatus as PaymentStatus
          : undefined;
        const requestedPage = searchParams.get("page");

        if (requestedPage) {
          const page = Math.max(1, Number.parseInt(requestedPage, 10) || 1);
          const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "10", 10) || 10));
          const search = searchParams.get("search")?.trim() || undefined;
          const result = await getOrdersPage({
            page,
            limit,
            search,
            status,
            paymentStatus,
          });
          const totalPages = Math.max(1, Math.ceil(result.total / limit));

          return Response.json({
            data: result.data,
            pagination: { page, limit, total: result.total, totalPages },
          });
        }

        const orders = await getOrders({ status, paymentStatus });

        return Response.json({ data: orders });
    } catch (error) {
        console.error("Failed to fetch orders:", error);
        return Response.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
