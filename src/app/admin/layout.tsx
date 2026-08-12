
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => setIsSidebarOpen(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Users },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-900">
      
      {/* 1. MOBILE HEADER */}
      <header className="md:hidden bg-[#0D3327] text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#234934]">
            <Image src="/logo.jpeg" alt="Auntie D Logo" fill className="object-cover" />
          </div>
          <h2 className="font-serif text-xl font-bold text-[#FDFCF8] leading-none">Auntie-D</h2>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 hover:bg-[#234934] rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* 2. MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 3. DYNAMIC SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#0D3327] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex md:shrink-0
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#234934] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#234934] shadow-sm">
              <Image src="/logo.jpeg" alt="Auntie D Logo" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#FDFCF8] leading-none">Auntie D</h2>
              <p className="text-[10px] text-[#A2B5AA] tracking-widest uppercase mt-1.5">Admin Portal</p>
            </div>
          </div>
          
          <button onClick={closeSidebar} className="md:hidden p-1 text-[#A2B5AA] hover:text-white rounded-md">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Dynamic Nav Links with Active State Detection */}
        <nav className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-[#234934] text-white"
                    : "text-[#A2B5AA] hover:bg-[#234934]/50 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Back to Store */}
        <div className="p-4 border-t border-[#234934]">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#A2B5AA] hover:bg-red-500/10 hover:text-red-400 font-medium transition-colors">
            <LogOut className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* 4. MAIN CONTENT CONTAINER (Forced to font-sans) */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-[100vw] overflow-x-hidden font-sans">
        {children}
      </main>
      
    </div>
  );
}