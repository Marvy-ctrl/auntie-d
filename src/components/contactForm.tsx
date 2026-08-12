"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Form Data Submitted:", data);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    alert("Message sent successfully!");
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors bg-[#FAFAF7] ${
            errors.name ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-emerald-500"
          }`}
         
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

    
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors bg-[#FAFAF7] ${
            errors.email ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-emerald-500"
          }`}
         
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

  
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          {...register("subject")}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors bg-[#FAFAF7] ${
            errors.subject ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-emerald-500"
          }`}
          placeholder="How can we help?"
        />
        {errors.subject && (
          <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
        )}
      </div>

     
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors bg-[#FAFAF7] resize-none ${
            errors.message ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-emerald-500"
          }`}
          placeholder="Type your message here..."
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>

      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1F5A43] hover:bg-[#1c5e45] text-white font-bold py-4 rounded-xl transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}