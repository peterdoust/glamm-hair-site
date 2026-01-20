import Link from 'next/link'
import { Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#EAE3D9]" style={{ background: 'linear-gradient(135deg, #0a1121, #1a2744)' }}>
      {/* Main Footer */}
      <div className="container-max py-12 grid gap-8 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="font-bold text-xl text-white mb-3">GLAMM</div>
          <p className="text-white/70 max-w-xs text-sm leading-relaxed">
            Premium hair extensions shipped nationwide. Clean design, effortless installation, and natural finish.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.instagram.com/glammhair_extenions"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-[#f68961] transition-all duration-300 group"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
          </div>
          <a
            href="https://www.instagram.com/glammhair_extenions"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#f68961] transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @glammhair_extenions
          </a>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Shop</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/shop?category=wavy" className="hover:text-[#f68961] transition-colors">Wavy</Link></li>
            <li><Link href="/shop?category=straight" className="hover:text-[#f68961] transition-colors">Straight</Link></li>
            <li><Link href="/shop?category=curly" className="hover:text-[#f68961] transition-colors">Curly</Link></li>
            <li><Link href="/shop?category=closures" className="hover:text-[#f68961] transition-colors">Closures</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Company</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-[#f68961] transition-colors">About</Link></li>
            <li><Link href="/how-to-use" className="hover:text-[#f68961] transition-colors">Care & Tutorials</Link></li>
            <li><Link href="/faq" className="hover:text-[#f68961] transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-[#f68961] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Connect</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://www.instagram.com/glammhair_extenions"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f68961] transition-colors flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow on Instagram
              </a>
            </li>
            <li><Link href="/return-policy" className="hover:text-[#f68961] transition-colors">Return Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-[#f68961] transition-colors">Shipping Info</Link></li>
            <li><Link href="/contact" className="hover:text-[#f68961] transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Glamm Hair Extensions. All rights reserved.
      </div>
    </footer>
  )
}

