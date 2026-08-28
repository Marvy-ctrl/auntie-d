import React from 'react';
import Link from 'next/link';
import { myCustomFont } from '@/src/app/fonts/fonts';
import { Check } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function BotanicalSprig({ className }: { className: string }) {
  return (
    <div className={`absolute w-44 h-24 ${className}`} aria-hidden="true">
      <div className="absolute left-2 top-12 w-40 h-[2px] bg-[#4E7859] rotate-[24deg] origin-left" />
      {[0, 1, 2, 3].map((leaf) => (
        <span
          key={leaf}
          className="absolute w-7 h-3 bg-[#4E7859] rotate-[24deg]"
          style={{
            borderRadius: '999px 0 999px 0',
            left: `${24 + leaf * 31}px`,
            top: `${33 + leaf * 13}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="bg-[#FDFCF8] border-b border-[#D2DAD3]">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[670px]">
          
          <div className="hero-copy flex flex-col items-start justify-center text-left order-2 lg:order-1 py-14 lg:py-20">
          
            <h1 className="text-4xl min-[400px]:text-5xl lg:text-7xl font-serif font-medium text-[#1A3626] mb-7 leading-[1.02] tracking-tight">
             <span className={`${myCustomFont.className} text-[#123A2D] font-bold`}> Feel better,</span><br /><span className={`${myCustomFont.className} italic text-[#78814D] `}>naturally</span>.
            </h1>
            
            <p className={`${inter.className} text-base lg:text-[16px] text-[#65736C] mb-10 max-w-md leading-relaxed`}>              
              Quality herbal blends made with carefully selected natural ingredients to support your everyday wellness journey.
            </p>
            
            <div className="flex flex-col min-[460px]:flex-row w-full min-[460px]:w-auto gap-3 mb-12">
              <Link 
                href="/shop" 
                className={`${inter.className} bg-[#1F5A43] hover:bg-[#123A2D] border border-[#1F5A43] text-white font-semibold py-3.5 px-6 sm:px-8 text-sm uppercase tracking-wider text-center`}
              >
                Shop wellness products 
              </Link>
              <Link 
                href="/#contact"
                className={`${inter.className} border border-[#1F5A43] text-[#1F5A43] hover:bg-[#E4ECE2] font-medium py-3.5 px-6 sm:px-8 flex items-center justify-center text-sm uppercase tracking-wider`}
              >
                Talk to Auntie-D
              </Link>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-x-6 gap-y-4 text-[10px] sm:text-xs font-bold tracking-widest text-[#728579] uppercase">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-[#A8B7AC] bg-[#E8F3E8] text-[#1A3626] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                Quality Ingredients
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-[#A8B7AC] bg-[#E8F3E8] text-[#1A3626] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                Trusted Preparation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border border-[#A8B7AC] bg-[#E8F3E8] text-[#1A3626] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
                Nationwide Delivery
              </div>
            </div>
          </div>

          <div className="relative w-full min-h-[360px] sm:min-h-[480px] lg:min-h-[670px] bg-[#DCE7D6] overflow-hidden order-1 lg:order-2 flex items-center justify-center">
            <div className="absolute w-[82%] aspect-square bg-[#E7ECDC]" style={{ borderRadius: '50%' }} />
            <div className="absolute w-[62%] aspect-square bg-[#F3EDCF]" style={{ borderRadius: '50%' }} />
            <BotanicalSprig className="-left-7 bottom-4 sm:left-2 sm:bottom-10 rotate-6" />
            <BotanicalSprig className="-right-8 top-3 sm:right-0 sm:top-10 rotate-[190deg]" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-8 sm:w-24 sm:h-10 bg-[#CDA72B] border border-[#A78720]" />
              <div className="w-40 h-60 sm:w-48 sm:h-72 bg-[#0D3B2E] flex items-center justify-center px-4 sm:px-5">
                <div className="bg-[#FDF8E9] w-full py-7 px-3 text-center text-[#0D3B2E]">
                  <span className="text-[8px] uppercase tracking-[0.18em] block mb-4">Auntie D Herbs</span>
                  <strong className={`${myCustomFont.className} text-3xl leading-[0.9] block`}>Daily<br/>Wellness</strong>
                  <span className="text-[8px] italic block mt-4">Natural wellness formula</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block absolute right-8 bottom-8 max-w-48 text-right font-serif italic text-lg text-[#54705A] leading-snug">Prepared with care and intention.</div>
          </div>

      </div>
    </section>
  );
}
