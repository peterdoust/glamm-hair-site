export interface Product {
  id: number
  slug: string
  title: string
  description: string
  category: string
  priceMin: number
  priceMax: number
  image: string
  sizes: string[]
  sizes_prices: Record<string, number>
  inStock: boolean
  badge?: string
  features: string[]
  benefits: string[]
}

export interface Category {
  name: string
  slug: string
  count: number
}

export const categories: Category[] = [
  { name: 'Wavy', slug: 'wavy', count: 3 },
  { name: 'Straight', slug: 'straight', count: 2 },
  { name: 'Curly', slug: 'curly', count: 4 },
  { name: 'Closures', slug: 'closures', count: 4 },
]

export const products: Product[] = [
  {
    id: 1,
    slug: 'lace-frontal-13x4',
    title: 'Lace Frontal 13X4',
    description: 'Premium HD lace frontal for a natural hairline. 13x4 size provides ear-to-ear coverage with versatile parting options.',
    category: 'Closures',
    priceMin: 108,
    priceMax: 178,
    image: '/products/16 ST HD 13x4.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"'],
    sizes_prices: {'10"': 108, '12"': 118, '14"': 128, '16"': 144, '18"': 150, '20"': 158, '22"': 170, '24"': 178},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 2,
    slug: 'hd-4x4-closure',
    title: 'HD 4X4 closure',
    description: 'HD lace 4x4 closure for seamless blending. Perfect for creating natural-looking parts and protecting your natural hair.',
    category: 'Closures',
    priceMin: 70,
    priceMax: 128,
    image: '/products/16 ST HD 4x4.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"'],
    sizes_prices: {'10"': 70, '12"': 76, '14"': 85, '16"': 90, '18"': 96, '20"': 110, '22"': 118, '24"': 128},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 3,
    slug: 'hd-5x5-closure',
    title: 'HD 5X5 closure',
    description: 'Larger 5x5 HD lace closure offering more parting space and styling versatility. Undetectable and natural-looking.',
    category: 'Closures',
    priceMin: 78,
    priceMax: 138,
    image: '/products/16 ST HD 5x5.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"'],
    sizes_prices: {'10"': 78, '12"': 90, '14"': 98, '16"': 108, '18"': 118, '20"': 126, '22"': 138},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 4,
    slug: 'hd-2x6-closure',
    title: 'HD 2X6 closure',
    description: 'Slim 2x6 HD lace closure perfect for middle parts. Lightweight and natural with invisible knots.',
    category: 'Closures',
    priceMin: 70,
    priceMax: 106,
    image: '/products/16 ST HD 2x6.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"'],
    sizes_prices: {'10"': 70, '12"': 78, '14"': 84, '16"': 92, '18"': 98, '20"': 106},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 5,
    slug: 'tight-curly',
    title: 'Tight Curly',
    description: 'Tight, bouncy curls with maximum volume. Perfect for achieving a bold, voluminous look with defined ringlets.',
    category: 'Curly',
    priceMin: 44,
    priceMax: 145,
    image: '/products/Baby 16.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    sizes_prices: {'10"': 44, '12"': 48, '14"': 62, '16"': 74, '18"': 80, '20"': 83, '22"': 86, '24"': 112, '26"': 118, '28"': 120, '30"': 136, '32"': 145},
    inStock: true,
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 6,
    slug: 'indian-curl',
    title: 'Indian Curl',
    description: 'Luxurious Indian curls with natural bounce and shine. Soft, silky texture that holds curls beautifully.',
    category: 'Curly',
    priceMin: 44,
    priceMax: 145,
    image: '/products/Indian Curl.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    sizes_prices: {'10"': 44, '12"': 48, '14"': 62, '16"': 74, '18"': 80, '20"': 83, '22"': 86, '24"': 112, '26"': 118, '28"': 120, '30"': 136, '32"': 145},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 7,
    slug: 'natural-wave',
    title: 'Natural Wave',
    description: 'Soft, natural waves for an effortless beachy look. Versatile texture that can be styled straight or curly.',
    category: 'Wavy',
    priceMin: 44,
    priceMax: 145,
    image: '/products/NW.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    sizes_prices: {'10"': 44, '12"': 48, '14"': 62, '16"': 74, '18"': 80, '20"': 83, '22"': 86, '24"': 112, '26"': 118, '28"': 120, '30"': 136, '32"': 145},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
  {
    id: 8,
    slug: 'deep-wave',
    title: 'Deep Wave',
    description: 'Glamorous deep waves with defined S-pattern. Adds volume and movement for a sophisticated look.',
    category: 'Wavy',
    priceMin: 44,
    priceMax: 145,
    image: '/products/DW 16.jpg',
    sizes: ['10"', '12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"', '32"'],
    sizes_prices: {'10"': 44, '12"': 48, '14"': 62, '16"': 74, '18"': 80, '20"': 83, '22"': 86, '24"': 112, '26"': 118, '28"': 120, '30"': 136, '32"': 145},
    inStock: true,
    badge: 'Best Seller',
    features: ['100% Virgin Human Hair', 'Can be dyed and styled', 'Natural shine and softness', 'Tangle-free with proper care'],
    benefits: ['Long-lasting with proper care (6-12 months)', 'Heat-friendly up to 350°F', 'Minimal shedding', 'True to length']
  },
]

