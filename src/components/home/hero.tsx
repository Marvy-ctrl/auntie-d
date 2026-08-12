import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { myCustomFont } from '@/src/app/fonts/fonts';
import { Check } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-4 lg:py-12 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="flex flex-col items-start text-left order-2 lg:order-1 lg:pr-12">
            <h1 className="text-5xl lg:text-7xl font-serif font-medium text-[#1A3626] mb-6 leading-[1.1] tracking-tight">
             <span className={`${myCustomFont.className} text-[#123A2D] font-bold`}> Feel better,</span><br /><span className={`${myCustomFont.className} italic text-[#78814D] `}>naturally</span>.
            </h1>
            
            <p className={`${inter.className} text-base lg:text-[16px] text-[#65736C] mb-10 max-w-md leading-relaxed`}>              
              Quality herbal blends made with carefully selected natural ingredients to support your everyday wellness journey.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Link 
                href="/shop" 
                className={`${inter.className} bg-[#1F5A43] hover:bg-[#234934] text-white font-semibold py-3.5 px-8 transition-colors text-sm `}
              >
                Shop wellness products 
              </Link>
              <Link 
                href="/contact" 
                className={`${inter.className} border border-[#1F5A43] text-[#1F5A43] hover:bg-[#1A3626]/5 font-medium py-3.5 px-8 transition-colors flex items-center gap-2 text-sm`}
              >
                Talk to Auntie-D
              </Link>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-4 text-[10px] sm:text-xs font-bold tracking-widest text-[#728579] uppercase">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#E8F3E8] text-[#1A3626] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                Quality Ingredients
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#E8F3E8] text-[#1A3626] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                Trusted Preparation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#E8F3E8] text-[#1A3626] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                Nationwide Delivery
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] lg:h-[550px] bg-[#E8F3E8]  overflow-hidden order-1 lg:order-2 flex items-center justify-center p-8">
            
            <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden shadow-xl border-4 border-white/40">
              <Image 
                src="/hero-herbal-image.jpg" 
                alt="Auntie D Herbal Products" 
                fill
                className="object-cover"
                priority
              />
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}