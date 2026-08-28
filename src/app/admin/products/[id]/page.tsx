"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Save, Loader2, Upload, Star, Plus, Trash2, ArrowLeft } from "lucide-react";
import { myCustomFont } from "@/src/app/fonts/fonts";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  // Form State
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [warnings, setWarnings] = useState("");
  const [featured, setFeatured] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Variants State
  const [variants, setVariants] = useState<Array<{ label: string; size: string; price: string }>>([]);

  // Categories list & Loading States
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch categories and product details concurrently
        const [catRes, prodRes] = await Promise.all([
          fetch(`${baseUrl}/api/categories`),
          fetch(`${baseUrl}/api/products/${productId}`),
        ]);

        if (!catRes.ok) throw new Error("Failed to load categories.");
        if (!prodRes.ok) throw new Error("Failed to load product details.");

        const catData = await catRes.json();
        const categoryList = catData.data || catData.categories || catData;
        setCategories(Array.isArray(categoryList) ? categoryList : []);

        const prodData = await prodRes.json();
        const product = prodData.data || prodData.product || prodData;

        // 2. Populate form fields with existing product data
        setName(product.name || "");
        setCategoryId(product.categoryId || "");
        setPrice(product.price ? String(product.price) : "");
        setshortDescription(product.shortDescription !== undefined ? String(product.shortDescription) : "");
        setDescription(product.description || "");
        
        // Handle benefits/warnings whether stored as arrays or strings
        setBenefits(Array.isArray(product.benefits) ? product.benefits.join("\n") : product.benefits || "");
        setWarnings(Array.isArray(product.warnings) ? product.warnings.join("\n") : product.warnings || "");
        
        setFeatured(Boolean(product.featured));
        setExistingImageUrl(product.image || product.imageUrl || "");

        // Populate variants if they exist
        if (Array.isArray(product.variants)) {
          setVariants(
            product.variants.map((v: any) => ({
              label: v.label || "",
              size: v.size || "",
              price: v.price ? String(v.price) : "",
            }))
          );
        }
      } catch (err: any) {
        setError(err.message || "Could not load product information.");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId, baseUrl]);

  // Variant Helpers
  const handleAddVariant = () => {
    setVariants([...variants, { label: "", size: "", price: "" }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  // Handle Form Submission (PUT or PATCH request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("categoryId", categoryId);
      formData.append("price", price);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("benefits", benefits);
      formData.append("warnings", warnings);
      formData.append("featured", String(featured));
      formData.append("variants", JSON.stringify(variants));
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: "PATCH", 
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      router.push("/admin/products");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsSaving(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#1A3626] mb-2" />
        <p className="text-sm text-slate-500">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className={`${myCustomFont.className} max-w-4xl mx-auto space-y-8 pb-12`}>
      
      {/* Top Navigation / Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link 
            href="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1A3626] mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-sm text-slate-500 mt-0.5">Update details, pricing, or health guidelines.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        {/* Name and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Product Name </label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] bg-slate-50 text-slate-900" disabled={isSaving} />
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-2">Category </label>
            <select id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] bg-slate-50 text-slate-900" disabled={isSaving}>
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price and shortDescription */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">Price (₦) </label>
            <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] bg-slate-50 text-slate-900" disabled={isSaving} />
          </div>
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-2"> Short Description  </label>
            <input type="text" id="shortDescription" value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} required min="0" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] bg-slate-50 text-slate-900" disabled={isSaving} />
          </div>
        </div>

        {/* Variants Dynamic Section */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Product Variants</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage sizes, packaging, or variations</p>
            </div>
            <button
              type="button"
              onClick={handleAddVariant}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Variant
            </button>
          </div>

          {variants.length > 0 && (
            <div className="space-y-3 pt-2">
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <input
                    type="text"
                    placeholder="Label (e.g., Family Pack)"
                    value={variant.label}
                    onChange={(e) => handleVariantChange(index, "label", e.target.value)}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1A3626]"
                  />
                  <input
                    type="text"
                    placeholder="Size (e.g., 500g)"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                    className="w-28 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1A3626]"
                  />
                  <input
                    type="number"
                    placeholder="Price (₦)"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                    className="w-32 px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#1A3626]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    title="Remove Variant"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* File Upload / Existing Image Preview */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {existingImageUrl && !imageFile && (
              <div className="relative w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={existingImageUrl} alt="Current product" className="w-full h-full object-cover" />
              </div>
            )}
            <label className="w-full flex flex-col items-center justify-center px-6 py-4 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              <Upload className="w-6 h-6 text-slate-400 mb-2" />
              <p className="text-sm text-slate-600 font-medium">
                {imageFile ? imageFile.name : "Click to replace product image"}
              </p>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="hidden" 
                disabled={isSaving}
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Product Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] bg-slate-50 resize-none text-slate-900" disabled={isSaving}></textarea>
        </div>

        {/* Benefits & Warnings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-emerald-800 mb-2">Health Benefits</label>
            <textarea id="benefits" value={benefits} onChange={(e) => setBenefits(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] bg-emerald-50/30 resize-none text-slate-900" disabled={isSaving}></textarea>
          </div>
          <div>
            <label htmlFor="warnings" className="block text-sm font-medium text-slate-900 mb-2">Usage Warnings</label>
            <textarea id="warnings" value={warnings} onChange={(e) => setWarnings(e.target.value)} rows={3} className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626]  resize-none text-slate-900" disabled={isSaving}></textarea>
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center gap-4 p-5">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5 border-slate-900 text-[#1A3626] focus:ring-[#1A3626] cursor-pointer"
            disabled={isSaving}
          />
          <div>
            <label htmlFor="featured" className="block text-sm font-bold text-slate-900 cursor-pointer flex items-center gap-1.5">
              {/* <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> */}
              Featured Product
            </label>
            <p className="text-sm text-slate-500 mt-0.5">Showcase this herbal blend on the main homepage.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
          <Link href="/admin/products" className="flex h-12 w-full items-center justify-center px-6 font-medium text-slate-600 hover:bg-slate-50 sm:w-auto">Cancel</Link>
          <button type="submit" disabled={isSaving} className="flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap bg-[#1F5A43] px-8 font-medium text-white hover:bg-[#234934] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Updating Product..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}
