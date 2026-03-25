import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import {
  getCurrentUserProfile,
  signInWithPassword,
  signOut as signOutService,
  signUpWithPassword,
} from '@/services/auth-service'
import { useAppStore } from '@/store/app-store'
import type { UserProfile, UserRole } from '@/types/content'

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'unavailable'

interface AuthContextValue {
  status: AuthStatus
  profile: UserProfile | null
  role: UserRole | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (payload: { fullName: string; email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<UserProfile | null>
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function resolveProfile(session: Session | null) {
  if (!session?.user) {
    return null
  }

  return getCurrentUserProfile()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(isSupabaseConfigured ? 'loading' : 'unavailable')
  const [profile, setProfileState] = useState<UserProfile | null>(null)
  const setStoreProfile = useAppStore((state) => state.setProfile)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setStoreProfile(null)
      setStatus('unavailable')
      return
    }

    let isMounted = true

    const applyProfile = async (session: Session | null) => {
      const nextProfile = await resolveProfile(session)
      if (!isMounted) {
        return
      }

      setProfileState(nextProfile)
      setStoreProfile(nextProfile)
      setStatus(nextProfile ? 'authenticated' : 'unauthenticated')
    }

    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          throw error
        }

        return applyProfile(data.session)
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setProfileState(null)
        setStoreProfile(null)
        setStatus('unauthenticated')
      })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      void applyProfile(session).catch(() => {
        if (!isMounted) {
          return
        }

        setProfileState(null)
        setStoreProfile(null)
        setStatus('unauthenticated')
      })
    })

    return () => {
      isMounted = false
      subscription.subscription.unsubscribe()
    }
  }, [setStoreProfile])

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      profile,
      role: profile?.role ?? null,
      isAuthenticated: status === 'authenticated',
      signIn: async (email: string, password: string) => {
        await signInWithPassword(email, password)
      },
      signUp: async ({ fullName, email, password }) => {
        await signUpWithPassword(email, password, fullName)
      },
      signOut: async () => {
        await signOutService()
        setProfileState(null)
        setStoreProfile(null)
        setStatus(isSupabaseConfigured ? 'unauthenticated' : 'unavailable')
      },
      refreshProfile: async () => {
        const nextProfile = await getCurrentUserProfile()
        setProfileState(nextProfile)
        setStoreProfile(nextProfile)
        setStatus(nextProfile ? 'authenticated' : 'unauthenticated')
        return nextProfile
      },
    }),
    [profile, setStoreProfile, status],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return context
}
