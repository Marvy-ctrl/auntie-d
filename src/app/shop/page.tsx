"use client";

import React, { useState, useEffect } from "react";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";
import ProductCard from "@/src/components/home/productCard";
import { Loader2, Search } from "lucide-react";
import { myCustomFont } from "../fonts/fonts";
import { Inter } from "next/font/google";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"})

export default function ShopPage() {
  const pageSize = 8;
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catRes = await fetch("/api/categories");
        const catData = await catRes.json();
        const categoryList = catData.data || catData.categories || catData;
        setCategories(Array.isArray(categoryList) ? categoryList : []);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      page === 1 ? setIsLoading(true) : setIsLoadingMore(true);
      try {
        const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
        if (selectedCategory !== "all") params.set("categoryId", selectedCategory);
        if (searchQuery.trim()) params.set("search", searchQuery.trim());

        const response = await fetch(`/api/products?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Failed to load products.");
        const result = await response.json();
        const nextProducts = Array.isArray(result.data) ? result.data : [];

        setProducts((current) => page === 1 ? nextProducts : [...current, ...nextProducts]);
        setPagination({
          total: result.pagination?.total || 0,
          totalPages: result.pagination?.totalPages || 1,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") console.error("Error loading products:", error);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setIsLoadingMore(false);
        }
      }
    };

    const timeout = window.setTimeout(fetchProducts, searchQuery ? 300 : 0);
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [page, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
      <Header />

      <main className="flex-grow pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h1 className={`${myCustomFont.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#123A2D] mb-3 sm:mb-4`}>
              Wellness for everyday
            </h1>
            <p className={`${inter.className} text-[11px] sm:text-base text-[#78814D]`}>
              Explore our collection of natural, handcrafted herbal solutions.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12 border-y border-[#D2DAD3] py-4">
            
            <div className="flex min-w-0 w-full items-center gap-3 overflow-x-auto pb-2 lg:w-auto lg:pb-0 scrollbar-hide overscroll-x-contain">
              <button
                onClick={() => {
                  setProducts([]);
                  setPage(1);
                  setSelectedCategory("all");
                }}
                className={`shrink-0 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border ${
                  selectedCategory === "all"
                    ? "bg-[#123A2D] text-white border-[#123A2D]"
                    : "bg-transparent text-[#65736C] border-[#D2DAD3] hover:bg-[#EDF2E8]"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setProducts([]);
                    setPage(1);
                    setSelectedCategory(cat.id);
                  }}
                  className={`shrink-0 px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border ${
                    selectedCategory === cat.id
                      ? "bg-[#123A2D] text-white border-[#123A2D]"
                      : "bg-transparent text-[#65736C] border-[#D2DAD3] hover:bg-[#EDF2E8]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-64 xl:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setProducts([]);
                  setPage(1);
                  setSearchQuery(e.target.value);
                }}
                className="w-full pl-10 pr-4 py-2.5 sm:py-2 bg-transparent border border-[#D2DAD3] focus:outline-none focus:border-[#1A3626] text-sm"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="py-16 sm:py-20 flex justify-center">
              <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-[#1A3626]" />
            </div>
          ) : products.length > 0 ? (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    shortDescription={product.shortDescription}
                    image={product.image || product.imageUrl}
                    variants={product.variants}
                  />
                  {/* <button
                    onClick={() => {
                    }}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 hover:bg-[#123A2D] text-[#123A2D] hover:text-white rounded-full shadow-md transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button> */}
                </div>
              ))}
            </div>
            {pagination.total > pageSize && (
              <div className="mt-12 flex flex-col items-center gap-3 border-t border-[#D2DAD3] pt-8">
                <p className="text-xs text-[#65736C]">Showing {products.length} of {pagination.total} products</p>
                <button
                  type="button"
                  onClick={() => {
                    if (page < pagination.totalPages) {
                      setPage((current) => current + 1);
                    } else {
                      setProducts((current) => current.slice(0, pageSize));
                      setPage(1);
                    }
                  }}
                  disabled={isLoadingMore}
                  className="flex h-12 min-w-44 items-center justify-center gap-2 border border-[#123A2D] bg-[#123A2D] px-4 text-sm font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoadingMore && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isLoadingMore ? "Loading…" : page < pagination.totalPages ? "Show more" : "Show less"}
                </button>
              </div>
            )}
            </>
          ) : (
            <div className="text-center py-16 sm:py-20 px-4 text-sm sm:text-base text-slate-500">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
