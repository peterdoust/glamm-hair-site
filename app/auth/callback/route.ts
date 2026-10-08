import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

/**
 * Return leg of social sign-in (Facebook). Supabase sends the customer back
 * here with a PKCE `?code=`; we swap it for a session cookie, make sure there
 * is a customer profile linked to the account, then continue to `next`.
 *
 * Supabase → Auth → URL Configuration → Redirect URLs must include this
 * route for every origin (localhost and the live domain).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const nextParam = searchParams.get('next') ?? '/account'

  // Only allow same-origin relative redirects (guard against open redirect).
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/account'
  const failed = `/account/login?error=social&next=${encodeURIComponent(next)}`

  // The provider itself reported a problem (e.g. the customer pressed Cancel).
  if (!code) redirect(failed)

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  if (error || !data.user) {
    console.error('Social sign-in exchange failed:', error)
    redirect(failed)
  }

  // Link / create the customer profile, as the email sign-up does (best-effort).
  // Facebook may withhold the email if the customer declined that permission.
  const user = data.user
  const email = user.email?.toLowerCase()
  if (email) {
    const meta = user.user_metadata ?? {}
    const fullName: string = (meta.full_name || meta.name || '').trim()
    const [firstName, ...rest] = fullName ? fullName.split(/\s+/) : []
    const lastName = rest.join(' ')

    const sb = supabaseAdmin()
    const { data: existing } = await sb
      .from('customers')
      .select('first_name, last_name')
      .ilike('email', email)
      .maybeSingle()

    const customerRow: Record<string, string> = { email, user_id: user.id }
    // Don't overwrite a name the customer already gave us.
    if (firstName && !existing?.first_name) customerRow.first_name = firstName
    if (lastName && !existing?.last_name) customerRow.last_name = lastName
    const { error: custErr } = await sb.from('customers').upsert(customerRow, { onConflict: 'email' })
    if (custErr) console.error('Customer link failed (non-fatal):', custErr)
  }

  redirect(next)
}
