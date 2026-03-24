import { supabase } from '@/lib/supabase'

export async function signInWithMagicLink(email: string) {
  if (!supabase) {
    throw new Error('Supabase no está configurado.')
  }

  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  })
}

export async function signOut() {
  if (!supabase) {
    return
  }

  await supabase.auth.signOut()
}
