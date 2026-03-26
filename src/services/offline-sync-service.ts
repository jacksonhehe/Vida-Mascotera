import {
  clearSyncQueue,
  enqueueSync,
  getFavoriteKeys,
  getHistoryEntries,
  getScopedPreferences,
  getSyncQueue,
  saveContactMessage,
  saveFavoriteKeys,
  saveHistoryEntries,
  saveScopedPreferences,
} from '@/lib/indexed-db'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type {
  ContactMessageInput,
  ContactMessageRecord,
  SavedItemType,
  SupabaseUserFavoriteDTO,
  SupabaseUserHistoryDTO,
  SupabaseUserPreferenceDTO,
  SyncQueueItem,
  UserHistoryEntry,
  UserPreferences,
} from '@/types/content'
import { buildSavedItemKey, parseSavedItemKey, uniqueKeys } from '@/utils/saved-items'

const GUEST_SCOPE = 'guest'

function buildQueueItem(type: SyncQueueItem['type'], payload: unknown): SyncQueueItem {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
  }
}

function mergeHistoryEntries(entries: UserHistoryEntry[]) {
  const latest = new Map<string, UserHistoryEntry>()

  entries.forEach((entry) => {
    const current = latest.get(entry.key)
    if (!current || new Date(entry.visitedAt).getTime() > new Date(current.visitedAt).getTime()) {
      latest.set(entry.key, entry)
    }
  })

  return [...latest.values()].sort((left, right) => new Date(right.visitedAt).getTime() - new Date(left.visitedAt).getTime()).slice(0, 24)
}

function defaultPreferences(): UserPreferences {
  return {
    favoriteTopics: ['perros', 'gatos'],
    preferredPet: 'ambos',
    newsletter: true,
  }
}

async function replaceFavoritesRemote(userId: string, keys: string[]) {
  if (!supabase) {
    return
  }

  const parsed = keys.map(parseSavedItemKey).filter((value): value is { type: SavedItemType; id: string } => Boolean(value))

  const newPayload = parsed.map((item) => ({
    user_id: userId,
    item_id: item.id,
    item_type: item.type,
  }))

  const legacyPayload = parsed
    .filter((item) => item.type === 'article')
    .map((item) => ({
      user_id: userId,
      article_id: item.id,
    }))

  const deleteNewResult = await supabase.from('user_favorites').delete().eq('user_id', userId)
  if (deleteNewResult.error) {
    throw deleteNewResult.error
  }

  if (newPayload.length > 0) {
    const insertResult = await supabase.from('user_favorites').insert(newPayload)
    if (!insertResult.error) {
      return
    }

    const legacyDeleteResult = await supabase.from('user_favorites').delete().eq('user_id', userId)
    if (legacyDeleteResult.error) {
      throw insertResult.error
    }

    if (legacyPayload.length > 0) {
      const legacyInsertResult = await supabase.from('user_favorites').insert(legacyPayload)
      if (legacyInsertResult.error) {
        throw legacyInsertResult.error
      }
    }
  }
}

async function fetchFavoritesRemote(userId: string) {
  if (!supabase) {
    return []
  }

  const modernResult = await supabase
    .from('user_favorites')
    .select('item_id,item_type,created_at')
    .eq('user_id', userId)
    .returns<SupabaseUserFavoriteDTO[]>()

  if (!modernResult.error && modernResult.data) {
    return modernResult.data
      .map((item) => {
        if (!item.item_id || !item.item_type) {
          return null
        }

        return buildSavedItemKey(item.item_type, item.item_id)
      })
      .filter((item): item is string => Boolean(item))
  }

  const legacyResult = await supabase
    .from('user_favorites')
    .select('article_id,created_at')
    .eq('user_id', userId)
    .returns<SupabaseUserFavoriteDTO[]>()

  if (legacyResult.error || !legacyResult.data) {
    throw modernResult.error ?? legacyResult.error
  }

  return legacyResult.data
    .map((item) => (item.article_id ? buildSavedItemKey('article', item.article_id) : null))
    .filter((item): item is string => Boolean(item))
}

async function upsertPreferencesRemote(userId: string, preferences: UserPreferences) {
  if (!supabase) {
    return
  }

  const { error } = await supabase.from('user_preferences').upsert({
    user_id: userId,
    preferred_pet: preferences.preferredPet,
    favorite_topics: preferences.favoriteTopics,
    newsletter: preferences.newsletter,
  })

  if (error) {
    throw error
  }
}

async function fetchPreferencesRemote(userId: string) {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('user_preferences')
    .select('preferred_pet,favorite_topics,newsletter')
    .eq('user_id', userId)
    .maybeSingle<SupabaseUserPreferenceDTO>()

  if (error) {
    throw error
  }

  if (!data) {
    return null
  }

  return {
    preferredPet: data.preferred_pet ?? 'ambos',
    favoriteTopics: data.favorite_topics ?? [],
    newsletter: data.newsletter ?? true,
  } satisfies UserPreferences
}

async function replaceHistoryRemote(userId: string, history: UserHistoryEntry[]) {
  if (!supabase) {
    return
  }

  const payload = history
    .map((entry) => {
      const parsed = parseSavedItemKey(entry.key)
      if (!parsed) {
        return null
      }

      return {
        user_id: userId,
        item_id: parsed.id,
        item_type: parsed.type,
        visited_at: entry.visitedAt,
      }
    })
    .filter(Boolean)

  const clearResult = await supabase.from('user_history').delete().eq('user_id', userId)
  if (clearResult.error) {
    throw clearResult.error
  }

  if (payload.length > 0) {
    const insertResult = await supabase.from('user_history').insert(payload)
    if (insertResult.error) {
      throw insertResult.error
    }
  }
}

