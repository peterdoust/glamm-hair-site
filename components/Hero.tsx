'use client';

import Link from 'next/link';
import { BadgeCheck, Package, ShieldCheck, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1121, #1a2744)' }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#f68961]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#febf6b]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-max relative z-10 text-center py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8">
          <span className="w-2 h-2 bg-[#f68961] rounded-full animate-pulse" />
          100% Virgin Human Hair
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your
          <br />
          <span className="bg-gradient-to-r from-[#f68961] to-[#febf6b] bg-clip-text text-transparent">
            Natural Beauty
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto">
          Premium hair extensions crafted for the modern woman.
        </p>
        <p className="text-lg text-white/50 mb-12">
          Luxurious • Natural • Effortlessly Stunning
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/shop"
            className="btn btn-primary btn-lg shadow-2xl shadow-[#f68961]/30"
          >
            Shop Collection
          </Link>
          <Link
            href="/about"
            className="btn btn-lg bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
          >
            Discover More
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <BadgeCheck className="w-8 h-8 text-[#f68961] mb-2" />
            <span className="text-white font-bold">100%</span>
            <span className="text-white/60 text-sm">Premium Quality</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Package className="w-8 h-8 text-[#f68961] mb-2" />
            <span className="text-white font-bold">Free</span>
            <span className="text-white/60 text-sm">Shipping</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <ShieldCheck className="w-8 h-8 text-[#f68961] mb-2" />
            <span className="text-white font-bold">30-Day</span>
            <span className="text-white/60 text-sm">Guarantee</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Heart className="w-8 h-8 text-[#f68961] mb-2" />
            <span className="text-white font-bold">5,000+</span>
            <span className="text-white/60 text-sm">Happy Customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}

