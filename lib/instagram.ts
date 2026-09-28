/**
 * Instagram feed for the home page gallery, read straight from Instagram's
 * API (Instagram Login) for the account in INSTAGRAM_HANDLE.
 *
 * Set INSTAGRAM_ACCESS_TOKEN in .env.local (and in Vercel) to the account's
 * long-lived token. Those last 60 days, so we refresh it about weekly and keep
 * the fresh copy in app_settings under `instagram_token`; the env value is
 * only the seed. Putting a new token in the env replaces the stored one.
 */
import { supabaseAdmin } from '@/lib/supabase/admin'
import { INSTAGRAM_URL } from '@/lib/content'

export type InstagramPost = {
  id: string
  imageUrl: string
  permalink: string
  caption: string
  likes: number | null
  comments: number | null
}

type MediaItem = {
  id: string
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  caption?: string
  like_count?: number
  comments_count?: number
}

/** What we keep in app_settings: the live token, and the env token it grew from. */
type StoredToken = { token: string; seed: string; refreshedAt: string }

const TOKEN_KEY = 'instagram_token'
const API = 'https://graph.instagram.com'
const FEED_REVALIDATE_SECONDS = 3600
// Well inside the 60-day lifetime, and past the 24h Instagram requires
// before a token can be refreshed at all.
const REFRESH_AFTER_MS = 7 * 24 * 60 * 60 * 1000

/**
 * The token to call Instagram with, refreshed and re-stored when it's more than
 * a week old. Falls back to the env token whenever the database can't be used,
 * so a settings hiccup never blanks the gallery.
 */
async function accessToken(): Promise<string | null> {
  const seed = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
  if (!seed) return null

  try {
    const sb = supabaseAdmin()
    const { data } = await sb.from('app_settings').select('value').eq('key', TOKEN_KEY).maybeSingle()
    const stored = data?.value as StoredToken | undefined
    // A stored token only counts if it came from the token that's in the env now.
    const current = stored?.seed === seed ? stored : null
    if (!current) {
      // First sight of this token: count it as fresh. Instagram won't refresh
      // a token under a day old, so trying now would just fail every render.
      const value: StoredToken = { token: seed, seed, refreshedAt: new Date().toISOString() }
      const { error } = await sb.from('app_settings').upsert({ key: TOKEN_KEY, value }, { onConflict: 'key' })
      if (error) console.error('Saving Instagram token failed:', error)
      return seed
    }
    const token = current.token
    if (Date.now() - Date.parse(current.refreshedAt) < REFRESH_AFTER_MS) return token

    const res = await fetch(
      `${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`,
      { cache: 'no-store' },
    )
    const body = await res.json().catch(() => null)
    if (!res.ok || typeof body?.access_token !== 'string') {
      console.error('Instagram token refresh failed:', res.status, body?.error?.message)
      return token
    }

    const value: StoredToken = { token: body.access_token, seed, refreshedAt: new Date().toISOString() }
    const { error } = await sb.from('app_settings').upsert({ key: TOKEN_KEY, value }, { onConflict: 'key' })
    if (error) console.error('Saving refreshed Instagram token failed:', error)
    return body.access_token
  } catch (err) {
    console.error('Instagram token lookup failed:', err)
    return seed
  }
}

/**
 * The account's latest posts, newest first. Returns [] when no token is set or
 * Instagram can't be reached, so the gallery falls back to its own photos.
 */
export async function getInstagramPosts(limit = 8): Promise<InstagramPost[]> {
  const token = await accessToken()
  if (!token) return []

  const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption,like_count,comments_count'
  try {
    const res = await fetch(
      `${API}/me/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`,
      { next: { revalidate: FEED_REVALIDATE_SECONDS } },
    )
    const body = await res.json().catch(() => null)
    if (!res.ok || !Array.isArray(body?.data)) {
      console.error('Instagram feed fetch failed:', res.status, body?.error?.message)
      return []
    }

    return (body.data as MediaItem[])
      .map((p) => ({
        id: p.id,
        // A video's media_url is the video itself; its thumbnail is the cover frame.
        imageUrl: (p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url) ?? '',
        permalink: p.permalink ?? INSTAGRAM_URL,
        caption: p.caption ?? '',
        likes: typeof p.like_count === 'number' ? p.like_count : null,
        comments: typeof p.comments_count === 'number' ? p.comments_count : null,
      }))
      .filter((p) => p.imageUrl)
      .slice(0, limit)
  } catch (err) {
    console.error('Instagram feed fetch failed:', err)
    return []
  }
}
