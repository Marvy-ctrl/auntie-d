import { Product } from "@/src/generated/prisma";
import { prisma } from "@/src/lib/prisma";
import { ProductInput, UpdateProductInput } from "./product.schema";
import { slugify } from "@/src/lib/utils";


export async function getProducts(): Promise<Product[]> {
    return prisma.product.findMany({
        include: {
            variants: true,
            category: true
        }
    })

}

export async function getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
        where: {
            id
        },
        include: {
            variants: true,
            category: true
        }
    })
}

export async function createProduct(_data: ProductInput) {
    const slug = slugify(_data.name)
    const {variants, ...productData} = _data;

    return await prisma.product.create({
        data: {
            ...productData, 
            slug,
            variants: variants && variants.length > 0 ? {
                create: variants.map(({ label, size, price }) => ({
                    label, 
                    size,
                    price,
                })),
            }  : undefined
        },
        include: {
            variants: true,
            category: true,
        }
    })

}


export async function updateProduct(id: string, data: UpdateProductInput) {
  const { variants, name, ...productData } = data;

  return prisma.product.update({
    where: { id },
    data: {
      ...productData,

      ...(name && {
        name,
        slug: slugify(name),
      }),
    },
  });
}

export async function deleteProduct(id: string) {
    return prisma.product.delete({
        where: {
            id

        }
    })
}