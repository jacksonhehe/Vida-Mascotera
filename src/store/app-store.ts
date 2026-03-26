import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PetCategory, UserHistoryEntry, UserPreferences, UserProfile } from '@/types/content'
import { uniqueKeys } from '@/utils/saved-items'

interface AppState {
  favorites: string[]
  history: UserHistoryEntry[]
  selectedCategory: PetCategory | 'todas'
  searchTerm: string
  preferences: UserPreferences
  isOffline: boolean
  profile: UserProfile | null
  hydrated: boolean
  toggleFavorite: (key: string) => void
  removeFavorite: (key: string) => void
  setFavorites: (favorites: string[]) => void
  setHistory: (history: UserHistoryEntry[]) => void
  recordHistory: (key: string) => void
  setSelectedCategory: (category: PetCategory | 'todas') => void
  setSearchTerm: (term: string) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  setPreferences: (preferences: UserPreferences) => void
  setOffline: (isOffline: boolean) => void
  setProfile: (profile: UserProfile | null) => void
  setHydrated: (hydrated: boolean) => void
}

const defaultPreferences: UserPreferences = {
  favoriteTopics: ['perros', 'gatos'],
  preferredPet: 'ambos',
  newsletter: true,
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      history: [],
      selectedCategory: 'todas',
      searchTerm: '',
      preferences: defaultPreferences,
      isOffline: !navigator.onLine,
      profile: null,
      hydrated: false,
      toggleFavorite: (key) =>
        set((state) => ({
          favorites: state.favorites.includes(key)
            ? state.favorites.filter((favorite) => favorite !== key)
            : uniqueKeys([...state.favorites, key]),
        })),
      setFavorites: (favorites) => set({ favorites }),
      removeFavorite: (key) =>
        set((state) => ({
          favorites: state.favorites.filter((favorite) => favorite !== key),
        })),
      setHistory: (history) => set({ history }),
      recordHistory: (key) =>
        set((state) => ({
          history: [
            { key, visitedAt: new Date().toISOString() },
            ...state.history.filter((entry) => entry.key !== key),
          ].slice(0, 24),
        })),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      updatePreferences: (preferences) =>
        set((state) => ({ preferences: { ...state.preferences, ...preferences } })),
      setPreferences: (preferences) => set({ preferences }),
      setOffline: (isOffline) => set({ isOffline }),
      setProfile: (profile) => set({ profile }),
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: 'vida-mascotera-store',
      partialize: (state) => ({
        favorites: state.favorites,
        history: state.history,
        preferences: state.preferences,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)
