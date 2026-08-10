import React from 'react';
import { Leaf } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
}

export default function ProductCard({ id, name, price }: ProductCardProps) {

  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Link href={`/product/${id}`} className="group cursor-pointer">
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-50 aspect-square mb-4 flex items-center justify-center transition-shadow hover:shadow-md">
        <div className="h-48 w-48 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-300">
          {/* We will replace this Leaf with a real Next.js Image later! */}
          <Leaf className="w-16 h-16" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors">
        {name}
      </h3>
      <p className="text-emerald-600 font-medium mt-1">{formattedPrice}</p>
    </Link>
  );
}