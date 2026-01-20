import Link from 'next/link'
import { Play, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Prepare Your Hair',
    description: 'Start with clean, dry hair. Brush through to remove any tangles. Section your hair where you want to apply the extensions.',
    tips: ['Use a clarifying shampoo', 'Avoid heavy conditioners near roots', 'Let hair dry completely']
  },
  {
    number: '02',
    title: 'Section & Clip',
    description: 'Create a horizontal part about 1-2 inches from your hairline. Clip the top section up and out of the way.',
    tips: ['Use sectioning clips', 'Keep sections neat and even', 'Work from bottom to top']
  },
  {
    number: '03',
    title: 'Apply Extensions',
    description: 'Open the clips on your extension weft. Position close to your scalp (not touching) and snap the clips closed.',
    tips: ['Start with widest weft at back', 'Leave 1 inch from hairline', 'Ensure clips are secure']
  },
  {
    number: '04',
    title: 'Blend & Style',
    description: 'Release the top section of your hair. Gently brush through to blend your natural hair with the extensions.',
    tips: ['Use a wide-tooth comb', 'Curl ends together for seamless look', 'Add texturizing spray if needed']
  }
]

const careInstructions = [
  { title: 'Washing', desc: 'Wash 1-2 times per week with sulfate-free shampoo. Always detangle before washing.' },
  { title: 'Drying', desc: 'Pat dry gently with a microfiber towel. Air dry when possible, or use low heat.' },
  { title: 'Styling', desc: 'Always use heat protectant. Keep styling tools under 350°F for longevity.' },
  { title: 'Storage', desc: 'Store in provided satin bag. Brush before storing to prevent tangling.' },
  { title: 'Sleeping', desc: 'Remove clip-ins before bed. For semi-permanent, braid loosely or use silk pillowcase.' },
  { title: 'Swimming', desc: 'Wet hair with clean water before pool/ocean. Apply leave-in conditioner for protection.' }
]

export default function HowToUsePage() {
  return (
    <div className="section">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">How To Use Your Extensions</h1>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Follow our simple step-by-step guide to achieve salon-quality results at home
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-20">
          <div className="relative h-[300px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#2C2C2C] to-[#1a1a1a] flex items-center justify-center">
            <div className="text-center">
              <button className="w-20 h-20 bg-[#B76E79] rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-[#9B5A63] transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </button>
              <p className="text-white text-lg font-medium">Watch Our Tutorial Video</p>
              <p className="text-white/60 text-sm">3 minutes • Step-by-step guide</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-[#2C2C2C] text-center mb-12">Application Steps</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl font-bold text-[#B76E79]/20">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">{step.title}</h3>
                    <p className="text-[#6B6B6B]">{step.description}</p>
                  </div>
                </div>
                <div className="pl-16 space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <CheckCircle className="w-4 h-4 text-[#B76E79]" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care Instructions */}
        <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F5F0EB] rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-[#2C2C2C] text-center mb-8">Care & Maintenance</h2>
          <p className="text-center text-[#6B6B6B] max-w-2xl mx-auto mb-12">
            Proper care will keep your extensions looking beautiful for 12-18 months
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careInstructions.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-[#2C2C2C] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-[#2C2C2C] mb-4">Ready to Get Started?</h3>
          <p className="text-[#6B6B6B] mb-6">Shop our collection and transform your look today</p>
          <Link href="/shop" className="btn btn-primary btn-lg">
            Shop Extensions
          </Link>
        </div>
      </div>
    </div>
  )
}

