'use client'

import { useState, useMemo } from 'react'
import { products, categories } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { Search, SlidersHorizontal, X, Sparkles, Scissors, ChevronRight, Star, Ruler, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'wefted' | 'bulk'>('wefted')

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
      {/* Hero Promo Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-background to-accent/10 py-16 md:py-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Featured Image */}
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                alt="Premium Hair Extensions Collection"
                src="/lucy-photos/_F8A0400-Edit.jpg"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute top-8 left-8 px-6 py-3 rounded-full bg-white/95 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent fill-accent" />
                  <span className="font-bold text-accent uppercase tracking-wider text-sm">New Arrivals</span>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Luxury Collection</h3>
                <p className="text-white/90 text-lg">Premium virgin hair extensions</p>
              </div>
            </div>

            {/* Promo Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-accent/30">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-wider">Limited Time Offer</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="block text-text mb-2">Get 20% Off</span>
                <span className="block bg-gradient-to-r from-accent via-accent-dark to-accent bg-clip-text text-transparent">Your First Order</span>
              </h2>
              <p className="text-xl text-text/80 leading-relaxed">
                Transform your look with our premium collection of 100% virgin human hair extensions.
                <span className="block mt-2 font-semibold text-accent">Free shipping on orders over $100.</span>
              </p>
              <ul className="space-y-4 pt-4">
                {['Premium Quality - 100% Virgin Human Hair', 'Natural Look - Blends Seamlessly', 'Long Lasting - Up to 12 Months', 'Easy Application - Professional Results'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-accent/10">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                    </div>
                    <span className="text-text/90 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 pt-6">
                <Link href="/shop" className="group px-8 py-4 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-bold text-lg shadow-xl hover:shadow-accent/50 transition-all duration-300 hover:scale-105 flex items-center gap-3">
                  <span>Shop Now</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="px-8 py-4 rounded-full border-2 border-accent/60 text-accent font-bold text-lg hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-3">
                  <span>Get Expert Advice</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="container-max">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="section-title">Shop All Extensions</h1>
            <p className="section-sub max-w-2xl mx-auto">
              Browse our complete collection of premium hair extensions
            </p>
          </div>

          {/* Category Tabs */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveTab('wefted')}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden ${
                activeTab === 'wefted'
                  ? 'border-accent bg-gradient-to-br from-accent/5 to-accent-dark/10 shadow-lg'
                  : 'border-gray-200 hover:border-accent/50 hover:shadow-md bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === 'wefted' ? 'bg-gradient-to-br from-accent to-accent-dark' : 'bg-gray-100 group-hover:bg-accent/20'} transition-colors`}>
                    <Sparkles className={`w-6 h-6 ${activeTab === 'wefted' ? 'text-white' : 'text-accent'}`} />
                  </div>
                  {activeTab === 'wefted' && <span className="px-3 py-1 text-xs font-bold text-white bg-accent rounded-full">Active</span>}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${activeTab === 'wefted' ? 'text-accent' : 'text-text group-hover:text-accent'} transition-colors`}>Wefted Hair</h3>
                <p className="text-sm text-text-muted mb-4">Premium bundles & closures for sew-ins, quick weaves, and clip-ins</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Wavy', 'Straight', 'Curly', 'Closures'].map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded-full text-text-muted">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-muted">{products.length} Products</span>
                  <ChevronRight className={`w-5 h-5 ${activeTab === 'wefted' ? 'text-accent' : 'text-gray-400 group-hover:text-accent'} transition-colors`} />
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('bulk')}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden ${
                activeTab === 'bulk'
                  ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-lg'
                  : 'border-gray-200 hover:border-amber-400/50 hover:shadow-md bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full opacity-50"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === 'bulk' ? 'bg-amber-100' : 'bg-gray-100 group-hover:bg-amber-100'} transition-colors`}>
                    <Scissors className="w-6 h-6 text-amber-600" />
                  </div>
                  {activeTab === 'bulk' && <span className="px-3 py-1 text-xs font-bold text-white bg-amber-500 rounded-full">Active</span>}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${activeTab === 'bulk' ? 'text-amber-600' : 'text-text group-hover:text-amber-600'} transition-colors`}>Bulk Hair</h3>
                <p className="text-sm text-text-muted mb-4">Loose hair for braiding, twists, locs & custom styling</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Body Wave', '8 Colors'].map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-amber-100 rounded-full text-amber-700">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-text-muted">8 Products</span>
                  <ChevronRight className={`w-5 h-5 ${activeTab === 'bulk' ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600'} transition-colors`} />
                </div>
              </div>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                placeholder={`Search ${activeTab} products...`}
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
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn btn-secondary flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          <div className="grid md:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="card p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                      setPriceRange([0, 200])
                      setSortBy('featured')
                    }}
                    className="text-xs text-accent hover:text-accent-dark transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Category Type */}
                <div className="mb-4">
                  <button
                    onClick={() => setActiveTab('wefted')}
                    className={`w-full flex items-center gap-2 mb-3 p-2 rounded-lg transition-all ${activeTab === 'wefted' ? 'bg-accent/10' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'wefted' ? 'bg-gradient-to-br from-accent to-accent-dark' : 'bg-gray-100'}`}>
                      <Sparkles className={`w-4 h-4 ${activeTab === 'wefted' ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className={`font-semibold text-sm ${activeTab === 'wefted' ? 'text-accent' : 'text-text'}`}>Wefted Hair</h4>
                      <span className="text-xs text-text-muted">{products.length} products</span>
                    </div>
                    {activeTab === 'wefted' && <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-accent rounded-full">Active</span>}
                  </button>

                  {activeTab === 'wefted' && (
                    <div className="space-y-1 pl-2 border-l-2 border-accent/30 ml-4">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm ${
                          selectedCategory === 'all'
                            ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-md'
                            : 'hover:bg-gray-50 text-text-muted hover:text-text'
                        }`}
                      >
                        <span>All Wefted</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === 'all' ? 'bg-white/20' : 'bg-gray-100'}`}>{products.length}</span>
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.slug}
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm ${
                            selectedCategory === cat.slug
                              ? 'bg-gradient-to-r from-accent to-accent-dark text-white shadow-md'
                              : 'hover:bg-gray-50 text-text-muted hover:text-text'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.slug ? 'bg-white/20' : 'bg-gray-100'}`}>{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => setActiveTab('bulk')}
                    className={`w-full flex items-center gap-2 mb-3 p-2 rounded-lg transition-all ${activeTab === 'bulk' ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'bulk' ? 'bg-amber-100' : 'bg-gray-100'}`}>
                      <Scissors className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className={`font-semibold text-sm ${activeTab === 'bulk' ? 'text-amber-600' : 'text-text'}`}>Bulk Hair</h4>
                      <span className="text-xs text-text-muted">8 products</span>
                    </div>
                    {activeTab === 'bulk' && <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-amber-500 rounded-full">Active</span>}
                  </button>
                </div>

                <div className="border-t border-gray-100 mb-6"></div>

                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-lg">💰</span>Price Range
                  </h4>
                  <div className="space-y-4">
                    <div className="relative pt-1">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">${priceRange[0]}</span>
                      <span className="text-gray-400">—</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <p className="text-xs text-accent">✨ Premium 100% virgin human hair with free shipping on orders over $150</p>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <p className="text-text-muted">
                  Showing <span className="font-semibold text-text">{filteredProducts.length}</span> of {products.length} products
                </p>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  {activeTab === 'wefted' ? 'Wefted Hair' : 'Bulk Hair'}
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
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

