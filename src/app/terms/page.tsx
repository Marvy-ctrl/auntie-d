"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { myCustomFont } from "../fonts/fonts";
import Header from "@/src/components/home/header";
import Footer from "@/src/components/home/footer";

export default function TermsOfServicePage() {
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
        Terms of Service
      </h1>

      <p className="text-xs text-slate-400 mb-8">
        Last updated: August 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-600">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            1. Agreement to Terms
          </h2>
          <p className="text-[16px]">
            By accessing or using our website and purchasing our products, you
            agree to be bound by these Terms of Service. If you do not agree
            with any part of these terms, please do not use our website or
            purchase our products.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            2. Products and Pricing
          </h2>
          <p className="text-[16px]">
            All products displayed on our store are subject to availability.
            Product descriptions, images, sizes, and prices are provided for
            informational and purchasing purposes and may be updated from time
            to time.
          </p>
          <p className="text-[16px]">
            We reserve the right to modify, suspend, or discontinue any product
            without prior notice. We also reserve the right to correct pricing,
            description, or product information errors when identified.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            3. Orders and Payments
          </h2>
          <p className="text-[16px]">
            When placing an order, you agree to provide accurate and complete
            information, including your name, contact details, delivery
            address, and any other information required to process your order.
          </p>
          <p className="text-[16px]">
            An order may be declined or cancelled if the requested product is
            unavailable, the information provided is inaccurate, or a
            fraudulent, unauthorized, or illegal transaction is suspected.
          </p>
          <p className="text-[16px]">
            Orders are considered confirmed only after the required payment and
            order verification process has been completed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            4. Product Use and Health Disclaimer
          </h2>
          <p className="text-[16px]">
            Our products are provided for their stated intended use. Customers
            are responsible for reading product descriptions, labels,
            directions, and applicable warnings before using any product.
          </p>
          <p className="text-[16px]">
            Our products and information provided on this website are not
            intended to replace professional medical advice, diagnosis, or
            treatment. If you have a medical condition, are taking medication,
            are pregnant or breastfeeding, or have concerns about using a
            product, you should seek appropriate professional advice before
            use.
          </p>
          <p className="text-[16px]">
            We are not responsible for adverse effects resulting from improper
            use, failure to follow product instructions, or use contrary to
            applicable warnings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            5. Delivery
          </h2>
          <p className="text-[16px]">
            Delivery times may vary depending on the customer's location,
            delivery arrangements, availability of products, and other
            circumstances outside our control.
          </p>
          <p className="text-[16px]">
            Customers are responsible for providing accurate delivery
            information and being available to receive their orders. Delays
            caused by incorrect addresses, unavailable recipients, or other
            circumstances attributable to the customer may affect delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            6. Returns and Refunds
          </h2>
          <p className="text-[16px]">
            Returns, exchanges, and refunds are subject to our Refund and
            Returns Policy. Customers should review that policy before placing
            an order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            7. Website Use
          </h2>
          <p className="text-[16px]">
            You agree not to misuse our website, attempt to gain unauthorized
            access to our systems, interfere with the operation of the website,
            or use our services for fraudulent or unlawful purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            8. Intellectual Property
          </h2>
          <p className="text-[16px]">
            Unless otherwise stated, the content on this website, including
            text, images, logos, branding, graphics, and other materials, is
            owned by or used with permission by Auntie-D and may not be copied,
            reproduced, modified, or distributed without prior permission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            9. Limitation of Liability
          </h2>
          <p className="text-[16px]">
            We strive to ensure that product information and website content
            are accurate and up to date. However, we do not guarantee that all
            information will always be complete, accurate, or error-free.
          </p>
          <p className="text-[16px]">
            To the extent permitted by applicable law, Auntie-D will not be
            responsible for losses or damages resulting from improper product
            use, inaccurate information provided by a customer, or circumstances
            beyond our reasonable control.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            10. Changes to These Terms
          </h2>
          <p className="text-[16px]">
            We may update these Terms of Service from time to time to reflect
            changes to our services, products, policies, or applicable
            requirements. Updated terms will be posted on this page with a
            revised date.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">
            11. Contact Us
          </h2>
          <p className="text-[16px]">
            If you have questions about these Terms of Service, our products,
            or an order, please contact us using the contact information
            provided on our website.
          </p>
        </section>
      </div>
    </div>
    <Footer/>
   </>
  );
}