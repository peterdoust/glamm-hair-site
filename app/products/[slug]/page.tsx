'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { products } from '@/lib/data'
import { ProductGrid } from '@/components/ProductGrid'
import { ShoppingCart, Heart, Check, Star, Truck, Shield, RotateCcw } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products.find((p) => p.slug === slug)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [selectedSize, setSelectedSize] = useState('')
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

  const inWishlist = isInWishlist(product.id)
  const selectedPrice = selectedSize && product.sizes_prices ? product.sizes_prices[selectedSize] : product.priceMin

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: `$${selectedPrice}`,
      priceMin: product.priceMin,
      priceMax: product.priceMax,
      image: product.image,
      category: product.category,
      slug: product.slug,
      size: selectedSize,
      selectedPrice: selectedPrice,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        title: product.title,
        price: `$${product.priceMin} - $${product.priceMax}`,
        priceMin: product.priceMin,
        priceMax: product.priceMax,
        image: product.image,
        category: product.category,
        slug: product.slug,
      })
    }
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="section">
      <div className="container-max">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-accent">Shop</Link>
          <span>/</span>
          <span className="text-text">{product.title}</span>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-surface to-border">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-accent text-white font-semibold text-sm">
                {product.badge}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4 capitalize">
              {product.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">{product.title}</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-text-muted">(127 reviews)</span>
            </div>

            <div className="text-3xl font-bold text-accent mb-6">
              {selectedSize && product.sizes_prices ? (
                <span>${product.sizes_prices[selectedSize]}</span>
              ) : (
                <span>${product.priceMin} - ${product.priceMax}</span>
              )}
            </div>

            <p className="text-text-muted leading-relaxed mb-8">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-text">Select Length</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-5 rounded-lg border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white'
                        : 'border-gray-200 hover:border-accent'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-semibold mb-3 text-text">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-accent transition-colors flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-accent transition-colors flex items-center justify-center font-bold"
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

              <button
                onClick={handleWishlistToggle}
                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                  inWishlist ? 'border-accent bg-accent/10' : 'border-gray-200 hover:border-accent'
                }`}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-accent text-accent' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-lg bg-surface">
                <Truck className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-surface">
                <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium">Quality Guarantee</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-surface">
                <RotateCcw className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-xs font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center text-text mb-8">You May Also Like</h2>
            <ProductGrid items={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}

