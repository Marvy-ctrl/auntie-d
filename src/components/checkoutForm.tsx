"use client";

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface CheckoutFormProps {
  cartItems: any[];
  subtotal: number;
}

export default function CheckoutForm({ cartItems, subtotal }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let message = `NEW ORDER %0A%0A`;

    if (formData.name) message += `Name: ${formData.name}%0A`;
    if (formData.phone) message += `Phone: ${formData.phone}%0A`;
    if (formData.address) message += `Delivery Address: ${formData.address}%0A`;
    if (formData.notes) message += `Notes: ${formData.notes}%0A`;

    message += `%0A*Items:*%0A`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.variant}) x ${item.quantity} - ₦${(Number(item.price) * item.quantity).toLocaleString()}%0A`;
    });

    message += `%0A*Total: ₦${subtotal.toLocaleString()}`;

    // Replace with your actual admin WhatsApp number (with country code, e.g. 2348012345678)
    const adminWhatsAppNumber = "2349160677079"; 
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className=" p-6 sm:p-8 border border-slate-100">
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
            className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
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
            className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
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
            className="w-full px-4 py-3 border border-slate-200 text-sm focus:outline-none focus:border-[#123A2D]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#1F5A43] hover:bg-[#26614b] text-white font-medium transition-colors flex items-center justify-center gap-2 mt-6"
        >
          Send Order Quote to WhatsApp
        </button>
      </form>
    </div>
  );
}