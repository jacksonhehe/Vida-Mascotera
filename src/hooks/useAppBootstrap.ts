import { useEffect, useRef, useState, useEffectEvent } from 'react'
import { getArticles, getProducts } from '@/services/content-service'
import { loadUserExperience, persistFavoriteKeys, persistHistory, persistPreferences, syncPendingChanges } from '@/services/offline-sync-service'
import { useAuth } from '@/providers/AuthProvider'
import { useAppStore } from '@/store/app-store'
import type { Article, ProductRecommendation } from '@/types/content'

export function useAppBootstrap() {
  const [articles, setArticles] = useState<Article[]>([])
  const [products, setProducts] = useState<ProductRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { profile } = useAuth()
  const favorites = useAppStore((state) => state.favorites)
  const history = useAppStore((state) => state.history)
  const preferences = useAppStore((state) => state.preferences)
  const hydrated = useAppStore((state) => state.hydrated)
  const setOffline = useAppStore((state) => state.setOffline)
  const setFavorites = useAppStore((state) => state.setFavorites)
  const setHistory = useAppStore((state) => state.setHistory)
  const setPreferences = useAppStore((state) => state.setPreferences)
  const experienceLoadedRef = useRef(false)

  const handleConnectivity = useEffectEvent(async () => {
    const offline = !navigator.onLine
    setOffline(offline)

    if (!offline) {
      try {
        await syncPendingChanges()
      } catch {
        setError('Volvimos a estar en línea. Algunos cambios pueden tardar un poco en reflejarse.')
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

    experienceLoadedRef.current = false

    void loadUserExperience(profile?.id ?? null)
      .then((experience) => {
        setFavorites(experience.favorites)
        setPreferences(experience.preferences)
        setHistory(experience.history)
        experienceLoadedRef.current = true
      })
      .catch(() => {
        setError((current) => current ?? 'Algunos datos de tu cuenta no pudieron recuperarse por completo.')
        experienceLoadedRef.current = true
      })
  }, [hydrated, profile?.id, setFavorites, setHistory, setPreferences])

  useEffect(() => {
    if (!experienceLoadedRef.current) {
      return
    }

    void persistFavoriteKeys(favorites, profile?.id ?? null).catch(() => undefined)
  }, [favorites, profile?.id])

  useEffect(() => {
    if (!experienceLoadedRef.current) {
      return
    }

    void persistPreferences(preferences, profile?.id ?? null).catch(() => {
      setError('Tus preferencias no pudieron actualizarse ahora mismo, pero puedes seguir navegando con normalidad.')
    })
  }, [preferences, profile?.id])

  useEffect(() => {
    if (!experienceLoadedRef.current) {
      return
    }

    void persistHistory(history, profile?.id ?? null).catch(() => undefined)
  }, [history, profile?.id])

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
