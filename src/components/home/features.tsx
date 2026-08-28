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
      <section className="bg-[#e4ece2] py-14 sm:py-20 lg:py-32 border-t border-[#E8F3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24">
            
            {/* Left Column: Heading */}
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-bold tracking-widest text-[#728579] uppercase mb-4">
                Why Auntie D
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1A3626] mb-6 leading-tight">
                Rooted in nature.<br />Made for real life.
              </h2>
              <p className="text-[#4A5D52] max-w-md leading-relaxed text-lg">
                We combine traditional herbal knowledge with careful preparation, clear guidance and warm personal service.
              </p>
            </div>

            <div className="grid grid-cols-1 divide-y divide-[#A8B7AC] border-y border-[#A8B7AC]">
              {/* Feature 01 */}
              <div className="flex gap-6 py-7">
                <span className="text-xs font-bold text-[#728579]">01</span>
                <div>
                  <h3 className="text-lg font-bold text-[#1A3626] mb-2">Carefully sourced</h3>
                  <p className="text-[#4A5D52] leading-relaxed">Select natural ingredients from suppliers we know and trust.</p>
                </div>
              </div>
              
              <div className="flex gap-6 py-7">
                <span className="text-xs font-bold text-[#728579]">02</span>
                <div>
                  <h3 className="text-lg font-bold text-[#1A3626] mb-2">Prepared with care</h3>
                  <p className="text-[#4A5D52] leading-relaxed">Our blends are thoughtfully measured and prepared in small batches.</p>
                </div>
              </div>

              <div className="flex gap-6 py-7">
                <span className="text-xs font-bold text-[#728579]">03</span>
                <div>
                  <h3 className="text-lg font-bold text-[#1A3626] mb-2">Human guidance</h3>
                  <p className="text-[#4A5D52] leading-relaxed">Speak directly to an Auntie D helper to offer clarity on your order.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 lg:py-24 border-t border-[#E8F3E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 sm:mb-16">
            <span className="text-[10px] font-bold tracking-widest text-[#728579] uppercase mb-4 block">
              Customer Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-medium text-[#1A3626]">
              Kind words from the Auntie D community.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            {/* Review 1 */}
            <div className="flex flex-col md:pr-10">
             
              <p className="text-[#1A3626] text-lg leading-relaxed mb-6 flex-grow italic">
                "The hormonal imbalance product really worked. My period came with ease  clean and odourless"
              </p>
              <p className="text-[#728579] font-medium text-sm"> Anonymous.</p>
            </div>

            {/* Review 2 */}
            <div className="flex flex-col md:px-10 md:border-l md:border-[#A8B7AC]">
            
              <p className="text-[#1A3626] text-lg leading-relaxed mb-6 flex-grow italic">
                "The infection flusher really is a game changer. My discharge is now back to normal"
              </p>
              <p className="text-[#728579] font-medium text-sm">Anonymous.</p>
            </div>

            <div className="flex flex-col md:pl-10 md:border-l md:border-[#A8B7AC]">
             
              <p className="text-[#1A3626] text-lg leading-relaxed mb-6 flex-grow italic">
                "The hemorrhoid herb worked well. I can now use the toilet in peace."
              </p>
              <p className="text-[#728579] font-medium text-sm"> Anonymous</p>
            </div>
          </div>

        </div>
      </section>


      <section className="bg-[#1F5A43] py-20 lg:py-24" id='contact'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-10">
          
          <div className="flex flex-col items-start">
            <span className={`${inter.className} text-[11px] font-semi-bold tracking-widest text-[#E8F3E8]/70 uppercase mb-4`}>
              Not sure where to start?
            </span>
            <h2 className={`${myCustomFont.className} text-3xl lg:text-5xl font-bold text-white max-w-lg leading-tight`}>
              Let's talk about your wellness goals.
            </h2>
          </div>

          <Link 
            href="https://wa.me/2349160677079"
            target="_blank"
            className="w-full md:w-auto bg-white hover:bg-[#FDFCF8] text-[#1A3626] font-medium py-4 px-6 inline-flex items-center justify-center text-sm md:whitespace-nowrap"
          >
            Chat with us on WhatsApp 
          </Link>
          
        </div>
      </section>

    </div>
  );
}
