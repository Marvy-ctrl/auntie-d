
"use client";

import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface Variant {
  label?: string;
  size?: string;
  price: number | string;
}

interface ProductVariantsProps {
  variants: Variant[];
  quantities: { [key: number]: number };
  onUpdateQuantity: (index: number, delta: number) => void;
}

export default function ProductVariants({ variants, quantities, onUpdateQuantity }: ProductVariantsProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="w-full mb-8 p-5">
      <h3 className="text-sm font-bold text-[#65736C] mb-4 uppercase tracking-wider">Available Sizes & Options</h3>
      <div className="space-y-3">
        {variants.map((variant, index) => {
          const qty = quantities[index] || 0;

          return (
            <div 
              key={index} 
              className={`p-4 flex items-center justify-between transition-all ${
                qty > 0 ? 'border-[#123A2D] bg-emerald-50/30' : 'border-slate-200'
              }`}
            >
              <div>
                <p className="text-xs font-bold text-slate-900">{variant.label || "Standard"}</p>
                <p className="text-[11px] text-slate-500">{variant.size}</p>
                <p className="text-sm font-bold text-emerald-700 mt-1">
                  ₦{Number(variant.price || 0).toLocaleString()}
                </p>
              </div>

              {/* Individual Variant Quantity Controller */}
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(index, 1)}
                  className="px-4 py-2 bg-[#123A2D] hover:bg-[#1a523f] text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>
              ) : (
                <div className="flex items-center bg-[#123A2D] text-white rounded-xl px-3 py-1.5 shadow-sm gap-3">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(index, -1)}
                    className="p-1 hover:bg-[#1a523f] rounded-full transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{qty}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(index, 1)}
                    className="p-1 hover:bg-[#1a523f] rounded-full transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}