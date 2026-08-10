import Link from "next/link";
import { ShoppingBag, Leaf, Search, Menu } from "lucide-react";
import Image from "next/image"; 

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu */}
          <button className="md:hidden p-2 text-emerald-800">
            <Menu className="w-6 h-6" />
          </button>


        <div className="flex-shrink-0 flex items-center gap-2 md-gap-4">
         <Image 
          src="/logo.jpeg" 
          alt="logo" 
          width={40} 
          height={40} 
          className="rounded-full object-cover w-10 h-10 md:w-[50px] md:h-[50px]" 
  />
          <Link href="/" className="font-serif text-2xl font-bold text-emerald-900 tracking-tight">
            Auntie-D Herbs
          </Link>
        </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/shop" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">Shop</Link>
            <Link href="/about" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-emerald-900 hover:text-emerald-600 font-medium transition-colors">Contact Us</Link>
          </nav>

          <div className="flex items-center space-x-5">
            <button className="text-emerald-800 hover:text-emerald-600 hidden sm:block">
            </button>
            <Link href="/cart" className="text-emerald-800 hover:text-emerald-600 relative p-2">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}