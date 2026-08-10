import { productSchema } from "@/src/modules/products/product.schema";
import { createProduct, getProducts } from "@/src/modules/products/product.service";


export async function GET(){
    const data = await getProducts()
    return Response.json({data})
}

export async function POST(req: Request) {
     const body = await req.json();
        const result = productSchema.safeParse(body);
    
        if (!result.success) {
            return Response.json(
                {
                    message: "Validation failed",
                    errors: result.error.issues
                },
                { status: 400 }
            )
        }
    
        const category = await createProduct(result.data);
    
        return Response.json(
            { data: category },
            { status: 201 }
        )
}