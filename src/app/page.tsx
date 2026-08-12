import React from 'react'
import Header from '../components/home/header'
import Hero from '../components/home/hero'
import Features from '../components/home/features'
import Footer from '../components/home/footer'
import ProductGrid from '../components/home/productGrid'

export default function page() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-800 font-sans">
      <Header/>
      <Hero/>
      <ProductGrid/>
      <Features/>
      <Footer/>
    </div>
  )
}
