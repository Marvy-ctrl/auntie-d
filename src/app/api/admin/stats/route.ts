import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    // 1. Fetch orders (Make sure to select customerName)
    const [orders, productsCount] = await Promise.all([
      prisma.order.findMany({
        select: {
          id: true,
          total: true,
          customerName: true,
          customerPhone: true, 
          items: {
            select: {
              unitPrice: true,
              lineTotal: true,
              quantity: true,
            },
          },
        },
      }),
      prisma.product.count(),
    ]);

    const totalRevenue = orders.reduce((sum, order) => {
      if (order.total) return sum + Number(order.total);
      
      const orderTotal = order.items.reduce(
        (itemSum, item) => {
          const itemPrice = Number(item.lineTotal || (Number(item.unitPrice || 0) * Number(item.quantity || 0)));
          return itemSum + itemPrice;
        },
        0
      );
      return sum + orderTotal;
    }, 0);

    // 3. Count unique customers based strictly on Name (or Phone)
    const customerIdentifiers = orders.map((o: any) => {
      // Prioritize phone number if you decide to add it later
      if (o.phone) return `phone_${o.phone.toString().trim()}`;
      if (o.customerPhone) return `phone_${o.customerPhone.toString().trim()}`;
      
      // Group by customer name (converted to lowercase to ignore capitalization differences)
      if (o.customerName) return `name_${o.customerName.toString().trim().toLowerCase()}`;
      
      // Fallback if somehow there is no name at all
      return `order_${o.id}`;
    });

    const uniqueCustomers = new Set(customerIdentifiers).size;

    // 4. Return the calculated stats
    return NextResponse.json(
      {
        success: true,
        data: {
          revenue: totalRevenue,
          orders: orders.length,
          products: productsCount,
          customers: uniqueCustomers,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}