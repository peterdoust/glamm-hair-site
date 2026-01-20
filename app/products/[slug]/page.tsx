'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { products } from '@/lib/data'
import { ProductGrid } from '@/components/ProductGrid'
import { ShoppingCart, Heart, Check, Star, Truck, Shield, RotateCcw } from 'lucide-react'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products.find((p) => p.slug === slug)

  const [selectedLength, setSelectedLength] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="section container-max text-center">
        <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
        <Link href="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedLength) {
      alert('Please select a length')
      return
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="section">
      <div className="container-max">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B6B6B] mb-8">
          <Link href="/" className="hover:text-[#B76E79]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#B76E79]">Shop</Link>
          <span>/</span>
          <span className="text-[#2C2C2C]">{product.title}</span>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Placeholder */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F5F0EB] to-[#E5DDD5] flex items-center justify-center">
            <svg className="w-24 h-24 text-[#C9B5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {product.badge && (
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-[#B76E79] text-white font-semibold text-sm">
                {product.badge}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-[#B76E79]/10 text-[#B76E79] text-sm font-medium mb-4 capitalize">
              {product.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">{product.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#B76E79] text-[#B76E79]" />
                ))}
              </div>
              <span className="text-[#6B6B6B]">(127 reviews)</span>
            </div>

            <div className="text-3xl font-bold text-[#B76E79] mb-6">${product.priceMin} - ${product.priceMax}</div>

            <p className="text-[#6B6B6B] leading-relaxed mb-8">{product.description}</p>

            {/* Length Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-[#2C2C2C]">Select Length</label>
              <div className="flex flex-wrap gap-2">
                {product.lengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`py-3 px-5 rounded-lg border-2 font-medium transition-all ${
                      selectedLength === length
                        ? 'border-[#B76E79] bg-[#B76E79] text-white'
                        : 'border-gray-200 hover:border-[#B76E79]'
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-semibold mb-3 text-[#2C2C2C]">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-[#B76E79] transition-colors flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-[#B76E79] transition-colors flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <button className="w-14 h-14 rounded-full border-2 border-gray-200 hover:border-[#B76E79] flex items-center justify-center transition-all">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-lg bg-[#F5F0EB]">
                <Truck className="w-6 h-6 text-[#B76E79] mx-auto mb-2" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-[#F5F0EB]">
                <Shield className="w-6 h-6 text-[#B76E79] mx-auto mb-2" />
                <p className="text-xs font-medium">Quality Guarantee</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-[#F5F0EB]">
                <RotateCcw className="w-6 h-6 text-[#B76E79] mx-auto mb-2" />
                <p className="text-xs font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-[#2C2C2C] mb-8">You May Also Like</h2>
            <ProductGrid items={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}

