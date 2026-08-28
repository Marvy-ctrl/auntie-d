import { generateOrderNumber } from "@/src/lib/utils";
import { CreateOrderInput, updateOrderInput } from "./order.schema";
import {prisma} from "@/src/lib/prisma"
import { OrderStatus, PaymentStatus, Prisma } from "@/src/generated/prisma";


export async function createOrder(data: CreateOrderInput) {
  const productIds = data.items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    include: {
      variants: true,
    },
  });

    let subtotal = 0;
    const processedItems = [];

    for (const item of data.items) {
        const product = products.find(
            (product) => product.id === item.productId
    );

        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found.`);
    }

        let unitPrice: number;
        let variantLabel: string | null = null;
        let variantId: string | null = null;

        if (product.variants.length > 0) {
            if (!item.variantId) {
                throw new Error(`Product '${product.name}' requires a variant.`);
        }

        const variant = product.variants.find(
            (variant) => variant.id === item.variantId
      );

        if (!variant) {
            throw new Error(`Selected variant does not belong to '${product.name}'.`);
      }

        unitPrice = Number(variant.price);
        variantLabel = variant.label;
        variantId = variant.id;
    } else {
      if (product.price === null) {
        throw new Error(
          `Product '${product.name}' has no price configured.`
        );
      }

    unitPrice = Number(product.price);
    }

    const lineTotal = unitPrice * item.quantity;

    subtotal += lineTotal;

    processedItems.push({
      productId: product.id,
      variantId,
      productName: product.name,
      variantLabel: variantLabel ?? "",
      quantity: item.quantity,
      unitPrice,
      lineTotal
    });
  }
    const orderNumber = generateOrderNumber();
  
    const order = await prisma.order.create({
        data: {
            orderNumber,
            subtotal: subtotal,
            status: "AWAITING_CONFIRMATION",
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            customerNote: data.customerNote,
            deliveryAddress: data.deliveryAddress,
            city: data.city,
            state: data.state,
            items: {
                create: processedItems.map((item) => ({
                productId: item.productId,
                variantId: item.variantId,
                productName: item.productName,
                variantLabel: item.variantLabel ?? "",
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                lineTotal: item.lineTotal
                }))
        }

    },
    include: {
        items: true,
      },
  })
        return order
}


export async function getOrderById(identifier: string) {
  return await prisma.order.findFirst({
    where: {
      OR: [
        { orderNumber: { equals: identifier.trim(), mode: 'insensitive' } },
        { id: identifier.trim() },
      ],
    },
    include: {
      items: true,
    },
  });
}




export interface GetOrdersFilters {
    status?: OrderStatus;
    paymentStatus?: PaymentStatus;
}


export async function getOrders(filters?: GetOrdersFilters) {
    const orders = await prisma.order.findMany({
        where: {
            status: filters?.status,
            paymentStatus: filters?.paymentStatus
        },
        orderBy: {
            createdAt: "desc",
        }, 
        include: {
            items: true,
        }
    })
    return orders
}

export async function getOrdersPage({
  page,
  limit,
  search,
  status,
  paymentStatus,
}: {
  page: number;
  limit: number;
  search?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
}) {
  const where: Prisma.OrderWhereInput = {
    ...(status ? { status } : {}),
    ...(paymentStatus ? { paymentStatus } : {}),
    ...(search
      ? {
          OR: [
            { orderNumber: { contains: search, mode: "insensitive" } },
            { customerName: { contains: search, mode: "insensitive" } },
            { customerEmail: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [data, total] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { items: true },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.order.count({ where }),
  ]);

  return { data, total };
}

export async function updateOrderStatuses(orderId: string, data: updateOrderInput) {
    const existingOrder = await getOrderById(orderId);

    if (!existingOrder) {
        throw new Error("Order not found");
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: existingOrder.id,
      },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.paymentStatus && { paymentStatus: data.paymentStatus }),
      },
      include: {
        items: true,
      }
    });
    
    return updatedOrder;
}
