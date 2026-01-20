'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Search } from 'lucide-react'

const faqs = [
  {
    category: 'Products',
    questions: [
      { q: 'What type of hair are your extensions made from?', a: 'All our extensions are made from 100% virgin human hair. We never use synthetic fibers or processed hair. This ensures the most natural look and feel.' },
      { q: 'How long do the extensions last?', a: 'With proper care, our extensions can last 12-18 months. We recommend using sulfate-free products and avoiding excessive heat styling.' },
      { q: 'Can I color or heat style the extensions?', a: 'Yes! Since our extensions are 100% human hair, you can color, bleach, curl, or straighten them just like your natural hair.' },
    ]
  },
  {
    category: 'Ordering & Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. All orders over $100 qualify for free shipping.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide! International shipping typically takes 7-14 business days depending on location.' },
      { q: 'Can I track my order?', a: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email to monitor your delivery.' },
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee. Extensions must be unused, in original packaging, and in resalable condition.' },
      { q: 'How do I start a return?', a: 'Contact our support team at support@glammhair.com with your order number. We\'ll provide a prepaid return label.' },
    ]
  },
  {
    category: 'Care & Maintenance',
    questions: [
      { q: 'How do I wash my extensions?', a: 'Use lukewarm water and sulfate-free shampoo. Gently wash from root to tip, avoiding rubbing. Apply conditioner to the mid-lengths and ends.' },
      { q: 'How should I store my extensions?', a: 'Store in a cool, dry place away from direct sunlight. Use the satin bag provided or hang on an extension hanger.' },
    ]
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
              item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="section">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Find answers to common questions about our hair extensions, orders, and care tips.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 bg-white text-base outline-none focus:border-[#B76E79] transition-colors"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {filteredFaqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-4 pb-2 border-b-2 border-[#B76E79]">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`
                  const isOpen = openIndex === key
                  return (
                    <div key={qIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-[#2C2C2C] pr-4">{item.q}</span>
                        <ChevronDown className={`w-5 h-5 text-[#B76E79] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-[#6B6B6B] border-t border-gray-100 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-16 text-center p-8 bg-gradient-to-r from-[#B76E79]/10 to-[#C9B5A0]/10 rounded-2xl">
          <h3 className="text-2xl font-bold text-[#2C2C2C] mb-3">Still Have Questions?</h3>
          <p className="text-[#6B6B6B] mb-6">Our team is here to help you find the perfect extensions.</p>
          <Link href="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

