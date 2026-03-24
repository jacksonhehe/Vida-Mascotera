import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PetCategory, UserPreferences, UserProfile } from '@/types/content'

interface AppState {
  favorites: string[]
  selectedCategory: PetCategory | 'todas'
  searchTerm: string
  preferences: UserPreferences
  isOffline: boolean
  profile: UserProfile | null
  hydrated: boolean
  toggleFavorite: (id: string) => void
  setFavorites: (favorites: string[]) => void
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
      selectedCategory: 'todas',
      searchTerm: '',
      preferences: defaultPreferences,
      isOffline: !navigator.onLine,
      profile: null,
      hydrated: false,
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favorite) => favorite !== id)
            : [...state.favorites, id],
        })),
      setFavorites: (favorites) => set({ favorites }),
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
        preferences: state.preferences,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    },
  ),
)
