import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
 
      <section className="relative bg-emerald-900 text-white overflow-hidden">
        {/* Placeholder for a background image */}
      <div className="absolute inset-0 opacity-20 bg-[url('/hero-image.jpg')] bg-cover bg-center mix-blend-overlay"></div>        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm mb-4">Auntie-D Herbs</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight max-w-3xl">
            Natural Healing Touch for Healthier You
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl">
              We are committed to supporting your wellness journey with carefully prepared herbal products made from quality natural ingredients. Discover trusted herbal solutions designed to promote overall health and wellbeing.</p>
          <Link 
            href="/shop" 
            className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold py-4 px-6 rounded-full"
          >
            Shop Products
          </Link>
        </div>
      </section>
  )
}
