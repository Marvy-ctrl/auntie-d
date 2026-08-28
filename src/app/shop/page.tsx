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
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${baseUrl}/api/products`),
          fetch(`${baseUrl}/api/categories`),
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        const productList = prodData.data || prodData.products || prodData;
        const categoryList = catData.data || catData.categories || catData;

        setProducts(Array.isArray(productList) ? productList : []);
        setFilteredProducts(Array.isArray(productList) ? productList : []);
        setCategories(Array.isArray(categoryList) ? categoryList : []);
      } catch (err) {
        console.error("Error loading shop data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, [baseUrl]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.categoryId === selectedCategory);
    }

    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(term));
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

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
            
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border ${
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
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border ${
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 sm:py-2 bg-transparent border border-[#D2DAD3] focus:outline-none focus:border-[#1A3626] text-sm"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="py-16 sm:py-20 flex justify-center">
              <Loader2 className="w-7 h-7 sm:w-8 sm:h-8 animate-spin text-[#1A3626]" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
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
