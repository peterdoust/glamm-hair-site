'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Award, Truck, Shield, ShoppingBag, ArrowRight } from 'lucide-react';
import { DEFAULT_HERO, type HeroContent } from '@/lib/content';

// Fixed, in this order, to match the three stats. Deliberately not editable —
// picking icons is a design decision, not copy.
const STAT_ICONS = [Award, Truck, Shield];

/**
 * The homepage hero. Copy and background come from Admin → Homepage, resolved
 * on the server and passed in, so the largest element on the page paints with
 * its final content instead of swapping after a fetch.
 */
export default function Hero({ content = DEFAULT_HERO }: { content?: HeroContent }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section
      className="relative flex flex-col sm:flex-row sm:min-h-screen sm:items-center overflow-hidden sm:py-20"
      style={{ background: 'linear-gradient(135deg, #0a1121 0%, #1a2744 100%)' }}
    >
      {/* Background Image — on phones it sits above the copy at the photo's own
          3:2 shape so the whole group is visible in the first screen; from sm up
          it fills the section behind the text. */}
      <div className="relative aspect-[3/2] sm:aspect-auto sm:absolute sm:inset-0 z-0">
        <div className="absolute inset-0" style={{ transform: 'translateY(0px)' }}>
          <Image
            src={content.image}
            alt="Glamm Hair Extensions - Premium Collection"
            fill
            sizes="100vw"
            className={`object-cover object-center sm:object-[center_30%] transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            // A gentle lift for a brighter, cleaner photo that still reads natural.
            style={{ filter: 'brightness(1.1) contrast(1.04) saturate(1.03)' }}
            priority
          />
        </div>
        {/* Gradient Overlays - kept light so the photo stays bright; just enough at the edges and bottom for the text */}
        <div className="hidden sm:block absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,17,33,0.25), rgba(10,17,33,0.05), rgba(10,17,33,0.25))' }}></div>
        <div className="hidden sm:block absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,17,33,0.35), transparent 55%)' }}></div>
        {/* Phone only: fade the photo's bottom edge into the navy copy panel */}
        <div className="sm:hidden absolute inset-x-0 bottom-0 h-1/4" style={{ background: 'linear-gradient(to top, #0a1121, transparent)' }}></div>
        {/* Decorative Blurs */}
        <div className="hidden sm:block absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15" style={{ background: '#f68961' }}></div>
        <div className="hidden sm:block absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10" style={{ background: '#febf6b' }}></div>
      </div>

      {/* Content */}
      <div className="container-max relative z-10 pt-4 pb-8 sm:pt-32 sm:pb-20 w-full">
        <div className="max-w-5xl mx-auto text-center space-y-5 sm:space-y-12">
          {/* Badge */}
          <div
            className="hidden sm:inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(10, 17, 33, 0.4)', border: '1px solid rgba(246, 137, 97, 0.5)' }}
          >
            <Star className="w-5 h-5 fill-current" style={{ color: '#febf6b' }} />
            <span className="text-sm font-semibold text-white uppercase tracking-wider">{content.badge}</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
              <span className="block text-white mb-1 sm:mb-3" style={{ textShadow: '0 2px 18px rgba(10,17,33,0.45)' }}>{content.headingTop}</span>
              <span
                className="block drop-shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f68961, #febf6b, #ffc9a7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {content.headingBottom}
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl text-white leading-relaxed font-light max-w-3xl mx-auto" style={{ textShadow: '0 1px 10px rgba(10,17,33,0.55)' }}>
            {content.subtitle}
            <span className="block mt-1 sm:mt-3 font-medium drop-shadow-sm" style={{ color: '#ffc9a7' }}>
              {content.subtitleAccent}
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-5 sm:pt-6">
            <Link
              href={content.primaryHref}
              className="group px-4 py-3 sm:px-10 sm:py-5 rounded-full text-white font-semibold text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #f68961, #febf6b)' }}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{content.primaryLabel}</span>
              <ArrowRight className="hidden sm:block w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={content.secondaryHref}
              className="group px-4 py-3 sm:px-10 sm:py-5 rounded-full border-2 border-white/40 text-white font-semibold text-sm sm:text-lg hover:bg-white/15 hover:border-white/60 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 whitespace-nowrap backdrop-blur-md"
            >
              <span>{content.secondaryLabel}</span>
              <ArrowRight className="hidden sm:block w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="hidden sm:grid grid-cols-3 gap-8 md:gap-16 pt-16 max-w-3xl mx-auto border-t border-white/20">
            {content.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i]
              return (
                <div key={i} className="space-y-3">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-3 rounded-full backdrop-blur-sm" style={{ background: 'rgba(246, 137, 97, 0.15)', border: '1px solid rgba(246, 137, 97, 0.3)' }}>
                      <Icon className="w-7 h-7" style={{ color: '#febf6b' }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold drop-shadow-md" style={{ color: '#f68961' }}>{stat.value}</div>
                  <div className="text-xs text-white/70 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              )
            })}
          </div>

          {/* Customer Avatars */}
          <div className="hidden sm:flex items-center justify-center gap-6 pt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-3 backdrop-blur-sm"
                  style={{ borderColor: '#0a1121', background: 'linear-gradient(135deg, rgba(246,137,97,0.5), rgba(254,191,107,0.5))' }}
                ></div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#febf6b' }} />
                ))}
              </div>
              <p className="text-sm text-white/80">
                <span className="font-semibold text-white">{content.socialCount}</span> {content.socialLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/40 flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f68961' }}></div>
        </div>
      </div>
    </section>
  );
}

