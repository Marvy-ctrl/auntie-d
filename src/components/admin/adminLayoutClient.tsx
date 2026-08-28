"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Menu, Settings, X } from "lucide-react";
import { signOut } from "@/src/lib/auth-client";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <main className="min-h-screen bg-white">{children}</main>;
  }

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Categories", href: "/admin/categories", icon: Users },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="admin-shell min-h-screen bg-white flex flex-col md:flex-row font-sans text-[#0D3B2E]">
      
      {/* 1. MOBILE HEADER */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#C8D5CE] bg-white px-4 text-[#0D3B2E] lg:hidden">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="flex h-10 w-10 shrink-0 items-center justify-center hover:border-[#0D3B2E]"
          aria-label="Open admin menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/admin" className="flex items-center gap-2" aria-label="Admin dashboard">
          <Image src="/logo.jpeg" alt="Auntie D Herbs" width={32} height={28} className="h-7 w-auto shrink-0 object-contain" priority />
          <span className="font-serif text-base font-semibold leading-none">Auntie-D Herbs</span>
        </Link>
        <div className="h-10 w-10" aria-hidden="true" />
      </header>

      {/* 2. MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 3. DYNAMIC SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#0D3B2E] text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen lg:flex lg:shrink-0
      `}>
        {/* Sidebar Header */}
        <div className="px-5 py-6 border-b border-[#234934] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpeg" alt="Auntie D Herbs" width={40} height={30} className="w-11 h-9 object-contain shrink-0" />
            <div>
              <p className="text-sm text-[#A2B5AA] uppercase ">Auntie-D Herbs</p>
            </div>
          </div>
          
          <button onClick={closeSidebar} className="lg:hidden p-1 text-[#A2B5AA] hover:text-white rounded-md">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Dynamic Nav Links */}
        <nav className="flex-1 p-4 space-y-2 mt-2 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 border-l-2 font-medium ${
                  isActive
                    ? "bg-transparent text-white"
                    : "text-[#A2B5AA] border-transparent hover:bg-[#163F33] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Back to Store & Logout Section */}
        <div className="p-4 border-t border-[#234934] space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#A2B5AA] hover:bg-[#234934]/50 hover:text-white font-medium transition-colors">
            Back to Store
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-400 font-medium transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 4. MAIN CONTENT CONTAINER */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 w-full max-w-[100vw] overflow-x-hidden font-sans bg-white">
        {children}
      </main>
      
    </div>
  );
}
