import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const blogPosts = [
  {
    slug: 'how-to-choose-perfect-extensions',
    title: 'How to Choose the Perfect Hair Extensions for Your Hair Type',
    excerpt: 'Finding the right extensions starts with understanding your natural hair. Learn about texture matching, color selection, and which style works best for you.',
    date: 'January 15, 2026',
    readTime: '5 min read',
    category: 'Guides',
    image: '/blog/choose-extensions.jpg'
  },
  {
    slug: 'extension-care-tips',
    title: '10 Essential Tips for Maintaining Your Hair Extensions',
    excerpt: 'Keep your extensions looking salon-fresh with these expert care tips. From washing techniques to storage solutions.',
    date: 'January 10, 2026',
    readTime: '7 min read',
    category: 'Care Tips',
    image: '/blog/care-tips.jpg'
  },
  {
    slug: 'wavy-vs-straight',
    title: 'Wavy vs Straight: Which Extension Style is Right for You?',
    excerpt: 'Explore the pros and cons of each style and discover which one complements your lifestyle and look.',
    date: 'January 5, 2026',
    readTime: '4 min read',
    category: 'Style Guide',
    image: '/blog/wavy-straight.jpg'
  },
  {
    slug: 'celebrity-extension-trends',
    title: 'Celebrity Hair Extension Trends for 2026',
    excerpt: 'Get inspired by the hottest celebrity hair looks and learn how to recreate them with our premium extensions.',
    date: 'December 28, 2025',
    readTime: '6 min read',
    category: 'Trends',
    image: '/blog/celebrity-trends.jpg'
  },
  {
    slug: 'first-time-extensions',
    title: 'First Time Getting Extensions? Here\'s What to Expect',
    excerpt: 'A complete beginner\'s guide to hair extensions - from consultation to installation to aftercare.',
    date: 'December 20, 2025',
    readTime: '8 min read',
    category: 'Guides',
    image: '/blog/first-time.jpg'
  },
  {
    slug: 'color-matching-guide',
    title: 'The Ultimate Color Matching Guide for Hair Extensions',
    excerpt: 'Learn how to perfectly match your extensions to your natural hair color for a seamless, natural look.',
    date: 'December 15, 2025',
    readTime: '5 min read',
    category: 'Guides',
    image: '/blog/color-matching.jpg'
  }
]

export default function BlogPage() {
  return (
    <div className="section">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">Glamm Hair Blog</h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Expert tips, styling guides, and the latest trends in hair extensions
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#B76E79]/20 to-[#C9B5A0]/20">
            <div className="absolute inset-0 flex items-center">
              <div className="container-max">
                <div className="max-w-xl">
                  <span className="inline-block px-4 py-1 bg-[#B76E79] text-white text-sm font-semibold rounded-full mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-[#6B6B6B] text-lg mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-6">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{blogPosts[0].date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{blogPosts[0].readTime}</span>
                  </div>
                  <Link href={`/blog/${blogPosts[0].slug}`} className="btn btn-primary">
                    Read Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-[#F5F0EB] to-[#E5DDD5] flex items-center justify-center">
                <svg className="w-16 h-16 text-[#C9B5A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-[#B76E79]/10 text-[#B76E79] text-xs font-semibold rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="font-bold text-[#2C2C2C] text-lg mb-2 group-hover:text-[#B76E79] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-[#6B6B6B] text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[#888]">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

