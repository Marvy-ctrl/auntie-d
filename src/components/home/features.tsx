import React from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { myCustomFont } from '@/src/app/fonts/fonts';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Features() {
  return (
    <div className="w-full">
      
      {/* 1. WHY AUNTIE D SECTION */}
      <section className="bg-[#e4ece2] py-20 lg:py-32 border-t border-[#E8F3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Heading */}
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold tracking-widest text-[#728579] uppercase mb-4">
                Why Auntie D
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-medium text-[#1A3626] mb-6 leading-tight">
                Rooted in nature.<br />Made for real life.
              </h2>
              <p className="text-[#4A5D52] max-w-md leading-relaxed text-lg">
                We combine traditional herbal knowledge with careful preparation, clear guidance and warm personal service.
              </p>
            </div>

            <div className="flex flex-col space-y-10 lg:mt-8">
              {/* Feature 01 */}
              <div className="flex gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3626] mb-2">Carefully sourced</h3>
                  <p className="text-[#4A5D52] leading-relaxed">Select natural ingredients from suppliers we know and trust.</p>
                </div>
              </div>
              
              <div className="flex gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3626] mb-2">Prepared with care</h3>
                  <p className="text-[#4A5D52] leading-relaxed">Our blends are thoughtfully measured and prepared in small batches.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1A3626] mb-2">Human guidance</h3>
                  <p className="text-[#4A5D52] leading-relaxed">Speak directly to an Auntie D helper to offer clarity on your order.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white py-24 border-t border-[#E8F3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#728579] uppercase mb-4 block">
              Customer Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif font-medium text-[#1A3626]">
              Kind words from the Auntie D community.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="flex flex-col">
             
              <p className="text-[#1A3626] text-lg leading-relaxed mb-6 flex-grow font-serif italic">
                "The ordering process was simple, and Auntie D explained a lot on everything clearly."
              </p>
              <p className="text-[#728579] font-medium text-sm"> Ahmad S.</p>
            </div>

            {/* Review 2 */}
            <div className="flex flex-col">
            
              <p className="text-[#1A3626] text-lg leading-relaxed mb-6 flex-grow font-serif italic">
                "I appreciated the careful packaging and the quick WhatsApp update after ordering."
              </p>
              <p className="text-[#728579] font-medium text-sm">Chika O.</p>
            </div>

            <div className="flex flex-col">
             
              <p className="text-[#1A3626] text-lg leading-relaxed mb-6 flex-grow font-serif italic">
                "The consultation helped me choose a wellness routine that felt suitable for me."
              </p>
              <p className="text-[#728579] font-medium text-sm"> Femi T.</p>
            </div>
          </div>

        </div>
      </section>


      <section className="bg-[#1F5A43] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-10">
          
          <div className="flex flex-col items-start">
            <span className={`${inter.className} text-[11px] font-semi-bold tracking-widest text-[#E8F3E8]/70 uppercase mb-4`}>
              Not sure where to start?
            </span>
            <h2 className={`${myCustomFont.className} text-3xl lg:text-5xl font-serif font-bold text-white max-w-lg leading-tight`}>
              Let's talk about your wellness goals.
            </h2>
          </div>

          <Link 
            href="https://wa.me/2349160677079"
            target="_blank"
            className="bg-white hover:bg-[#FDFCF8] text-[#1A3626] font-medium py-4 px-6 transition-colors inline-flex items-center justify-center text-sm whitespace-nowrap"
          >
            Chat with us on WhatsApp 
          </Link>
          
        </div>
      </section>

    </div>
  );
}