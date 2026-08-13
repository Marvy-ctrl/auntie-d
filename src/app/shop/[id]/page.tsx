"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/src/components/home/header";
import Footer from "@/src/components/home/footer";
import ProductGallery from "@/src/components/productdetail/productGallery";
import ProductInfo from "@/src/components/productdetail/productInfo";
import ProductVariants from "@/src/components/productdetail/productVariant";
import { ArrowLeft, Loader2, ShoppingBag, ShoppingCart } from "lucide-react";
import { myCustomFont } from "@/src/app/fonts/fonts";

interface ProductDetailPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [variantQuantities, setVariantQuantities] = useState<{ [key: number]: number }>({});

  const resolvedParams = React.use(params as Promise<{ id: string }>);
  const id = resolvedParams.id;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        const prod = data.data || data.product || data;
        setProduct(prod);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, baseUrl]);

  const handleUpdateVariantQuantity = (index: number, delta: number) => {
    const currentQty = variantQuantities[index] || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    const updatedQuantities = {
      ...variantQuantities,
      [index]: newQty,
    };
    setVariantQuantities(updatedQuantities);

    // Automatically sync additions directly into localStorage cart
    const variantsList = product.variants || [];
    const targetVariant = variantsList[index];
    const variantLabel = `${targetVariant.label || "Standard"} - ${targetVariant.size || ""}`;

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(
      (item: any) => item.id === product.id && item.variant === variantLabel
    );

    if (newQty > 0) {
      const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image || product.imageUrl,
        price: targetVariant.price,
        variant: variantLabel,
        quantity: newQty,
      };

      if (existingIndex > -1) {
        existingCart[existingIndex].quantity = newQty;
      } else {
        existingCart.push(cartItem);
      }
    } else {
      if (existingIndex > -1) {
        existingCart.splice(existingIndex, 1);
      }
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#123A2D]" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <h1 className={`${myCustomFont.className} text-3xl font-bold text-[#123A2D] mb-4`}>
            Product Not Found
          </h1>
          <Link href="/shop" className="px-6 py-3 bg-[#123A2D] text-white rounded-xl text-sm font-medium">
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const numericPrice = Number(product.price) || 0;
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(numericPrice);

  const benefitsList = Array.isArray(product.benefits) ? product.benefits : [];
  const warningsList = Array.isArray(product.warnings) ? product.warnings : [];
  const variantsList = Array.isArray(product.variants) ? product.variants : [];

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
      <Header />

      <main className="flex-grow py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#123A2D] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <ProductGallery
              image={product.image || product.imageUrl}
              name={product.name}
            />

            <div className="flex flex-col items-start text-left w-full">
              <ProductInfo
                categoryName={product.category?.name}
                name={product.name}
                priceFormatted={formattedPrice}
                shortDescription={product.shortDescription}
                description={product.description}
                benefits={benefitsList}
                warnings={warningsList}
              />

              <ProductVariants
                variants={variantsList}
                quantities={variantQuantities}
                onUpdateQuantity={handleUpdateVariantQuantity}
              />

              <Link
                href="/cart"
                className="w-full py-4 bg-[#123A2D] hover:bg-[#1a523f] text-white font-medium rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-center"
              >
                <ShoppingCart className="w-5 h-5" /> View Cart & Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}