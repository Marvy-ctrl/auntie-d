"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/src/components/home/header";
import Footer from "@/src/components/home/footer";
import ProductGallery from "@/src/components/productdetail/productGallery";
import ProductInfo from "@/src/components/productdetail/productInfo";
import ProductVariants from "@/src/components/productdetail/productVariant";
import { ArrowLeft, Loader2, Plus, Minus, ShoppingCart } from "lucide-react";
import { myCustomFont } from "@/src/app/fonts/fonts";

interface ProductDetailPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Unwrap params properly using React.use() first
  const unwrappedParams = React.use(params as Promise<{ id: string }>);
  const id = unwrappedParams?.id;

  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [variantQuantities, setVariantQuantities] = useState<{ [key: number]: number }>({});
  
  const [baseQuantity, setBaseQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        const prod = data.data || data.product || data;
        setProduct(prod);

        if (prod?.variants && prod.variants.length > 0) {
          const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
          const initialQtys: { [key: number]: number } = {};
          
          prod.variants.forEach((v: any, idx: number) => {
            const vLabel = `${v.label || "Standard"} - ${v.size || ""}`;
            const found = existingCart.find((item: any) => item.id === prod.id && item.variant === vLabel);
            if (found) {
              initialQtys[idx] = found.quantity;
            }
          });
          setVariantQuantities(initialQtys);
        } else {
          const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
          const found = existingCart.find((item: any) => item.id === prod.id && item.variant === "Standard");
          if (found) {
            setBaseQuantity(found.quantity);
          }
        }
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
        variantId: targetVariant.id, // Included for backend service validation
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

  const handleAddBaseProduct = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(
      (item: any) => item.id === product.id && item.variant === "Standard"
    );

    const cartItem = {
      id: product.id,
      variantId: undefined, // Base product has no variant ID
      name: product.name,
      image: product.image || product.imageUrl,
      price: product.price,
      variant: "Standard",
      quantity: baseQuantity,
    };

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity = baseQuantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
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
          <Link href="/shop" className="px-6 py-3 bg-[#123A2D] text-white text-sm font-medium">
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
  const hasVariants = variantsList.length > 0;

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

              {hasVariants ? (
                <ProductVariants
                  variants={variantsList}
                  quantities={variantQuantities}
                  onUpdateQuantity={handleUpdateVariantQuantity}
                />
              ) : (
                /* Fallback quantity & Add to Cart for products without variants */
                <div className="w-full my-6 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center bg-slate-100 border border-slate-200 px-4 py-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setBaseQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                      className="text-slate-600 hover:text-[#123A2D] transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-slate-900 w-6 text-center">{baseQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setBaseQuantity((prev) => prev + 1)}
                      className="text-slate-600 hover:text-[#123A2D] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBaseProduct}
                    className={`w-full sm:flex-1 px-8 py-4 font-medium transition-all duration-200 flex items-center justify-center gap-2 text-white ${
                      isAdded ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#123A2D] hover:bg-[#1a523f]'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? "Successfully Added" : "Add to Cart"}
                  </button>
                </div>
              )}

              <Link
                href="/cart"
                className="w-full py-4 bg-[#123A2D] text-white font-medium transition-colors flex items-center justify-center gap-2 text-center mt-2"
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