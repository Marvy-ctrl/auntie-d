"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { myCustomFont } from "@/src/app/fonts/fonts";

export default function EditCategoryPage() {
  const router = useRouter();
  
  const pathParams = useParams<{ id: string }>();
  const id = pathParams?.id;
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [isLoading, setIsLoading] = useState(true); 
  const [isSaving, setIsSaving] = useState(false); 
  const [error, setError] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/categories/${id}`);
        if (!response.ok) throw new Error("Failed to fetch category details.");
        
        const responseData = await response.json();
        
        const category = responseData.data || responseData.category || responseData;

        setName(category.name || "");
        setDescription(category.description || "");
      } catch (err: any) {
        setError(err.message || "Could not load category.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id, baseUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`${baseUrl}/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) throw new Error("Failed to update category.");

      router.push("/admin/categories");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#1A3626]" />
      </div>
    );
  }

  return (
    <div className={`${myCustomFont.className} max-w-3xl mx-auto`}>
      
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/categories"
          className=""
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Edit Category</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Category Name 
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] transition-colors bg-slate-50"
            disabled={isSaving}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] transition-colors bg-slate-50 resize-none"
            disabled={isSaving}
          ></textarea>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
          <Link 
            href="/admin/categories"
            className="flex h-12 w-full items-center justify-center px-6 font-medium text-slate-600 hover:bg-slate-50 sm:w-auto"
            aria-disabled={isSaving}
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap bg-[#1F5A43] px-8 font-medium text-white hover:bg-[#234934] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}



