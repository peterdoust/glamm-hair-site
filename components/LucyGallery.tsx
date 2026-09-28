
import Image from 'next/image'
import { Instagram, Heart, MessageCircle } from 'lucide-react'
import type { InstagramPost } from '@/lib/instagram'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL as PROFILE_URL } from '@/lib/content'

// Shown until the account has posts, or whenever the feed can't be fetched,
// so the section never renders empty.
const fallbackPhotos = [
  '/lucy-photos/_F8A0291-Edit.jpg',
  '/lucy-photos/_F8A0317-Edit.jpg',
  '/lucy-photos/_F8A0376-Edit.jpg',
  '/lucy-photos/_F8A0381-Edit.jpg',
  '/lucy-photos/_F8A0400-Edit.jpg',
  '/lucy-photos/_F8A0427-Edit.jpg',
  '/lucy-photos/_F8A0433-Edit.jpg',
  '/lucy-photos/_F8A0475-Edit.jpg',
].map((src, i): InstagramPost => ({
  id: `fallback-${i + 1}`,
  imageUrl: src,
  permalink: PROFILE_URL,
  caption: `Glamm Hair Extensions Showcase ${i + 1}`,
  likes: null,
  comments: null,
}))

export function LucyGallery({ posts }: { posts: InstagramPost[] }) {
  const photos = posts.length > 0 ? posts : fallbackPhotos

  return (
    <section className="section bg-gradient-to-b from-background to-surface">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/10 to-accent-dark/10 border-2 border-accent/20 mb-6">
            <Instagram className="w-5 h-5 text-accent" />
            <span className="font-bold text-accent uppercase tracking-wider">Follow Our Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See The <span className="gradient-text">Glamm Difference</span>
          </h2>
          
          <p className="text-lg text-text-muted max-w-2xl mx-auto mb-6">
            Real hair, real transformations, real confidence. Join thousands of women who've discovered their perfect look with Glamm.
          </p>
          
          <a 
            href={PROFILE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
          >
            <Instagram className="w-5 h-5" />
            <span>@{INSTAGRAM_HANDLE}</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {photos.map((photo) => (
            <a
              key={photo.id}
              href={photo.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:z-10"
            >
              {/* Image */}
              <Image
                src={photo.imageUrl}
                alt={photo.caption ? photo.caption.slice(0, 120) : 'Glamm Hair Extensions on Instagram'}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Content — real counts only, when Instagram returns them */}
              {(photo.likes !== null || photo.comments !== null) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="flex items-center gap-6 text-white">
                    {photo.likes !== null && (
                      <div className="flex items-center gap-2">
                        <Heart className="w-6 h-6 fill-white" />
                        <span className="font-bold text-lg">{photo.likes.toLocaleString('en-US')}</span>
                      </div>
                    )}
                    {photo.comments !== null && (
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 fill-white" />
                        <span className="font-bold text-lg">{photo.comments.toLocaleString('en-US')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Instagram Icon Badge */}
              <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-6 h-6" />
            <span>Follow Us on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  )
}

