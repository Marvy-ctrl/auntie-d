import { prisma } from "@/src/lib/prisma";
import { Category } from "@/src/generated/prisma";
import { CategoryInput } from "./category.schema";
import { slugify } from "@/src/lib/utils";

export async function getCategories(): Promise<Category[]> {
    return prisma.category.findMany({
        include: {
            products: true
        }
    })
}

export async function getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
        where: {
            id
        } 
    })
}

export async function createCategory(_data: CategoryInput) { 
    const slug = slugify(_data.name);

    const data = {..._data, slug}

    return await prisma.category.create({
        data
    })
} 


export async function updateCategory(id: string, data: CategoryInput) {
    const slug = slugify(data.name)
    return prisma.category.update({
        where: { id },
        data: {
            ...data, slug
        }
    })
}

export async function deleteCategory(id: string){
    return prisma.category.delete({
        where: {id}
    })
}