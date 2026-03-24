import { useEffect, useState, useEffectEvent } from 'react'
import { getFavorites } from '@/lib/indexed-db'
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
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)

  const handleConnectivity = useEffectEvent(async () => {
    const offline = !navigator.onLine
    setOffline(offline)

    if (!offline) {
      try {
        await syncPendingChanges()
      } catch {
        setError('Recuperamos la conexión, pero aún estamos terminando de sincronizar tus cambios.')
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
        setError('No pudimos actualizar el contenido en este momento. Si tienes conexión limitada, seguiremos mostrando lo disponible.')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  useEffect(() => {
    if (!hydrated || favorites.length > 0) {
      return
    }

    void getFavorites()
      .then((storedFavorites) => {
        storedFavorites.forEach((id) => toggleFavorite(id))
      })
      .catch(() => {
        setError('Tus favoritos no pudieron cargarse por completo, pero el resto del sitio sigue disponible.')
      })
  }, [favorites.length, hydrated, toggleFavorite])

  useEffect(() => {
    void persistFavoriteIds(favorites).catch(() => {
      setError('Guardaremos tus favoritos en cuanto la conexión esté más estable.')
    })
  }, [favorites])

  useEffect(() => {
    void persistPreferences(preferences).catch(() => {
      setError('Tus preferencias se conservarán localmente hasta que podamos sincronizarlas.')
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
        setError((current) => current ?? 'Tu sesión no pudo restaurarse del todo, pero puedes seguir explorando sin problema.')
      })
  }, [setProfile])

  return { articles, products, loading, error }
}
