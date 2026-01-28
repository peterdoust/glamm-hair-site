'use client'

import Link from 'next/link'
import { Product } from '@/lib/data'
import { Heart, ShoppingBag } from 'lucide-react'

interface ProductGridProps {
  items: Product[]
}

export function ProductGrid({ items }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {items.map((product) => (
        <div key={product.id} className="group">
          <Link href={`/products/${product.slug}`}>
            <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden mb-4">
              {/* Placeholder for product image */}
              <div className="absolute inset-0 flex items-center justify-center text-gold">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-rose text-white text-xs font-semibold rounded-full">
                  {product.badge}
                </span>
              )}

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-rose hover:text-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-rose hover:text-white transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>

          <div className="text-center">
            <p className="text-xs text-text-muted uppercase tracking-wide mb-1">{product.category}</p>
            <h3 className="font-semibold text-text mb-2 group-hover:text-rose transition-colors">
              <Link href={`/products/${product.slug}`}>{product.title}</Link>
            </h3>
            <p className="text-rose font-semibold">
              ${product.priceMin} - ${product.priceMax}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

