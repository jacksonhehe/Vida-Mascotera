import { useMemo } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import type { UserProfile } from '@/types/content'

type AccessState = 'loading' | 'forbidden' | 'granted' | 'unavailable'

export function useAdminAccess() {
  const { status, profile } = useAuth()

  const state = useMemo<AccessState>(() => {
    if (status === 'loading') {
      return 'loading'
    }

    if (status === 'unavailable') {
      return 'unavailable'
    }

    if (profile?.role === 'admin') {
      return 'granted'
    }

    return 'forbidden'
  }, [profile?.role, status])

  return { state, profile: profile as UserProfile | null }
}
