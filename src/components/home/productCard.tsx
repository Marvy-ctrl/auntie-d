import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import { Inter } from 'next/font/google';
import { myCustomFont } from '@/src/app/fonts/fonts';

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

interface Variant {
  price: number | string;
}

interface ProductCardProps {
  id: string;
  name: string;
  price: number | string;
  image?: string;
  shortDescription?: string;
  description?: string;
  variants?: Variant[];
}

export default function ProductCard({ id, name, price, image, variants, shortDescription, description }: ProductCardProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [imageError, setImageError] = useState(false);
  const hasVariants = variants && variants.length > 0;
  let priceDisplay = "";

  // 1. If base price is entered as a custom string range (e.g. "25000-50000")
  if (typeof price === 'string' && price.includes('-')) {
    const parts = price.split('-').map((p) => Number(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const min = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(parts[0]);
      const max = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(parts[1]);
      priceDisplay = `${min} - ${max}`;
    }
  }

  // 2. If there are variants, automatically compute the min and max variant prices
  if (!priceDisplay && hasVariants) {
    const variantPrices = variants.map((v) => Number(v.price) || 0).filter((p) => p > 0);
    if (variantPrices.length > 0) {
      const minPrice = Math.min(...variantPrices);
      const maxPrice = Math.max(...variantPrices);
      
      const formattedMin = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(minPrice);
      
      if (minPrice !== maxPrice) {
        const formattedMax = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(maxPrice);
        priceDisplay = `${formattedMin} - ${formattedMax}`;
      } else {
        priceDisplay = formattedMin;
      }
    }
  }

  // 3. Fallback to standard single base price
  if (!priceDisplay) {
    const numericPrice = Number(price) || 0;
    priceDisplay = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(numericPrice);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity(1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  return (
    <Link href={`/shop/${id}`} className="group cursor-pointer block bg-[#FDFCF8]">
      <div className="relative bg-[#DCE7D6] overflow-hidden aspect-[1.12/1] mb-5 flex items-center justify-center">
        {image && !imageError ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-14 h-6 bg-[#CDA72B] border border-[#A78720]" />
            <div className="w-28 h-40 bg-[#0D3B2E] flex items-center justify-center px-3">
              <div className="w-full bg-[#FDF8E9] py-4 px-2 text-center text-[#0D3B2E]">
                <span className="text-[6px] uppercase tracking-wider block mb-2">Auntie D Herbs</span>
                <strong className={`${myCustomFont.className} text-sm leading-tight block`}>{name}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
      <h3 className={`${myCustomFont.className} text-2xl font-bold text-[#123A2D] line-clamp-1`}>
        {name}
      </h3>
       <p className={`${inter.className} text-[#65736C] text-sm leading-relaxed mt-2 min-h-10 line-clamp-2`}>
        {shortDescription || description || "A carefully prepared herbal blend for everyday wellness support."}
      </p>
      <p className="text-[#0D3B2E] font-bold mt-3 mb-4">
          {priceDisplay}
      </p>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-12 px-4 bg-transparent hover:bg-[#E8EFE5] text-[#123A2D] border border-[#CBD6C9] flex items-center justify-between font-bold text-sm"
            title="Add to cart"
          >
            <span>Add to cart</span><Plus className="w-4 h-4" />
          </button>
        ) : (
          <div className="h-12 flex items-center justify-between bg-[#123A2D] text-white border border-[#123A2D] px-3 gap-2">
            <button
              type="button"
              onClick={handleDecrement}
              className="p-1 hover:bg-[#1a523f]"
              title="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold px-1">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="p-1 hover:bg-[#1a523f]"
              title="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
    </Link>
  );
}
