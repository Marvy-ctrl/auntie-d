"use client";

import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface Variant {
  label?: string;
  size?: string;
  price: number | string;
}

interface ProductActionsProps {
  product: any;
  selectedVariant: Variant | null;
}

export default function ProductActions({ product, selectedVariant }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    // Construct the item object to store in your cart (localStorage / State / Context)
    const cartItem = {
      id: product.id,
      name: product.name,
      image: product.image || product.imageUrl,
      price: selectedVariant ? selectedVariant.price : product.price,
      variant: selectedVariant ? `${selectedVariant.label || "Standard"} - ${selectedVariant.size || ""}` : "Standard",
      quantity: quantity,
    };

    // Example using localStorage for cart storage (or replace with your Cart Context function)
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(
      (item: any) => item.id === cartItem.id && item.variant === cartItem.variant
    );

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    // Optional: Dispatch a custom event so your navbar cart count updates instantly
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
      <div className="flex items-center bg-slate-100 border border-slate-200 px-4 py-3 gap-4">
        <button
          type="button"
          onClick={handleDecrement}
          className="text-slate-600 hover:text-[#123A2D] transition-colors"
          title="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm font-bold text-slate-900 w-6 text-center">{quantity}</span>
        <button
          type="button"
          onClick={handleIncrement}
          className="text-slate-600 hover:text-[#123A2D] transition-colors"
          title="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className={`w-full sm:flex-1 px-8 py-4 font-medium transition-all duration-200 flex items-center justify-center gap-2 text-white ${
          isAdded 
            ? 'bg-emerald-600 hover:bg-emerald-700' 
            : 'bg-[#123A2D] hover:bg-[#1a523f]'
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {isAdded ? "Successfully Added!" : "Add to Cart"}
      </button>
    </div>
  );
}