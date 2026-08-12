import React from 'react';
import Header from '../../components/home/header'; // Adjust path if needed
import Footer from '../../components/home/footer'; // Adjust path if needed
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { myCustomFont } from '../fonts/fonts';
import ContactForm from '@/src/components/contactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-slate-800 font-sans flex flex-col">
      <Header />

      
      <main className={`${myCustomFont.className} flex-grow`}>
        
     
        <section className={`${myCustomFont.className} bg-[#1F5A43] py-16 md:py-24 text-center px-4`}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Get in Touch
          </h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
            Have a question about our herbal remedies or need assistance with your order? 
            We are here to help you on your wellness journey.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Contact Information */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-serif font-bold text-emerald-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-700 mt-1">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900">Email Us</h3>
                    <p className="text-slate-600 mt-1">ibukunmodupe101@gmail.com</p>
                    <p className="text-sm text-slate-500 mt-1">We aim to reply within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-700 mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900">Call Us</h3>
                    <p className="text-slate-600 mt-1">09160677079</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-700 mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900">Visit Us</h3>
                    <p className="text-slate-600 mt-1">
                    Ilorin, Kwara State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 rounded-full text-emerald-700 mt-1">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900">Operating Hours</h3>
                    <p className="text-slate-600 mt-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-slate-600">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 border border-emerald-50">
              <h2 className="text-2xl font-serif font-bold text-emerald-900 mb-6">
                Send a Message
              </h2>
              <ContactForm/>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}