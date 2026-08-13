import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/src/components/admin/productForm";
import { myCustomFont } from "@/src/app/fonts/fonts";

export default function NewProductPage() {
  return (
    <div className={`${myCustomFont.className} max-w-3xl mx-auto pb-12`}>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/products"
          className=""
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-sm text-slate-500 mt-0.5">Add a new herbal product to your store inventory.</p>
        </div>
      </div>

      <ProductForm />

    </div>
  );
}