"use client";

import React, { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';

interface CartItem {
  id: string; // matches productId
  name: string;
  price: number | string;
  variant: string;
  variantId?: string; // If you store the variant database ID in the cart item
  quantity: number;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
  subtotal: number;
}

export default function CheckoutForm({ cartItems, subtotal }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendToWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Open a blank window immediately upon user click to bypass browser popup blockers
    const newWindow = window.open('', '_blank');

    try {
      // 2. Map your cart items to match the createOrder data shape
      const orderPayload = {
        customerName: formData.name || "Guest Customer",
        customerPhone: formData.phone || undefined,
        customerNote: formData.notes || undefined,
        deliveryAddress: formData.address || "Not specified",
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          variantId: item.variantId || undefined,
        })),
      };

      // 3. Call your backend route to create the order and get the official orderNumber
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const responseText = await res.text();
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = { message: responseText };
      }

      if (!res.ok) {
        if (newWindow) newWindow.close();
        throw new Error(responseData.message || "Failed to create order");
      }

      // Grab the official backend-generated order number (e.g. ADH-260813-A91D9E44)
      const officialOrderNumber = responseData.data.orderNumber;

      // 4. Format WhatsApp Message using the official order number
      let message = `NEW ORDER %0A`;
      message += `Order Number: ${officialOrderNumber}%0A%0A`;

      if (formData.name) message += `Name: ${formData.name}%0A`;
      if (formData.phone) message += `Phone: ${formData.phone}%0A`;
      if (formData.address) message += `Delivery Address: ${formData.address}%0A`;
      if (formData.notes) message += `Notes: ${formData.notes}%0A`;

      message += `%0AItems:%0A`;
      cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.name} (${item.variant}) x ${item.quantity} - ₦${(Number(item.price) * item.quantity).toLocaleString()}%0A`;
      });

      message += `%0ATotal: ₦${subtotal.toLocaleString()}`;

      const adminWhatsAppNumber = "2349160677079"; 
      const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${message}`;

      // 5. Direct the pre-opened window to WhatsApp
      if (newWindow) {
        newWindow.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
      }

      // 6. Clear cart to prevent re-ordering
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

    } catch (err: any) {
      console.error("Order creation error:", err);
      if (newWindow) newWindow.close();
      alert(`Could not complete order: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 border border-slate-100">
      <h2 className="text-lg font-bold text-[#123A2D] mb-4">Your Details</h2>
      <p className="text-xs text-slate-500 mb-6">Provide your contact info as regards to your delivery.</p>

      <form onSubmit={handleSendToWhatsApp} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter delivery address..."
            rows={3}
            required
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes</label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any specific instructions..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#1F5A43] hover:bg-emerald-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />} 
          {isLoading ? "Saving Order..." : "Send Order Quote to WhatsApp"}
        </button>
      </form>
    </div>
  );
}