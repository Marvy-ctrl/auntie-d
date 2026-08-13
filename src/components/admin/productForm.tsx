"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save, Loader2, Upload, Plus, Trash2 } from "lucide-react";
import { myCustomFont } from "@/src/app/fonts/fonts";

export default function ProductForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [warnings, setWarnings] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [variants, setVariants] = useState<
    Array<{ label: string; size: string; price: string }>
  >([]);

  const [categories, setCategories] = useState<any[]>([]);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/categories`);
        if (!response.ok) throw new Error("Failed to load categories.");

        const responseData = await response.json();
        const categoryList =
          responseData.data || responseData.categories || responseData;

        setCategories(Array.isArray(categoryList) ? categoryList : []);
      } catch (err: any) {
        setError("Could not load categories. Please add a category first.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [baseUrl]);

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

      const response = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create product.");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsSaving(false);
    }
  };

  return (
    <div className={myCustomFont.className}>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-100 p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border  focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1F5A43]"
              disabled={isSaving}
            />
          </div>
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Category
            </label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F5A43] focus:border-[#1F5A43] bg-slate-50"
              disabled={isSaving}
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Base Price (₦){" "}
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F5A43] focus:border-[#1F5A43] bg-slate-50"
              disabled={isSaving}
            />
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setshortDescription(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F5A43] focus:border-[#1A3626] bg-slate-50"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Product Variants (Optional)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Add different sizes, packaging, or variations (e.g., Small,
                Large, 500ml)
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddVariant}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Variant
            </button>
          </div>

          {variants.length > 0 && (
            <div className="space-y-3 pt-2">
              {variants.map((variant, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-3 border border-slate-200 "
                >
                  <input
                    type="text"
                    placeholder="Label (e.g., Family Pack)"
                    value={variant.label}
                    onChange={(e) =>
                      handleVariantChange(index, "label", e.target.value)
                    }
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#1F5A43]"
                  />
                  <input
                    type="text"
                    placeholder="Size (e.g., 500ml)"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="w-28 px-3 py-2 text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#1F5A43]"
                  />
                  <input
                    type="number"
                    placeholder="Price (₦)"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(index, "price", e.target.value)
                    }
                    className="w-32 px-3 py-2 text-sm border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-[#1F5A43]"
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

        <div>
          <label
            htmlFor="imageFile"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Product Image{" "}
          </label>
          <label className="flex-1 flex flex-col items-center justify-center px-6 py-4 border-2 border-slate-200 border-dashed cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
            <Upload className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-sm text-slate-600 font-medium">
              {imageFile ? imageFile.name : "Click to upload product image"}
            </p>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0])
                  setImageFile(e.target.files[0]);
              }}
              className="hidden"
              disabled={isSaving}
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Product Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F5A43] focus:border-[#1F5A43] bg-slate-50 resize-none"
            disabled={isSaving}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="benefits"
              className="block text-sm font-medium text-emerald-800 mb-2"
            >
              {" "}
              Benefits
            </label>
            <textarea
              id="benefits"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F5A43] focus:border-[#1F5A43] resize-none"
              disabled={isSaving}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="warnings"
              className="block text-sm font-medium text-slate-900 mb-2"
            >
              {" "}
              Warnings
            </label>
            <textarea
              id="warnings"
              value={warnings}
              onChange={(e) => setWarnings(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1F5A43] focus:border-[#1F5A43] resize-none"
              disabled={isSaving}
            ></textarea>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5  border border-amber-100 ">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5 rounded border-amber-300 text-[#1F5A43] focus:ring-[#1A3626] cursor-pointer"
            disabled={isSaving}
          />
          <div>
            <label
              htmlFor="featured"
              className="block text-sm font-bold text-slate-900 cursor-pointer flex items-center gap-1.5"
            >
              Featured Product
            </label>
            <p className="text-sm text-slate-500 mt-0.5">
              Showcase this product on the main homepage.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#1F5A43] hover:bg-[#234934] text-white px-8 py-3  font-medium flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Saving Product..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
