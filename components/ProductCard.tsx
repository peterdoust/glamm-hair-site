'use client';

import Link from 'next/link';
import { Star, Check, Truck, Package } from 'lucide-react';
import { Product } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const sizeCount = product.sizes?.length || 0;
  
  return (
    <div className="group card overflow-hidden hover:shadow-large transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#FAF8F5] to-[#EAE3D9]">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#f68961] text-white text-xs font-bold rounded-full">
            {product.badge}
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-xs font-medium rounded-full border border-[#EAE3D9]">
          {product.category}
        </div>

        {/* Product Image with Gradient Placeholder */}
        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#EAE3D9] group-hover:scale-105 transition-transform duration-500">
          {product.title.charAt(0)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#f68961] text-[#f68961]" />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-[#2C2C2C] mb-2 group-hover:text-[#f68961] transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mb-4">
          <span className="text-sm text-[#6B6B6B]">Starting at</span>
          <p className="text-2xl font-bold text-[#2C2C2C]">${product.priceMin}.00</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.inStock && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
              <Check className="w-3 h-3" />
              In Stock
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            <Truck className="w-3 h-3" />
            Free Ship
          </span>
          {sizeCount > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
              <Package className="w-3 h-3" />
              {sizeCount} Sizes
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={`/products/${product.slug}`}
          className="block w-full text-center py-3 rounded-full bg-[#f68961] text-white font-semibold hover:bg-[#e5764d] transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

