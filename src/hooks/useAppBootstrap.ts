import { useEffect, useState, useEffectEvent } from 'react'
import { getFavorites, getStoredPreferences } from '@/lib/indexed-db'
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
  const setFavorites = useAppStore((state) => state.setFavorites)
  const setPreferences = useAppStore((state) => state.setPreferences)

  const handleConnectivity = useEffectEvent(async () => {
    const offline = !navigator.onLine
    setOffline(offline)

    if (!offline) {
      try {
        await syncPendingChanges()
      } catch {
        setError('Volvimos a estar en linea. Algunos cambios pueden tardar un poco en reflejarse.')
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
        setError((current) => current ?? 'Algunos datos no pudieron recuperarse por completo.')
      })
  }, [hydrated, setFavorites, setPreferences])

  useEffect(() => {
    void persistFavoriteIds(favorites).catch(() => {
      setError('Tus favoritos pueden tardar un poco en actualizarse, pero seguiremos intentandolo.')
    })
  }, [favorites])

  useEffect(() => {
    void persistPreferences(preferences).catch(() => {
      setError('Tus preferencias no pudieron actualizarse ahora mismo, pero puedes seguir navegando con normalidad.')
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

  return { articles, products, loading, error }
}
