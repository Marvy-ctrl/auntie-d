"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./productCard";
import { Loader2 } from "lucide-react";

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const allProducts = data.data || data.products || data;

        // Filter for featured products from your database
        const featured = Array.isArray(allProducts)
          ? allProducts.filter((p: any) => p.featured === true)
          : [];
          console.log("Featured Products Fetched:", featured);

        setProducts(featured);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [baseUrl]);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-900" />
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
      <div className="flex items-end justify-between gap-6 mb-8 sm:mb-10">
        <div><h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#123A2D]">Our Products</h2></div>
        <a href="/shop" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-[#1F5A43] pb-1">View all products</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image || product.imageUrl}
            shortDescription={product.shortDescription}
            variants={product.variants}
          />
        ))}
      </div>
    </section>
  );
}
