import React from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, PackageSearch } from "lucide-react";
import { myCustomFont } from "../../fonts/fonts";

const INVENTORY: any[] = []; 

export default function ProductsPage() {
  return (
    <div className={`${myCustomFont.className} max-w-6xl mx-auto`}>
      
      {/* Page Header & Call to Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Products</h1>
        
        {/* We only show the top Add button if there are already products */}
        {INVENTORY.length > 0 && (
          <Link 
            href="/admin/products/new" 
            className="bg-[#1F5A43] hover:bg-[#234934] text-white px-5 py-2.5  font-medium flex items-center gap-2 transition-colors text-sm "
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </Link>
        )}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {INVENTORY.length === 0 ? (
          
          /* --- EMPTY STATE UI --- */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">No available products</h3>
            <p className="text-slate-500 mb-8 max-w-sm">
              Your inventory is currently empty. Add your first product to start selling to your customers.
            </p>
            <Link 
              href="/admin/products/new" 
              className="bg-[#1F5A43] hover:bg-[#234934] text-white px-6 py-3 font-medium flex items-center gap-2 transition-colors text-sm "
            >
              <Plus className="w-4 h-4" />
              Add Your First Product
            </Link>
          </div>

        ) : (
          
          <>
            {/* Search Bar / Filter Toolbar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] transition-colors"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INVENTORY.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        ₦{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {product.stock} units
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link 
                            href={`/admin/products/${product.id}`}
                            className="text-slate-400 hover:text-[#1A3626] transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            className="text-slate-400 hover:text-red-600 transition-colors"
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
            
            {/* Pagination Placeholder */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <p>Showing 1 to {INVENTORY.length} of {INVENTORY.length} products</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}