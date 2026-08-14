"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/src/components/home/header';
import Footer from '@/src/components/home/footer';
import { ArrowLeft, Search, MessageCircle, Loader2 } from 'lucide-react';
import { myCustomFont } from '@/src/app/fonts/fonts';

export default function TrackOrderPage() {
  const [searchCode, setSearchCode] = useState('');
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setIsLoading(true);
    setSearched(false);
    setErrorMessage('');

    try {
      const res = await fetch(`/api/orders/track/${searchCode.trim()}`);      
      if (!res.ok) {
        throw new Error("Could not find an order with this reference number. Please check and try again.");
      }

      const data = await res.json();
      const order = data.data || data.order || data;

      // Calculate total item quantity count safely
      const totalItemsCount = order.items?.reduce((acc: number, item: any) => acc + (item.quantity || 0), 0) || 0;
      
      // Calculate subtotal sum safely
      const calculatedSubtotal = order.items?.reduce((acc: number, item: any) => {
        const itemPrice = Number(item.lineTotal ?? (Number(item.unitPrice ?? item.price ?? 0) * Number(item.quantity ?? 0)));
        return acc + itemPrice;
      }, 0) || order.total || 0;

      setOrderDetails({
        ref: order.orderNumber || searchCode.trim().toUpperCase(),
        customerName: order.customerName || "Customer",
        status: order.status || 'AWAITING_CONFIRMATION',
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB'),
        itemsCount: totalItemsCount,
        subtotal: calculatedSubtotal,
        items: order.items || [],
      });
      setSearched(true);
    } catch (err: any) {
      console.error("Error fetching order status:", err);
      setErrorMessage("Could not find an order with this reference number. Please check and try again.");
      setOrderDetails(null);
      setSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to map backend enum status to step index
  const getStepIndex = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'CONFIRMED': return 1;
      case 'PROCESSING': return 2;
      case 'READY_FOR_DISPATCH': return 3;
      case 'DISPATCHED': return 4;
      case 'DELIVERED': return 5;
      default: return 0; // AWAITING_CONFIRMATION
    }
  };

  const currentStep = orderDetails ? getStepIndex(orderDetails.status) : 0;
  const steps = ['Awaiting', 'Confirmed', 'Processing', 'Ready', 'Dispatched', 'Delivered'];

  return (
    <div className="min-h-screen bg-[#FDFCF8] flex flex-col">
      <Header />

      <main className="flex-grow py-8 sm:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#123A2D] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <div className="text-center max-w-xl mx-auto mb-10">
            <h1 className={`${myCustomFont.className} text-2xl sm:text-3xl font-bold text-[#123A2D] mb-3`}>
              Track Your Order
            </h1>
            <p className="text-sm text-slate-500">
              Enter your order number below to check your current delivery status and quote updates.
            </p>
          </div>

          {/* Search Bar Form */}
          <div className="bg-white p-4 sm:p-6 border border-slate-100 shadow-sm mb-8">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Enter Order number (e.g. ADH-260813-...)"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3.5 bg-[#123A2D] hover:bg-[#1a523f] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Track order"}
              </button>
            </form>
          </div>

          {/* Error Message Display */}
          {searched && errorMessage && (
            <div className="p-6 text-center text-red-600 text-sm mb-8">
              {errorMessage}
            </div>
          )}

          {/* Search Result Display */}
          {searched && orderDetails && (
            <div className="bg-[#FFFDF7] p-6 sm:p-8 space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                <p className="text-xs font-mono font-bold tracking-wide text-slate-500 uppercase">{orderDetails.ref}</p>
                <div className="inline-flex items-center px-4 py-1.5  text-emerald-800 text-xs font-bold w-fit">
                  {orderDetails.status.replace(/_/g, ' ')}
                </div>
              </div>

              <div>
                <h2 className={`${myCustomFont.className} text-3xl font-bold text-[#123A2D]`}>
                  Hi, {orderDetails.customerName}.
                </h2>
              </div>

              {/* 3 Stat Boxes with safe fallback */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F4F1EA] p-4 border border-slate-200/60">
                  <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1">Order Date</p>
                  <p className="text-sm font-bold text-[#123A2D]">{orderDetails.date}</p>
                </div>
                <div className="bg-[#F4F1EA] p-4 border border-slate-200/60">
                  <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1">Items</p>
                  <p className="text-sm font-bold text-[#123A2D]">{orderDetails.itemsCount}</p>
                </div>
                <div className="bg-[#F4F1EA] p-4 border border-slate-200/60">
                  <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1">Subtotal</p>
                  <p className="text-sm font-bold text-[#123A2D]">₦{Number(orderDetails.subtotal || 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Status Progress Bar */}
              <div className="pt-6 pb-4 overflow-x-auto">
                <div className="relative flex items-center justify-between min-w-[450px] mx-auto px-4">
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-slate-300 z-0" />
                  
                  {steps.map((stepLabel, idx) => {
                    const isCompleted = idx <= currentStep;
                    return (
                      <div key={idx} className="relative z-10 flex flex-col items-center">
                        <div 
                          className={`w-3.5 h-3.5 border-2 transition-colors ${
                            isCompleted 
                              ? 'bg-[#123A2D] border-[#123A2D]' 
                              : 'bg-white border-slate-300'
                          }`} 
                        />
                        <span className={`text-[11px] mt-2 font-medium text-center ${isCompleted ? 'text-[#123A2D] font-bold' : 'text-slate-400'}`}>
                          {stepLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Included Items</h3>
                <div className="space-y-3">
                  {orderDetails.items && orderDetails.items.length > 0 ? (
                    orderDetails.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-sm py-2.5 bg-[#F4F1EA]/50 px-4 border border-slate-200/40">
                        <div>
                          <span className="font-bold text-slate-800">{item.productName || item.name}</span>
                          <span className="text-slate-500 ml-2">({item.variantLabel || item.variant || "Standard"}) x {item.quantity}</span>
                        </div>
                        <span className="font-bold text-[#123A2D]">₦{(Number(item.lineTotal || (Number(item.unitPrice || item.price || 0) * Number(item.quantity || 0)))).toLocaleString()}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic">No specific items logged for this order.</p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">Have questions about your order?</p>
                <a
                  href="https://wa.me/2349160677079"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-[#1F5A43] hover:bg-emerald-800 text-white text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}