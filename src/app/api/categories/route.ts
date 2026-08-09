import { categorySchema } from "@/src/modules/categories/category.schema";
import { createCategory, getCategories } from "@/src/modules/categories/category.service";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
    const data = await getCategories()

    return Response.json({ data });
}


export async function POST(req: Request) {
    const body = await req.json();
    const result = categorySchema.safeParse(body);

    if (!result.success) {
        return Response.json(
            {
                message: "Validation failed",
                errors: result.error.issues
            },
            { status: 400 }
        )
    }

    const category = await createCategory(result.data);

    return Response.json(
        { data: category },
        { status: 201 }
    )
}


