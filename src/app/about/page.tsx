import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/home/header';
import Footer from '../../components/home/footer'; 
import { Leaf, Heart, ShieldCheck } from 'lucide-react';
import { Inter } from 'next/font/google';
import { myCustomFont } from '../fonts/fonts';


const inter = Inter({ subsets: ['latin'] });

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-800 font-sans flex flex-col">
      <Header />

      <main className="flex-grow">
        
       {/* 1. FOUNDER HERO SECTION (Image Left, Text Right) */}
        <section className="py-10 lg:py-24 overflow-hidden">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* items-start keeps them locked at the top */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
              
              {/* Left Column: Founder Image (Removed 'sticky top-24') */}
              <div className="order-1 relative w-full h-[450px] lg:h-[650px] p-6 lg:p-8 flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <Image 
                    src="/hero-herbal-image.jpg" 
                    alt="Auntie D - Founder" 
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Fallback placeholder if image is missing */}
                  <div className="absolute inset-0 bg-[#1A3626]/5 flex items-center justify-center -z-10">
                    <span className="text-[#1A3626]/40 font-serif text-2xl">Founder Image</span>
                  </div>
                </div>
              </div>

              <div className={`${inter.className} order-2 flex flex-col items-start text-left lg:pl-8`}>
                <span className="block text-[11px] font-bold tracking-widest text-[#728579] uppercase mb-4">
                  Our Story
                </span>
                <h1 className={`${myCustomFont.className} text-4xl lg:text-6xl font-serif font-bold text-[#123A2D] mb-8 leading-tight`}>
                  Grounded in nature.<br />Grown with care.
                </h1>
                
                <div className="space-y-6 text-base lg:text-lg text-[#4A5D52] leading-relaxed">
                  <p>
                    Welcome to Auntie D Herbs. Our journey began with a simple, profound belief: the earth provides everything we need to heal, balance, and thrive. 
                  </p>
                  <p>
                    Drawing from generations of traditional herbal wisdom, Auntie D set out to create a sanctuary for natural wellness. We noticed that modern life often leaves us disconnected from nature's remedies, so we decided to bridge that gap with carefully crafted, small-batch herbal solutions.
                  </p>
                  <p>
                    Every mixture, tea, and powder we offer is a testament to our commitment to purity. We source only the highest quality natural ingredients, preparing them with the same care and attention to detail that you would expect from a trusted family member.
                  </p>
                </div>

                <div className="pt-8 border-t border-[#E8F3E8] w-full">
                  <p className="font-serif text-2xl text-[#1A3626] italic">
                    "Nature is our greatest healer. We simply help deliver her touch."
                  </p>
                  <p className="text-sm font-bold text-[#728579] tracking-wider uppercase mt-4">
                   CEO @Auntie-D Herbs
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. OUR PHILOSOPHY / CORE VALUES */}
        <section className="bg-[#1F5A43] py-20 lg:py-28 text-[#ffffff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-[10px] font-bold tracking-widest text-[#E8F3E8]/70 uppercase mb-4 block">
                Our Philosophy
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif font-medium">
                What drives our craft
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              
              <div className="flex flex-col items-center text-center">
               
                <h3 className="text-xl font-bold mb-4 font-serif">100% Natural</h3>
                <p className=" leading-relaxed">
                  We never use synthetic additives or artificial preservatives. What you see on the label is exactly what is inside the bottle.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
               
                <h3 className="text-xl font-bold mb-4 font-serif">Careful Preparation</h3>
                <p className=" leading-relaxed">
                  Our remedies are carfully prepared to ensure maximum potency, freshness, and quality control in every single order.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                
                <h3 className="text-xl font-bold mb-4 font-serif">Community First</h3>
                <p className=" leading-relaxed">
                  Wellness is a journey best taken together. We are committed to providing honest guidance and support to everyone who trusts us.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className="py-24 bg-[#E8F3E8]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-medium text-[#1A3626] mb-6">
              Ready to start your wellness journey?
            </h2>
            <p className="text-[#4A5D52] mb-10 text-lg">
              Explore our collection of natural remedies, carefully crafted to support your daily health.
            </p>
            <Link 
              href="/shop" 
              className="bg-[#1F5A43] hover:bg-[#234934] text-white font-medium py-4 px-8 transition-colors inline-block"
            >
              Explore the Shop
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}