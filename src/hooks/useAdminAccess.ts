import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '@/lib/supabase'
import { getCurrentUserProfile, signInWithMagicLink } from '@/services/auth-service'
import type { UserProfile } from '@/types/content'

type AccessState = 'loading' | 'login' | 'forbidden' | 'granted' | 'unavailable'

export function useAdminAccess() {
  const [state, setState] = useState<AccessState>('loading')
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setState('unavailable')
      return
    }

    void getCurrentUserProfile()
      .then((currentProfile) => {
        if (!currentProfile) {
          setState('login')
          return
        }

        setProfile(currentProfile)
        setState(currentProfile.role === 'admin' ? 'granted' : 'forbidden')
      })
      .catch(() => {
        setState('unavailable')
      })
  }, [])

  async function requestAccess(email: string) {
    await signInWithMagicLink(email)
  }

  return { state, profile, requestAccess }
}
