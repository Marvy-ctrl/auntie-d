"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { myCustomFont } from "../fonts/fonts";
import Header from "@/src/components/home/header";
import Footer from "@/src/components/home/footer";

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>

        <p className="text-xs text-slate-400 mb-8">
          Last updated: August 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-600">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              1. Introduction
            </h2>
            <p className="text-[16px]">
              Welcome to Auntie-D. We respect your privacy and are committed to
              protecting your personal information. This Privacy Policy
              explains what information we collect, how we use it, how we
              protect it, and the choices available to you when you use our
              website or purchase our products.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              2. Information We Collect
            </h2>
            <p className="text-[16px]">
              We may collect information that you provide when placing an order,
              contacting us, or interacting with our website. This may include:
            </p>

            <ul className="list-disc pl-5 space-y-1">
              <li className="text-[16px]">
                <strong>Identity Data:</strong> your name and other information
                you provide when placing an order.
              </li>
              <li className="text-[16px]">
                <strong>Contact Data:</strong> your phone number, email
                address, and delivery address.
              </li>
              <li className="text-[16px]">
                <strong>Transaction Data:</strong> information about products
                you purchase, order details, payment status, and related
                transaction information.
              </li>
              <li className="text-[16px]">
                <strong>Communication Data:</strong> information you provide
                when you contact us regarding an order, product, or service.
              </li>
             
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              3. How We Use Your Information
            </h2>

            <p className="text-[16px]">
              We use the information we collect only where necessary for
              legitimate business purposes, including:
            </p>

            <ul className="list-disc pl-5 space-y-1">
              <li className="text-[16px]">To process, confirm, and deliver your orders.</li>
              <li className="text-[16px]">To communicate with you about your orders and enquiries.</li>
              <li className="text-[16px]">To process and verify payments where applicable.</li>
              <li className="text-[16px]">
                To provide customer support and respond to your requests.
              </li>
              <li className="text-[16px]">
                To maintain, secure, and improve our website and services.
              </li>
              <li className="text-[16px]">
                To prevent fraud, unauthorized activity, and misuse of our
                services.
              </li>
              <li className="text-[16px]">
                To comply with applicable legal and regulatory requirements.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              4. How We Protect Your Information
            </h2>

            <p className="text-[16px]">
              We take reasonable technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, loss, or misuse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              5. Sharing Your Information
            </h2>

            <p className="text-[16px]">
              We do not sell or rent your personal information. We may share
              necessary information with trusted service providers where
              required to operate our business, process orders, process
              payments, provide delivery services, maintain our website, or
              comply with legal obligations.
            </p>

            <p className="text-[16px]">
              We only share information that is reasonably necessary for the
              relevant service or purpose.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              6. Data Retention
            </h2>

            <p className="text-[16px]">
              We retain personal information only for as long as reasonably
              necessary to fulfil the purposes for which it was collected,
              including processing orders, maintaining business records,
              resolving disputes, preventing fraud, and complying with legal
              obligations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              7. Cookies and Website Technologies
            </h2>

            <p className="text-[16px]">
              Our website may use cookies or similar technologies to support
              essential website functionality, improve performance, understand
              how visitors use the website, and provide a better user
              experience.
            </p>

            <p className="text-[16px]">
              You may be able to control or disable cookies through your
              browser settings. Disabling certain cookies may affect some
              website functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              8. Your Privacy Rights
            </h2>

            <p className="text-[16px]">
              Depending on applicable law, you may have rights regarding your
              personal information, including the right to request access to,
              correction of, or deletion of certain personal information we
              hold about you.
            </p>

            <p>
              You may also have the right to object to or restrict certain
              processing of your information. Requests can be made using the
              contact information provided on our website.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              9. Children's Privacy
            </h2>

            <p>
              Our website is not intended for children to make purchases or
              provide personal information independently. We do not knowingly
              collect personal information from children for this purpose.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              10. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to our services, business practices, or applicable
              requirements. Any updates will be posted on this page with a
              revised "Last updated" date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">
              11. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy, how we handle
              your personal information, or wish to make a privacy-related
              request, please contact us using the contact information
              provided on our website.
            </p>
          </section>
        </div>
      </div>
      <Footer/>
    </>
  );
}