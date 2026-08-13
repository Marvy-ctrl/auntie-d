import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/home/header";
import Footer from "../../components/home/footer";
import { Inter } from "next/font/google";
import { myCustomFont } from "../fonts/fonts";

const inter = Inter({ subsets: ["latin"] });

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-800 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* =========================
            1. FOUNDER HERO SECTION
        ========================== */}
        <section className="py-10 sm:py-14 lg:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
              
              {/* Founder Image */}
              <div className="relative w-full h-[360px] sm:h-[480px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src="/ceo.jpeg"
                  alt="Auntie D - Founder"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Story Content */}
              <div
                className={`${inter.className} w-full flex flex-col items-start text-left`}
              >
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#728579] uppercase mb-3">
                  Our Story
                </span>

                <h1
                  className={`${myCustomFont.className} text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#123A2D] mb-5 sm:mb-6 leading-[1.15]`}
                >
                  Grounded in nature.
                  <br />
                  Grown with care.
                </h1>

                <div className="w-full space-y-4 sm:space-y-5 text-sm sm:text-base text-[#4A5D52] leading-7">
                  <p>
                    Welcome to Auntie D Herbs. Our journey began with a simple,
                    profound belief: the earth provides everything we need to
                    heal, balance, and thrive.
                  </p>

                  <p>
                    Drawing from generations of traditional herbal wisdom,
                    Auntie D set out to create a sanctuary for natural
                    wellness. We noticed that modern life often leaves us
                    disconnected from nature&apos;s remedies, so we decided to
                    bridge that gap with carefully crafted, small-batch herbal
                    solutions.
                  </p>

                  <p>
                    Every mixture, tea, and powder we offer is a testament to
                    our commitment to purity. We source only the highest
                    quality natural ingredients, preparing them with the same
                    care and attention to detail that you would expect from a
                    trusted family member.
                  </p>
                </div>

                {/* Quote */}
                <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#E8F3E8] w-full">
                  <p className=" text-lg sm:text-xl md:text-2xl text-[#1A3626] italic leading-relaxed">
                    &quot;Nature is our greatest healer. We simply help deliver
                    her touch.&quot;
                  </p>

                  <p className="text-[11px] sm:text-xs md:text-sm font-bold text-[#728579] tracking-wider uppercase mt-3">
                    CEO @Auntie-D Herbs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            2. OUR PHILOSOPHY
        ========================== */}
        <section className="bg-[#1F5A43] py-14 sm:py-16 lg:py-28 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Heading */}
            <div className="text-center mb-10 sm:mb-14 lg:mb-20">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#E8F3E8]/70 uppercase mb-3 block">
                Our Philosophy
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-5xl  font-medium leading-tight">
                What drives our craft
              </h2>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 lg:gap-16">
              
              <div className="flex flex-col items-center text-center px-4">
                <h3 className="text-lg sm:text-xl font-bold mb-3 ">
                  100% Natural
                </h3>

                <p className="text-sm sm:text-base text-[#E8F3E8]/90 leading-7 max-w-sm">
                  We never use synthetic additives or artificial preservatives.
                  What you see on the label is exactly what is inside the bottle.
                </p>
              </div>

              <div className="flex flex-col items-center text-center px-4">
                <h3 className="text-lg sm:text-xl font-bold mb-3 ">
                  Careful Preparation
                </h3>

                <p className="text-sm sm:text-base text-[#E8F3E8]/90 leading-7 max-w-sm">
                  Our remedies are carefully prepared to ensure maximum potency,
                  freshness, and quality control in every single order.
                </p>
              </div>

              <div className="flex flex-col items-center text-center px-4 sm:col-span-2 lg:col-span-1">
                <h3 className="text-lg sm:text-xl font-bold mb-3 ">
                  Community First
                </h3>

                <p className="text-sm sm:text-base text-[#E8F3E8]/90 leading-7 max-w-sm">
                  Wellness is a journey best taken together. We are committed to
                  providing honest guidance and support to everyone who trusts us.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================
            3. CALL TO ACTION
        ========================== */}
        <section className="py-14 sm:py-20 lg:py-24 bg-[#E8F3E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl  font-medium text-[#1A3626] mb-4 sm:mb-6 leading-tight">
              Ready to start your wellness journey?
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-[#4A5D52] mb-7 sm:mb-8 leading-7 max-w-2xl mx-auto">
              Explore our collection of natural remedies, carefully crafted to
              support your daily health.
            </p>

            <Link
              href="/shop"
              className="bg-[#1F5A43] hover:bg-[#234934] text-white font-medium py-3.5 px-7 sm:px-8 rounded-xl transition-colors inline-block shadow-sm text-sm sm:text-base"
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