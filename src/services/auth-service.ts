import { supabase } from '@/lib/supabase'
import type { SupabaseProfileDTO, UserProfile, UserRole } from '@/types/content'

export async function signInWithMagicLink(email: string) {
  if (!supabase) {
    throw new Error('El acceso por correo todavía no está disponible.')
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

export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    return null
  }

  const baseProfile: UserProfile = {
    id: data.user.id,
    email: data.user.email ?? '',
    fullName: data.user.user_metadata.full_name ?? 'Comunidad Vida Mascotera',
    avatarUrl: data.user.user_metadata.avatar_url,
  }

  const profileResult = await supabase.from('profiles').select('*').eq('id', data.user.id).maybeSingle<SupabaseProfileDTO>()
  if (profileResult.error || !profileResult.data) {
    return baseProfile
  }

  return {
    ...baseProfile,
    fullName: profileResult.data.full_name ?? baseProfile.fullName,
    avatarUrl: profileResult.data.avatar_url ?? baseProfile.avatarUrl,
    role: profileResult.data.role ?? 'reader',
  }
}

export async function getCurrentUserRole(): Promise<UserRole | null> {
  const profile = await getCurrentUserProfile()
  return profile?.role ?? null
}
