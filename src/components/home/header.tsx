"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Leaf, Search, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = storedCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    // Listen for custom cart updates from product cards or cart page
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Also sync across tabs/windows
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-emerald-800 hover:text-emerald-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-shrink-0 flex items-center gap-2 md-gap-4">
            <Image
              src="/logo.jpeg"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full object-cover w-10 h-10 md:w-[50px] md:h-[50px]"
            />
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-emerald-900 tracking-tight"
            >
              Auntie-D Herbs
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/track-order"
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/#contact"
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center space-x-5">
            <Link href="/cart" className="relative p-2 text-[#123A2D] hover:bg-slate-50 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAF7] border-b border-green-100 px-6 py-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors text-lg"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors text-lg"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors text-lg"
            >
              About
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors text-lg"
            >
              Track Order
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors text-lg"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}