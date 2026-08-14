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
   <Header/>
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
            1. Our Policy
          </h2>
          <p>
            We want you to be satisfied with your purchase. Because our
            products include herbal and consumable items, returns and refunds
            are handled carefully to protect the quality, safety, and
            integrity of our products.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            2. Eligible Returns
          </h2>
          <p>
            A return or replacement may be considered if you receive a product
            that is damaged, defective, incorrect, or significantly different
            from the product you ordered.
          </p>
          <p>
            Products must be reported within a reasonable period after delivery
            and may be subject to verification before a refund or replacement
            is approved.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            3. Non-Returnable Products
          </h2>
          <p>
            For health, hygiene, and product-safety reasons, opened or used
            herbal and consumable products may not be eligible for return or
            refund unless the product was damaged, defective, or incorrectly
            supplied.
          </p>
          <p>
            We may also decline returns for products that have been damaged
            after delivery due to improper storage, handling, or use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            4. Damaged or Incorrect Orders
          </h2>
          <p>
            If your order arrives damaged or you receive the wrong product,
            please contact us as soon as possible with your order details and
            clear photographs showing the issue.
          </p>
          <p>
            After reviewing the issue, we may offer a replacement, refund, or
            another appropriate resolution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            5. Refunds
          </h2>
          <p>
            If your refund is approved, the refund will be processed using the
            appropriate payment method or arrangement communicated by our
            team.
          </p>
          <p>
            The time required for a refund to reflect may vary depending on
            the payment method and the relevant financial institution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            6. Order Cancellation
          </h2>
          <p>
            Customers who wish to cancel an order should contact us as soon as
            possible. Cancellation requests may not be accepted once an order
            has been processed, prepared, or dispatched.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            7. How to Request a Refund or Return
          </h2>
          <p>
            To request a return, replacement, or refund, please contact us using
            the contact information provided on our website. Include your order
            details and a description of the issue so that we can review your
            request.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            8. Policy Changes
          </h2>
          <p>
            We may update this Refund & Returns Policy from time to time.
            Changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            9. Contact Us
          </h2>
          <p>
            If you have questions about a refund, return, replacement, or
            cancellation, please contact us using the contact information
            provided on our website.
          </p>
        </section>
      </div>
    </div>
    <Footer/>
   </>
  );
}