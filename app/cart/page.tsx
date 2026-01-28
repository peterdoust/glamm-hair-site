'use client'

import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  // For now, show empty cart state
  return (
    <div className="section">
      <div className="container-max max-w-2xl text-center py-20">
        <ShoppingBag className="w-24 h-24 text-text-muted mx-auto mb-6 opacity-50" />
        <h1 className="text-4xl font-bold text-text mb-4">Your Cart is Empty</h1>
        <p className="text-text-muted mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors">
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

