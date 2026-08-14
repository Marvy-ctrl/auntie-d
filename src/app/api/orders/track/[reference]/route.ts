import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> } // Type params as a Promise
) {
  try {
    // Await the params object first
    const resolvedParams = await params;
    const reference = resolvedParams.reference;

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference is required" },
        { status: 400 }
      );
    }

    // Search for the order where orderNumber matches the reference
    const order = await prisma.order.findFirst({
      where: {
        orderNumber: {
          equals: reference.trim(),
          mode: 'insensitive',
        },
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}