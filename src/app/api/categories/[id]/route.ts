import { categorySchema } from "@/src/modules/categories/category.schema";
import { deleteCategory, getCategoryById, updateCategory } from "@/src/modules/categories/category.service";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const category = await getCategoryById(id)
    
    if (!category) {
        return Response.json(
          { error: "Category not found" }, 
          { status: 404 }
        );
    }
    
    return Response.json({ data: category });


}

export async function PATCH(
  req: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const result = categorySchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        message: "Validation failed",
        errors: result.error.issues,
      },
      { status: 400 }
    );
  }

  const category = await updateCategory(id, result.data);

  return Response.json(
    { data: category },
    { status: 200 }
  );
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await deleteCategory(id);

  return Response.json(
    { message: "Category deleted successfully" },
    { status: 200 }
  );
}
