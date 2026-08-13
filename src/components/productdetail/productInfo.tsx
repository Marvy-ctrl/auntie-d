import React from 'react';
import { Leaf, ShieldCheck } from 'lucide-react';
import { myCustomFont } from '@/src/app/fonts/fonts';
import { Inter } from 'next/font/google';

interface ProductInfoProps {
  categoryName?: string;
  name: string;
  priceFormatted: string;
  shortDescription?: string;
  description?: string;
  benefits: string[];
  warnings: string[];
}

const inter = Inter({subsets: ["latin"], variable: "--font-sans"})
export default function ProductInfo({
  categoryName,
  name,
  priceFormatted,
  shortDescription,
  description,
  benefits,
  warnings,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col items-start text-left w-full">
      <span className="text-xs font-bold tracking-widest text-[#78814D] uppercase mb-3">
        {categoryName || "Natural Remedy"}
      </span>

      <h1 className={`${myCustomFont.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-[#123A2D] mb-4 leading-tight`}>
        {name}
      </h1>

      <p className={`${inter.className} text-2xl sm:text-3xl font-bold text-emerald-700 mb-6`}>
        {priceFormatted}
      </p>
      <p className={`${inter.className} text-sm sm:text-base text-[#65736C] leading-relaxed mb-8`}>
        {shortDescription || "No short description."}
      </p>

      <p className={`${inter.className} text-sm sm:text-base text-[#65736C] leading-relaxed mb-8`}>
        {description || "No description."}
      </p>

      {benefits.length > 0 && (
        <div className="w-full mb-6 p-5">
          <h3 className="text-sm font-bold text-emerald-900 mb-2 uppercase tracking-wider flex items-center gap-2">
           Health Benefits
          </h3>
          <ul className="list-disc list-inside text-xs sm:text-sm text-[#65736C] space-y-1.5">
            {benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="w-full mb-8 p-5 ">
          <h3 className="text-sm font-bold text-amber-900 mb-2 uppercase tracking-wider flex items-center gap-2">
             Warnings
          </h3>
          <ul className="list-disc list-inside text-xs sm:text-sm text-amber-800 space-y-1.5">
            {warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}