async function fetchHistoryRemote(userId: string) {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('user_history')
    .select('item_id,item_type,visited_at')
    .eq('user_id', userId)
    .order('visited_at', { ascending: false })
    .limit(24)
    .returns<SupabaseUserHistoryDTO[]>()

  if (error) {
    throw error
  }

  return (data ?? [])
    .map((entry) => {
      if (!entry.item_id || !entry.item_type) {
        return null
      }

      return {
        key: buildSavedItemKey(entry.item_type, entry.item_id),
        visitedAt: entry.visited_at ?? new Date().toISOString(),
      } satisfies UserHistoryEntry
    })
    .filter((entry): entry is UserHistoryEntry => Boolean(entry))
}

async function submitContactMessageRemote(message: ContactMessageRecord) {
  if (!supabase) {
    return
  }

  const { error } = await supabase.from('contact_messages').insert({
    id: message.id,
    user_id: null,
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
    status: 'new',
    created_at: message.createdAt,
  })

  if (error) {
    throw error
  }
}

export async function loadUserExperience(userId: string | null) {
  const scopeKey = userId ?? GUEST_SCOPE

  const [localFavorites, localPreferences, localHistory, guestFavorites, guestPreferences, guestHistory] = await Promise.all([
    getFavoriteKeys(scopeKey),
    getScopedPreferences(scopeKey),
    getHistoryEntries(scopeKey),
    userId ? getFavoriteKeys(GUEST_SCOPE) : Promise.resolve([]),
    userId ? getScopedPreferences(GUEST_SCOPE) : Promise.resolve(null),
    userId ? getHistoryEntries(GUEST_SCOPE) : Promise.resolve([]),
  ])

  if (!userId || !navigator.onLine || !isSupabaseConfigured || !supabase) {
    return {
      favorites: uniqueKeys(userId ? [...guestFavorites, ...localFavorites] : localFavorites),
      preferences: localPreferences ?? guestPreferences ?? defaultPreferences(),
      history: mergeHistoryEntries(userId ? [...guestHistory, ...localHistory] : localHistory),
    }
  }

  const [remoteFavorites, remotePreferences, remoteHistory] = await Promise.all([
    fetchFavoritesRemote(userId).catch(() => []),
    fetchPreferencesRemote(userId).catch(() => null),
    fetchHistoryRemote(userId).catch(() => []),
  ])

  const favorites = uniqueKeys([...remoteFavorites, ...localFavorites, ...guestFavorites])
  const preferences = remotePreferences ?? localPreferences ?? guestPreferences ?? defaultPreferences()
  const history = mergeHistoryEntries([...remoteHistory, ...localHistory, ...guestHistory])

  await Promise.all([
    saveFavoriteKeys(scopeKey, favorites),
    saveScopedPreferences(scopeKey, preferences),
    saveHistoryEntries(scopeKey, history),
  ])

  return { favorites, preferences, history }
}

export async function persistFavoriteKeys(keys: string[], userId: string | null) {
  const scopeKey = userId ?? GUEST_SCOPE
  await saveFavoriteKeys(scopeKey, uniqueKeys(keys))

  if (!userId) {
    return
  }

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('favorite', { userId, keys: uniqueKeys(keys) }))
    return
  }

  await replaceFavoritesRemote(userId, uniqueKeys(keys))
}

export async function persistPreferences(preferences: UserPreferences, userId: string | null) {
  const scopeKey = userId ?? GUEST_SCOPE
  await saveScopedPreferences(scopeKey, preferences)

  if (!userId) {
    return
  }

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('preference', { userId, preferences }))
    return
  }

  await upsertPreferencesRemote(userId, preferences)
}

export async function persistHistory(history: UserHistoryEntry[], userId: string | null) {
  const scopeKey = userId ?? GUEST_SCOPE
  const mergedHistory = mergeHistoryEntries(history)
  await saveHistoryEntries(scopeKey, mergedHistory)

  if (!userId) {
    return
  }

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('history', { userId, history: mergedHistory }))
    return
  }

  await replaceHistoryRemote(userId, mergedHistory)
}

export async function submitContactMessage(input: ContactMessageInput) {
  const record: ContactMessageRecord = {
    ...input,
    id: `contact-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  }

  await saveContactMessage(record)

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('contact_message', record))
    return { queued: true }
  }

  await submitContactMessageRemote(record)
  return { queued: false }
}

export async function syncPendingChanges() {
  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    return
  }

  const queued = await getSyncQueue()
  if (!queued.length) {
    return
  }

  const processedIds: string[] = []

  for (const item of queued) {
    if (item.type === 'favorite') {
      const payload = item.payload as { userId: string; keys: string[] }
      await replaceFavoritesRemote(payload.userId, payload.keys)
      processedIds.push(item.id)
    }

    if (item.type === 'preference') {
      const payload = item.payload as { userId: string; preferences: UserPreferences }
      await upsertPreferencesRemote(payload.userId, payload.preferences)
      processedIds.push(item.id)
    }

    if (item.type === 'history') {
      const payload = item.payload as { userId: string; history: UserHistoryEntry[] }
      await replaceHistoryRemote(payload.userId, payload.history)
      processedIds.push(item.id)
    }

    if (item.type === 'contact_message') {
      await submitContactMessageRemote(item.payload as ContactMessageRecord)
      processedIds.push(item.id)
    }
  }

  if (processedIds.length) {
    await clearSyncQueue(processedIds)
  }
}
