import { prisma } from "@/src/lib/prisma";
import { Category } from "@/src/generated/prisma";
import { CategoryInput } from "./category.schema";
import { slugify } from "@/src/lib/utils";

export async function getCategories(): Promise<Category[]> {
    return prisma.category.findMany()
}

export async function getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
        where: {
            id
        } 
    })
}

export async function createCategory(data: CategoryInput) { 
    const { name, description, imageUrl } = data
    const slug = slugify(name);

    return await prisma.category.create({
        data: {
            name,
            description,
            slug,
            imageUrl
        }
    })
} 


