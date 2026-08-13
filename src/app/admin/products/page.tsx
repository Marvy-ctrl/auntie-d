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
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Fetch all products on mount
  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`${baseUrl}/api/products`);
      if (!response.ok) throw new Error("Failed to load products.");

      const responseData = await response.json();
      const productList = responseData.data || responseData.products || responseData;

      setProducts(Array.isArray(productList) ? productList : []);
    } catch (err: any) {
      setError(err.message || "Could not connect");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`${baseUrl}/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product.");

      // Refresh list
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    } catch (err: any) {
      alert(err.message || "Could not delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) => {
    const term = searchQuery.toLowerCase();
    const nameMatch = product.name?.toLowerCase().includes(term);
    const categoryMatch = product.category?.name?.toLowerCase().includes(term);
    return nameMatch || categoryMatch;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your store inventory, pricing, and featured herbal items.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#1A3626] hover:bg-[#234934] text-white px-5 py-3 font-medium flex items-center justify-center gap-2 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 shadow-sm border border-slate-100 flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400 ml-2" />
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className="bg-white shadow-sm border border-slate-100 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#1A3626] mb-2" />
            <p className="text-sm text-slate-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
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
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4 text-center">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* Image & Product Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-100 border border-slate-200 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
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
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium">
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