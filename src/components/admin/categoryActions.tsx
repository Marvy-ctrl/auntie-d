"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Loader2, AlertTriangle, X } from "lucide-react";

export default function CategoryActions({ id }: { id: string | number }) {
  const router = useRouter();
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMsg("");

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      const response = await fetch(`${baseUrl}/api/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      setShowModal(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg("An error occurred while deleting. Please try again.");
      setIsDeleting(false); 
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <Link 
          href={`/admin/categories/${id}`}
          className="text-slate-400 hover:text-[#1A3626] transition-colors"
          title="Edit Category"
        >
          <Edit className="w-4 h-4" />
        </Link>
        
        <button 
          onClick={() => setShowModal(true)}
          className="text-slate-400 hover:text-red-600 transition-colors"
          title="Delete Category"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-left whitespace-normal">
              
              <div className="flex items-center justify-between mb-5">
             
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Category?</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Are you sure you want to delete this category? This action cannot be undone, and any products currently linked to this category may lose their grouping.
              </p>

              {errorMsg && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {isDeleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}