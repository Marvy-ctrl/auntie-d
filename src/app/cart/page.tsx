"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/src/components/home/header';
import Footer from '@/src/components/home/footer';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Leaf } from 'lucide-react';
import { myCustomFont } from '@/src/app/fonts/fonts';

interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number | string;
  variant: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (index: number, delta: number) => {
    const updated = [...cartItems];
    const newQty = updated[index].quantity + delta;
    if (newQty > 0) {
      updated[index].quantity = newQty;
      setCartItems(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = Number(item.price) || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const formattedSubtotal = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(subtotal);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
      <Header />

      <main className="flex-grow py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#123A2D] w-fit">
              <ArrowLeft className="w-4 h-4" /> Continue shopping
            </Link>
           {cartItems.length > 0 && (
              <h1 className={`${myCustomFont.className} text-3xl sm:text-3xl font-bold text-[#123A2D] leading-tight`}>
                Your shopping cart
              </h1>
            )}
          </div>

          {cartItems.length === 0 ? (
            <div className=" p-12 text-center  max-w-xl mx-auto">
             
              <h2 className={`${myCustomFont.className} text-2xl font-bold text-[#123A2D] mb-2`}>Your cart is empty</h2>
              <p className="text-slate-500 mb-8 text-sm">Explore our natural products and add items to your cart to begin.</p>
              <Link href="/shop" className="px-8 py-4 bg-[#123A2D] text-white text-sm font-medium hover:bg-[#1a523f] transition-colors shadow-sm">
                Explore Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => {
                  const itemPrice = Number(item.price) || 0;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div key={index} className="relative p-4 sm:p-6 border border-[#D2DAD3] grid grid-cols-[88px_1fr] sm:flex items-start sm:items-center gap-4 sm:gap-6">
                      <div className="relative w-[88px] h-28 sm:w-24 sm:h-24 bg-[#E4ECE2] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <Leaf className="w-8 h-8 text-emerald-300" />
                        )}
                      </div>

                      <div className="flex-grow text-left pr-7 sm:pr-0">
                        <h3 className="text-lg font-bold text-[#123A2D] leading-tight line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Option: <span className="font-semibold text-slate-700">{item.variant}</span></p>
                        <p className="text-sm font-bold text-emerald-700 mt-2">
                          ₦{itemPrice.toLocaleString()} each
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E0E6DF]">
                        <div className="flex items-center border border-[#CBD6C9] h-10">
                          <button type="button" onClick={() => updateQuantity(index, -1)} className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-[#E8EFE5]" aria-label={`Decrease ${item.name} quantity`}>
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-8 text-center">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(index, 1)} className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-[#E8EFE5]" aria-label={`Increase ${item.name} quantity`}>
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-sm font-bold text-[#123A2D] sm:min-w-[90px] sm:text-right">₦{itemTotal.toLocaleString()}</p>

                        <button type="button" onClick={() => removeItem(index)} className="absolute top-3 right-3 sm:static text-slate-400 hover:text-red-500 p-2" title="Remove item" aria-label={`Remove ${item.name}`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order Summary Summary Card */}
              <div className="bg-[#ffffff6a] p-6 sm:p-8 border border-[#D2DAD3] lg:sticky lg:top-24">
                <h3 className={`${myCustomFont.className} text-xl font-bold text-[#123A2D] mb-6`}>Order Summary</h3>
                
                <div className="space-y-4 text-sm mb-6 pb-6 border-b border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-emerald-700 font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex items-end justify-between gap-4 text-base font-bold text-[#123A2D] mb-8">
                  <span>Estimated Total</span>
                  <span className="text-xl text-emerald-700 whitespace-nowrap">{formattedSubtotal}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#123A2D] hover:bg-[#1a523f] text-white font-medium transition-colors flex items-center justify-center gap-2 text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
