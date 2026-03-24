import { useEffect, useState, useEffectEvent } from 'react'
import { getFavorites, getStoredPreferences } from '@/lib/indexed-db'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { getArticles, getProducts } from '@/services/content-service'
import { persistFavoriteIds, persistPreferences, syncPendingChanges } from '@/services/offline-sync-service'
import { useAppStore } from '@/store/app-store'
import type { Article, ProductRecommendation } from '@/types/content'

export function useAppBootstrap() {
  const [articles, setArticles] = useState<Article[]>([])
  const [products, setProducts] = useState<ProductRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const favorites = useAppStore((state) => state.favorites)
  const preferences = useAppStore((state) => state.preferences)
  const hydrated = useAppStore((state) => state.hydrated)
  const setOffline = useAppStore((state) => state.setOffline)
  const setProfile = useAppStore((state) => state.setProfile)
  const setFavorites = useAppStore((state) => state.setFavorites)
  const setPreferences = useAppStore((state) => state.setPreferences)

  const handleConnectivity = useEffectEvent(async () => {
    const offline = !navigator.onLine
    setOffline(offline)

    if (!offline) {
      try {
        await syncPendingChanges()
      } catch {
        setError('Recuperamos la conexion, pero aun estamos terminando de sincronizar tus cambios.')
      }
    }
  })

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        const [articleData, productData] = await Promise.all([getArticles(), getProducts()])
        setArticles(articleData)
        setProducts(productData)
      } catch {
        setError('No pudimos actualizar el contenido en este momento. Seguiremos mostrando lo disponible.')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return
    }

    void Promise.all([getFavorites(), getStoredPreferences()])
      .then(([storedFavorites, storedPreferences]) => {
        if (storedFavorites.length) {
          setFavorites(storedFavorites)
        }

        if (storedPreferences) {
          setPreferences(storedPreferences)
        }
      })
      .catch(() => {
        setError((current) => current ?? 'Algunos datos guardados localmente no pudieron restaurarse por completo.')
      })
  }, [hydrated, setFavorites, setPreferences])

  useEffect(() => {
    void persistFavoriteIds(favorites).catch(() => {
      setError('Guardaremos tus favoritos en cuanto la conexion este mas estable.')
    })
  }, [favorites])

  useEffect(() => {
    void persistPreferences(preferences).catch(() => {
      setError('Tus preferencias se conservaran localmente hasta que podamos sincronizarlas.')
    })
  }, [preferences])

  useEffect(() => {
    window.addEventListener('online', handleConnectivity)
    window.addEventListener('offline', handleConnectivity)
    void handleConnectivity()

    return () => {
      window.removeEventListener('online', handleConnectivity)
      window.removeEventListener('offline', handleConnectivity)
    }
  }, [handleConnectivity])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return
    }

    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!data.user) {
          return
        }

        setProfile({
          id: data.user.id,
          email: data.user.email ?? '',
          fullName: data.user.user_metadata.full_name ?? 'Comunidad Vida Mascotera',
          avatarUrl: data.user.user_metadata.avatar_url,
        })
      })
      .catch(() => {
        setError((current) => current ?? 'Tu sesion no pudo restaurarse del todo, pero puedes seguir explorando.')
      })
  }, [setProfile])

  return { articles, products, loading, error }
}
