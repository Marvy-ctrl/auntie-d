"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/src/components/home/header';
import Footer from '@/src/components/home/footer';
import CheckoutForm from '@/src/components/checkoutForm';
import { ArrowLeft } from 'lucide-react';
import { myCustomFont } from '@/src/app/fonts/fonts';

interface CartItem {
  id: string;
  name: string;
  price: number | string;
  variant: string;
  quantity: number;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(stored);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (Number(item.price) || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
      <Header />

      <main className="flex-grow py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#123A2D] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>

          <h1 className={`${myCustomFont.className} text-2xl sm:text-3xl font-bold text-[#123A2D] mb-8`}>
            Checkout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <CheckoutForm cartItems={cartItems} subtotal={subtotal} />

            {/* Order Preview Summary */}
            <div className="bg-white p-6 sm:p-8 border border-slate-100 h-fit">
              <h2 className="text-lg font-bold text-[#123A2D] mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-2 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <p className="text-slate-500">{item.variant} x {item.quantity}</p>
                    </div>
                    <span className="font-bold text-emerald-700">₦{(Number(item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-base font-bold text-[#123A2D] pt-4 border-t border-slate-200">
                <span>Total</span>
                <span className="text-xl text-emerald-700">₦{subtotal.toLocaleString()}</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}