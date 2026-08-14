import React from 'react';
import Image from 'next/image';
import { Leaf } from 'lucide-react';

interface ProductGalleryProps {
  image?: string;
  name: string;
}

export default function ProductGallery({ image, name }: ProductGalleryProps) {
  return (
    <div className="relative w-full aspect-square bg-white overflow-hidden border border-emerald-100 flex items-center justify-center">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-300">
          <Leaf className="w-24 h-24" />
        </div>
      )}
    </div>
  );
}