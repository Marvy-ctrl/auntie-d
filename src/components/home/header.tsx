"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
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
    <header className="site-header bg-[#FDFCF8] border-b border-[#D2DAD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[76px]">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#123A2D]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="logo"
              width={40}
              height={40}
              className="object-cover w-10 h-10"
            />
            <Link
              href="/"
              className="font-serif text-xl sm:text-2xl font-bold text-[#123A2D] tracking-tight"
            >
              Auntie-D Herbs
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 h-full">
            <Link
              href="/"
              className="h-full flex items-center text-[#123A2D] hover:text-[#78814D] text-xs font-bold uppercase tracking-[0.12em]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="h-full flex items-center text-[#123A2D] hover:text-[#78814D] text-xs font-bold uppercase tracking-[0.12em]"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="h-full flex items-center text-[#123A2D] hover:text-[#78814D] text-xs font-bold uppercase tracking-[0.12em]"
            >
              About
            </Link>
            <Link
              href="/track-order"
              className="h-full flex items-center text-[#123A2D] hover:text-[#78814D] text-xs font-bold uppercase tracking-[0.12em]"
            >
              Track Order
            </Link>
            <Link
              href="/#contact"
              className="h-full flex items-center text-[#123A2D] hover:text-[#78814D] text-xs font-bold uppercase tracking-[0.12em]"
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex items-center shrink-0">
            <Link
              href="/cart"
              className="relative w-12 h-12 flex items-center justify-center text-[#123A2D] hover:bg-[#E4ECE2]"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#1F5A43] text-white text-[10px] leading-none font-bold min-w-5 h-5 px-1 flex items-center justify-center border-2 border-[#FDFCF8]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFCF8] px-4 py-0">
          <nav className="flex flex-col divide-y divide-[#D2DAD3]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#123A2D] py-4 font-bold uppercase tracking-widest text-sm"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#123A2D] py-4 font-bold uppercase tracking-widest text-sm"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#123A2D] py-4 font-bold uppercase tracking-widest text-sm"
            >
              About
            </Link>
            <Link
              href="/track-order"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#123A2D] py-4 font-bold uppercase tracking-widest text-sm"
            >
              Track Order
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#123A2D] py-4 font-bold uppercase tracking-widest text-sm"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
