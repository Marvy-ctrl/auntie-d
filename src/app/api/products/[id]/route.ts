import { productSchema, updateProductSchema } from "@/src/modules/products/product.schema";
import { deleteProduct, getProductById, updateProduct } from "@/src/modules/products/product.service";


export async function GET(req: Request, {params}: {params: { id: string}} ) {
    const unwrapParams = await params
    const product = await getProductById(unwrapParams.id)
    
    if (!product) {
        return Response.json(
            { error: "Product not found" }, 
            { status: 404 }
        );
    }
    
    return Response.json({ data: product });


}


export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
    const { id } = await params
    const body = await req.json()

    const result = updateProductSchema.safeParse(body);
    
      if (!result.success) {
        return Response.json(
          {
            message: "Validation failed",
            errors: result.error.issues,
          },
          { status: 400 }
        );
      }
    
      const product = await updateProduct(id, result.data);
    
      return Response.json(
        { data: product },
        { status: 200 }
      );

}

export async function DELETE(req: Request, {params}: {params: Promise<{id:string}>}) {
    const {id} = await params
    await deleteProduct(id);

  return Response.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );


}