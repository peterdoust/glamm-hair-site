import Link from 'next/link'
import { Award, Heart, Shield, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[400px] overflow-hidden bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a]">
        <div className="absolute inset-0 flex items-center">
          <div className="container-max">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Our Story
              </h1>
              <p className="text-2xl text-white/90 font-light leading-relaxed">
                Empowering women with premium hair extensions since 2015
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F5] via-[#F5F0EB] to-[#B76E79]/5">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2C2C2C] mb-4">
              Why Choose Glamm Hair
            </h2>
            <p className="text-xl text-[#6B6B6B] max-w-3xl mx-auto">
              We're committed to providing the highest quality hair extensions and exceptional customer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Premium Quality', description: '100% virgin human hair sourced ethically from trusted suppliers' },
              { icon: Heart, title: 'Customer First', description: 'Dedicated support team ready to help you every step of the way' },
              { icon: Shield, title: 'Guaranteed', description: '30-day money-back guarantee on all our products' },
              { icon: Star, title: 'Trusted Brand', description: 'Over 5,000 happy customers and counting' }
            ].map((value, i) => (
              <div key={i} className="group text-center p-8 rounded-2xl bg-white border-2 border-[#B76E79]/20 hover:border-[#B76E79]/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="mb-6 p-4 rounded-full bg-[#B76E79]/10 w-fit mx-auto">
                  <value.icon className="w-10 h-10 text-[#B76E79]" />
                </div>
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">{value.title}</h3>
                <p className="text-[#6B6B6B]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#F5F0EB] to-[#E5DDD5] flex items-center justify-center">
              <span className="text-6xl">✨</span>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#2C2C2C] leading-tight">
                Crafted with Care, Designed for You
              </h2>
              <p className="text-xl text-[#6B6B6B] leading-relaxed">
                Every strand of hair is carefully selected and processed to ensure you receive the highest quality extensions that look and feel natural.
              </p>
              <ul className="space-y-4">
                {['Hand-selected premium virgin hair', 'Ethically sourced from trusted suppliers', 'Rigorous quality control process', 'Natural texture and shine', 'Long-lasting durability'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 p-1 rounded-full bg-[#B76E79]/10">
                      <Star className="w-4 h-4 text-[#B76E79] fill-[#B76E79]" />
                    </div>
                    <span className="text-[#6B6B6B] font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/shop" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#B76E79] text-white font-bold text-lg shadow-xl hover:bg-[#9B5A63] transition-all duration-300">
                <span>Explore Our Collection</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-[#B76E79]/10 via-[#B76E79]/5 to-[#FAF8F5]">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#2C2C2C] leading-tight">
              Ready to Transform Your Look?
            </h2>
            <p className="text-xl text-[#6B6B6B]">
              Join thousands of satisfied customers who trust Glamm Hair for their hair extension needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/shop" className="px-10 py-5 rounded-full bg-[#B76E79] text-white font-bold text-lg shadow-xl hover:bg-[#9B5A63] transition-all duration-300">
                Shop Now
              </Link>
              <Link href="/contact" className="px-10 py-5 rounded-full border-2 border-[#B76E79]/60 text-[#B76E79] font-bold text-lg hover:bg-[#B76E79] hover:text-white transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

