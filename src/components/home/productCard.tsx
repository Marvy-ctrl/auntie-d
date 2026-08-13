import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Plus, Minus, ShoppingCart} from 'lucide-react';
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
    <Link href={`/shop/${id}`} className="group cursor-pointer block">
      <div className="relative bg-white overflow-hidden border border-emerald-50 aspect-square mb-4 flex items-center justify-center transition-shadow hover:shadow-md">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-48 w-48 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-300">
            <Leaf className="w-16 h-16" />
          </div>
        )}
      </div>
      <h3 className={`${myCustomFont.className} text-lg font-bold text-[#123A2D] transition-colors line-clamp-1`}>
        {name}
      </h3>
       <p className={`${inter.className} text-[#65736C] font-medium mt-1`}>
        {shortDescription}
      </p>
     <div className="flex items-center justify-between mt-1">
        <p className="text-emerald-600 font-medium">
          {priceDisplay}
        </p>

        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAddToCart}
            className="p-2 bg-[#123A2D] hover:bg-[#1a523f] text-white rounded-full shadow-sm transition-all duration-200"
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center bg-[#123A2D] text-white rounded-full px-2 py-1 shadow-sm gap-2">
            <button
              type="button"
              onClick={handleDecrement}
              className="p-1 hover:bg-[#1a523f] rounded-full transition-colors"
              title="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold px-1">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="p-1 hover:bg-[#1a523f] rounded-full transition-colors"
              title="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}




