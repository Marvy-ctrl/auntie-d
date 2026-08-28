import { productSchema, updateProductSchema } from "@/src/modules/products/product.schema";
import { deleteProduct, getProductById, updateProduct } from "@/src/modules/products/product.service";
import { uploadToCloudinary } from "@/src/lib/cloudinary";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProductById(id)
    
    if (!product) {
        return Response.json(
            { error: "Product not found" }, 
            { status: 404 }
        );
    }
    
    return Response.json({ data: product });


}


// export async function PATCH(req: Request, {params}: {params: Promise<{id: string}>}) {
//     const { id } = await params
//     const body = await req.json()

//     const result = updateProductSchema.safeParse(body);
    
//       if (!result.success) {
//         return Response.json(
//           {
//             message: "Validation failed",
//             errors: result.error.issues,
//           },
//           { status: 400 }
//         );
//       }
    
//       const product = await updateProduct(id, result.data);
    
//       return Response.json(
//         { data: product },
//         { status: 200 }
//       ); 

// }



export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    // Text fields
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const shortDescription = (formData.get("shortDescription") as string) || "";
    const description = (formData.get("description") as string) || "";

    // Parse boolean for featured
    const featuredRaw = formData.get("featured");
    const featured = featuredRaw === "true";

    // Parse benefits and warnings
    const benefitsRaw = (formData.get("benefits") as string) || "";
    const warningsRaw = (formData.get("warnings") as string) || "";
    const benefits = benefitsRaw ? benefitsRaw.split("\n").filter(Boolean) : [];
    const warnings = warningsRaw ? warningsRaw.split("\n").filter(Boolean) : [];

    // Parse variants JSON string
    const variantsRaw = (formData.get("variants") as string) || "[]";
    let variants = [];
    try {
      const parsed = JSON.parse(variantsRaw);
      variants = parsed.map((v: any) => ({
        label: v.label || "",
        size: v.size || "",
        price: parseFloat(v.price) || 0,
      }));
    } catch {
      variants = [];
    }

    // Handle optional new image upload
    const imageFile = formData.get("image") as File | null;
    let imageUrl = undefined;

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await uploadToCloudinary(buffer);
    }

    // Construct update data payload
    const updateData: any = {
      name,
      categoryId,
      price,
      shortDescription,
      description,
      benefits,
      warnings,
      featured,
      variants,
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }
    const product = await updateProduct(id, updateData);

    return Response.json({ data: product }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return Response.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, {params}: {params: Promise<{id:string}>}) {
    const {id} = await params
    await deleteProduct(id);

  return Response.json(
    { message: "Product deleted successfully" },
    { status: 200 }
  );


}
