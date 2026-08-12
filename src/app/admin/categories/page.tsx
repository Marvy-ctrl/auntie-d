import React from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Layers } from "lucide-react";
import { myCustomFont } from "../../fonts/fonts";

const CATEGORIES: any[] = []; 

export default function AdminCategoriesPage() {
  return (
    <div className={`${myCustomFont.className} max-w-6xl mx-auto`}>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Categories</h1>
        
        {CATEGORIES.length > 0 && (
          <Link 
            href="/admin/categories/new" 
            className="bg-[#1A3626] hover:bg-[#234934] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </Link>
        )}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {CATEGORIES.length === 0 ? (
          
          /* --- EMPTY STATE UI --- */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
           
            <h3 className="text-xl font-bold text-slate-900 mb-2">No categories found</h3>
            <p className="text-slate-500 mb-8 max-w-sm">
              Create categories to organize your herbal products and make it easier for customers to browse the store.
            </p>
            <Link 
              href="/admin/categories/new" 
              className="bg-[#1F5A43] hover:bg-[#234934] text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors text-sm shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create First Category
            </Link>
          </div>

        ) : (
          
          /* --- POPULATED TABLE UI --- */
          <>
            <div className="p-4 border-b border-slate-100 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search categories..." 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3626] focus:border-[#1A3626] transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Category Name</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4">Products Linked</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CATEGORIES.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 truncate max-w-xs">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {category.productCount} products
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link 
                            href={`/admin/categories/${category.id}`}
                            className="text-slate-400 hover:text-[#1A3626] transition-colors"
                            title="Edit Category"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            className="text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete Category"
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
          </>
        )}

      </div>
    </div>
  );
}