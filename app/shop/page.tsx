'use client'

import { useState, useMemo } from 'react'
import { products, categories } from '@/lib/data'
import { ProductGrid } from '@/components/ProductGrid'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Price filter
    filtered = filtered.filter((product) =>
      product.priceMin >= priceRange[0] && product.priceMax <= priceRange[1]
    )

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceMin - b.priceMin)
        break
      case 'price-high':
        filtered.sort((a, b) => b.priceMax - a.priceMax)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, priceRange, sortBy])

  return (
    <>
      <div className="section">
        <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Shop All Extensions</h1>
          <p className="section-sub max-w-2xl mx-auto">
            Browse our complete collection of premium hair extensions
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-border bg-white text-sm outline-none focus:border-accent transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-surface rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 rounded-full border-2 border-border bg-white text-sm outline-none focus:border-accent transition-colors cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn btn-secondary flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="grid md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Filters</h3>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Category</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-accent text-white'
                        : 'hover:bg-surface'
                    }`}
                  >
                    All Products ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.slug
                          ? 'bg-accent text-white'
                          : 'hover:bg-surface'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setPriceRange([0, 200])
                  setSortBy('featured')
                }}
                className="w-full btn btn-secondary text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-muted">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductGrid items={filteredProducts} />
            ) : (
              <div className="text-center py-16">
                <p className="text-text-muted text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setPriceRange([0, 200])
                  }}
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

