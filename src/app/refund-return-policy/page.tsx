"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { myCustomFont } from "../fonts/fonts";
import Header from "@/src/components/home/header";
import Footer from "@/src/components/home/footer";

export default function RefundPolicyPage() {
  return (
    <>
      <Header />

      <div className={`${myCustomFont.className} max-w-4xl mx-auto py-12 px-4 sm:px-6 text-slate-800`}>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1A3626] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Refund & Returns Policy
        </h1>

        <p className="text-xs text-slate-400 mb-8">
          Last updated: August 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              1. No Returns or Refunds
            </h2>
            <p className="text-[16px]">
              All purchases from Auntie-D are final. We do not accept returns
              or provide refunds for products once an order has been confirmed
              and delivered.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              2. Please Check Your Order
            </h2>
            <p className="text-[16px]">
              Customers are encouraged to carefully review their order details,
              product selection, quantity, and delivery information before
              completing their purchase.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              3. Incorrect or Damaged Orders
            </h2>
            <p className="text-[16px]">
              If you receive an item that is different from what you ordered,
              or your order arrives damaged, please contact us as soon as
              possible after delivery.
            </p>
            <p className="text-[16px]">
              We will review the issue and, where appropriate, work with you
              to resolve the problem.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              4. Order Cancellation
            </h2>
            <p className="text-[16px]">
              If you wish to cancel an order, please contact us as soon as
              possible. Cancellation may not be possible once an order has
              already been processed, prepared, or dispatched.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              5. Product Information
            </h2>
            <p className="text-[16px]">
              Customers should carefully review product descriptions, sizes,
              ingredients, directions, and other available product information
              before placing an order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              6. Contact Us
            </h2>
            <p className="text-[16px]">
              If you have an issue with an order or have questions about this
              policy, please contact us using the contact information provided
              on our website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              7. Policy Changes
            </h2>
            <p className="text-[16px]">
              We may update this Refund & Returns Policy from time to time.
              Changes will be posted on this page with an updated revision
              date.
            </p>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}