'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

const VISIBLE_MS = 5000

/**
 * "Added to cart" pop-up. Rendered once by CartProvider and shown whenever
 * addToCart runs: pinned to the bottom of the screen on phones (thumb reach)
 * and to the top-right under the header on larger screens.
 */
export default function CartToast() {
  const { lastAdded, dismissAddedNotice, getCartCount } = useCart()

  useEffect(() => {
    if (!lastAdded) return
    const t = setTimeout(dismissAddedNotice, VISIBLE_MS)
    return () => clearTimeout(t)
    // Restart the timer for every add, including repeat adds of the same item.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAdded?.key])

  if (!lastAdded) return null
  const { item } = lastAdded
  const count = getCartCount()

  return (
    <div
      key={lastAdded.key}
      role="status"
      aria-live="polite"
      className="fixed z-[100] inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-auto sm:top-24 sm:right-6 sm:w-96 animate-fade-in-up"
    >
      <div className="rounded-2xl bg-white shadow-2xl border border-accent/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="flex items-center gap-2 font-bold text-green-700">
            <CheckCircle2 className="w-5 h-5" />
            Added to cart
          </p>
          <button
            onClick={dismissAddedNotice}
            aria-label="Close"
            className="p-1 rounded-lg text-text-muted hover:bg-surface hover:text-text"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-surface">
            <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-text line-clamp-2 leading-snug">{item.title}</p>
            <p className="text-text-muted mt-0.5">
              {item.size} · Qty {item.quantity} · ${(item.selectedPrice * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/cart"
            onClick={dismissAddedNotice}
            className="py-2.5 rounded-xl border-2 border-accent text-accent text-sm font-semibold text-center hover:bg-accent/10 transition-colors"
          >
            View Cart ({count})
          </Link>
          <Link
            href="/checkout"
            onClick={dismissAddedNotice}
            className="py-2.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
