import { clearSyncQueue, enqueueSync, getSyncQueue, saveFavorites } from '@/lib/indexed-db'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { SyncQueueItem, UserPreferences } from '@/types/content'

function buildQueueItem(type: SyncQueueItem['type'], payload: unknown): SyncQueueItem {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
  }
}

export async function persistFavoriteIds(ids: string[]) {
  await saveFavorites(ids)

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('favorite', ids))
    return
  }

  await supabase.from('favorites').upsert(ids.map((articleId) => ({ article_id: articleId })))
}

export async function persistPreferences(preferences: UserPreferences) {
  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('preference', preferences))
    return
  }

  await supabase.from('preferences').upsert({
    preferred_pet: preferences.preferredPet,
    favorite_topics: preferences.favoriteTopics,
    newsletter: preferences.newsletter,
  })
}

export async function syncPendingChanges() {
  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    return
  }

  const queued = await getSyncQueue()
  if (!queued.length) {
    return
  }

  for (const item of queued) {
    if (item.type === 'favorite') {
      const ids = item.payload as string[]
      await supabase.from('favorites').upsert(ids.map((articleId) => ({ article_id: articleId })))
    }

    if (item.type === 'preference') {
      const prefs = item.payload as UserPreferences
      await supabase.from('preferences').upsert({
        preferred_pet: prefs.preferredPet,
        favorite_topics: prefs.favoriteTopics,
        newsletter: prefs.newsletter,
      })
    }
  }

  await clearSyncQueue(queued.map((item) => item.id))
}

