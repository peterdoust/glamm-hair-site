'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

/**
 * Turned on with NEXT_PUBLIC_AUTH_FACEBOOK=true once the Facebook provider is
 * enabled in Supabase — until then the button would only lead to an error.
 */
export const FACEBOOK_LOGIN_ENABLED = process.env.NEXT_PUBLIC_AUTH_FACEBOOK === 'true'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

/**
 * "Continue with Facebook" plus an "or use your email" divider, shown above
 * the email form on the login and register pages. Facebook both signs up new
 * customers and logs in returning ones, so the same button serves both pages.
 */
export default function SocialLogin({ next }: { next: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!FACEBOOK_LOGIN_ENABLED) return null

  const continueWithFacebook = async () => {
    setError(null)
    setLoading(true)
    const dest = next.startsWith('/') && !next.startsWith('//') ? next : '/account'
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(dest)}`,
        scopes: 'email',
      },
    })
    // On success the browser is already navigating to Facebook.
    if (error) {
      setError('Facebook sign-in is unavailable right now. Please use your email instead.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">{error}</div>
      )}
      <button
        type="button"
        onClick={continueWithFacebook}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold transition-colors disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FacebookIcon className="h-5 w-5" />}
        Continue with Facebook
      </button>
      <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-text-muted">
        <span className="h-px flex-1 bg-border" />
        or use your email
        <span className="h-px flex-1 bg-border" />
      </div>
    </div>
  )
}
