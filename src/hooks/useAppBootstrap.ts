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
      await syncPendingChanges()
    }
  })

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const [articleData, productData] = await Promise.all([getArticles(), getProducts()])
      setArticles(articleData)
      setProducts(productData)
      setLoading(false)
    }

    void load()
  }, [])

  useEffect(() => {
    if (!hydrated || favorites.length > 0) {
      return
    }

    void getFavorites().then((storedFavorites) => {
      storedFavorites.forEach((id) => toggleFavorite(id))
    })
  }, [favorites.length, hydrated, toggleFavorite])

  useEffect(() => {
    void persistFavoriteIds(favorites)
  }, [favorites])

  useEffect(() => {
    void persistPreferences(preferences)
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

    void supabase.auth.getUser().then(({ data }) => {
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
  }, [setProfile])

  return { articles, products, loading }
}
