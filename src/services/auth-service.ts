import { supabase } from '@/lib/supabase'

export async function signInWithMagicLink(email: string) {
  if (!supabase) {
    throw new Error('El acceso por correo todavia no esta disponible.')
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

export async function getCurrentUserId() {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    return null
  }

  return data.user.id
}
