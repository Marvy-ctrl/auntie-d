import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/src/lib/cloudinary";
import { createProduct, getFeaturedProducts, getProducts, getProductsPage } from "@/src/modules/products/product.service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const requestedPage = searchParams.get("page");
  const featuredParam = searchParams.get("featured");

  if (requestedPage) {
    const page = Math.max(1, Number.parseInt(requestedPage, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get("limit") || "10", 10) || 10));
    const search = searchParams.get("search")?.trim() || undefined;
    const categoryId = searchParams.get("categoryId")?.trim() || undefined;
    const featured = featuredParam === null ? undefined : featuredParam === "true";
    const result = await getProductsPage({ page, limit, search, categoryId, featured });
    const totalPages = Math.max(1, Math.ceil(result.total / limit));

    return Response.json({
      data: result.data,
      pagination: { page, limit, total: result.total, totalPages },
    });
  }

  if (featuredParam === "true") {
    const data = await getFeaturedProducts();
    return Response.json({ data });
  }

  const data = await getProducts();
  return Response.json({ data });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Text fields
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const shortDescription = (formData.get("shortDescription") as string) || "";
    const description = (formData.get("description") as string) || "";

    // 1. FIXED FEATURED PARSING: Explicit string check
    const featuredRaw = formData.get("featured");
    const featured = featuredRaw === "true";

    // 2. Benefits & Warnings (split lines into arrays)
    const benefitsRaw = (formData.get("benefits") as string) || "";
    const warningsRaw = (formData.get("warnings") as string) || "";
    const benefits = benefitsRaw ? benefitsRaw.split("\n").filter(Boolean) : [];
    const warnings = warningsRaw ? warningsRaw.split("\n").filter(Boolean) : [];

    // 3. Variants parsing
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

    // 4. FIXED IMAGE UPLOAD
    const imageFile = formData.get("image") as File | null;
    let imageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await uploadToCloudinary(buffer);
    }

    // Pass everything to your Prisma product service
    const product = await createProduct({
      name,
      categoryId,
      price,
      shortDescription,
      description,
      benefits,
      warnings,
      featured,
      image: imageUrl, // Saves Cloudinary URL to DB
      variants,
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
