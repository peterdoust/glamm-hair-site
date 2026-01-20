'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/how-to-use', label: 'How To Use' },
    { href: '/faq', label: 'FAQ' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-2xl font-bold tracking-tight transition-colors ${
              scrolled ? 'text-[#2C2C2C]' : 'text-white'
            }`}>
              GLAMM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors text-sm tracking-wide hover:text-[#f68961] ${
                  scrolled ? 'text-[#2C2C2C]' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3">
            <button
              className={`p-2 rounded-full transition-all ${
                scrolled
                  ? 'text-[#2C2C2C] hover:bg-[#FAF8F5]'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/wishlist"
              className={`p-2 rounded-full transition-all ${
                scrolled
                  ? 'text-[#2C2C2C] hover:bg-[#FAF8F5]'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className={`p-2 rounded-full transition-all relative ${
                scrolled
                  ? 'text-[#2C2C2C] hover:bg-[#FAF8F5]'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-full transition-all ${
                scrolled
                  ? 'text-[#2C2C2C] hover:bg-[#FAF8F5]'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-6 pt-4 border-t border-[#EAE3D9] bg-white rounded-b-2xl shadow-lg">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-[#2C2C2C] hover:text-[#f68961] hover:bg-[#FAF8F5] font-medium rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

