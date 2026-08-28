"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Loader2, 
  Package, 
  Star, 
  Edit, 
  Trash2, 
  AlertTriangle 
} from "lucide-react";
import DeleteProductModal from "@/src/components/admin/deleteProductModal";

export default function AdminProductsPage() {
  const pageSize = 10;
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch all products on mount
  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
      if (searchQuery.trim()) params.set("search", searchQuery.trim());
      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to load products.");

      const responseData = await response.json();
      const productList = responseData.data || responseData.products || responseData;

      setProducts(Array.isArray(productList) ? productList : []);
      setPagination({
        total: responseData.pagination?.total || 0,
        totalPages: responseData.pagination?.totalPages || 1,
      });
    } catch (err: any) {
      setError(err.message || "Could not connect");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(fetchProducts, searchQuery ? 300 : 0);
    return () => window.clearTimeout(timeout);
  }, [page, searchQuery]);

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product.");

      setProductToDelete(null);
      if (products.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await fetchProducts();
      }
    } catch (err: any) {
      alert(err.message || "Could not delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  const firstItem = pagination.total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, pagination.total);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href= "/admin" className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#78814D] mb-3">Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl lg:text-4xl font-serif font-bold text-[#0D3B2E]">Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your store inventory, pricing, and featured herbal items.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#1F624A] hover:bg-[#0D3B2E] text-white px-5 py-3 font-medium flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="p-4 border border-[#D9DFDA] flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          className="w-full bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}

      {/* Products Table Card */}
      <div className="border border-[#D9DFDA] overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#1A3626] mb-2" />
            <p className="text-sm text-slate-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
           
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {searchQuery ? "No matching products found" : "No products added yet"}
            </h3>
            <p className="text-slate-500 text-xs max-w-sm mb-6">
              {searchQuery
                ? "Try searching with a different keyword."
                : "Get started by adding your first herbal blend to the store ."}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/products/new"
                className="bg-[#1A3626] text-white px-5 py-2.5 font-medium text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add First Product
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="text-[#66776E] uppercase tracking-wider text-[10px] font-bold border-b border-[#D9DFDA]">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Image & Product Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 border border-[#D9DFDA] overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                          {product.image || product.imageUrl ? (
                            <Image
                              src={product.image || product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{product.name}</p>
                          {product.variants?.length > 0 && (
                            <span className="text-[11px] text-slate-400">
                              {product.variants.length} variant(s)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="text-slate-700 text-xs font-medium">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₦{Number(product.price).toLocaleString()}
                    </td>
                        {/* Featured */}
                    <td className="px-6 py-4 text-center">
                      {product.featured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-400 text-xs font-bold">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-slate-400 hover:text-[#1A3626] transition-colors hover:bg-slate-100"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(product)}
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors hover:bg-red-50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-[#D9DFDA] px-4 py-4 text-sm text-[#66776E] sm:flex-row sm:items-center sm:justify-between">
            <p>Showing {firstItem}–{lastItem} of {pagination.total} products</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="h-9 border border-[#CCD7CA] px-3 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="min-w-20 text-center text-xs font-semibold">Page {page} of {pagination.totalPages}</span>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pagination.totalPages, current + 1))}
                disabled={page >= pagination.totalPages}
                className="h-9 border border-[#CCD7CA] px-3 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
     <DeleteProductModal
        product={productToDelete}
        isOpen={Boolean(productToDelete)}
        isDeleting={isDeleting}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleDeleteProduct}
      />

    </div>

  );
}
