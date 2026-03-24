import {
  clearSyncQueue,
  enqueueSync,
  getSyncQueue,
  saveContactMessage,
  saveFavorites,
  savePreferences,
} from '@/lib/indexed-db'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { getCurrentUserId } from '@/services/auth-service'
import type { ContactMessageInput, ContactMessageRecord, SyncQueueItem, UserPreferences } from '@/types/content'

function buildQueueItem(type: SyncQueueItem['type'], payload: unknown): SyncQueueItem {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
  }
}

async function upsertFavorites(ids: string[]) {
  const userId = await getCurrentUserId()
  if (!userId) {
    return false
  }

  const payload = ids.map((articleId) => ({
    article_id: articleId,
    user_id: userId,
  }))

  const { error } = await supabase!.from('user_favorites').upsert(payload, { onConflict: 'user_id,article_id' })
  if (error) {
    throw error
  }

  return true
}

async function upsertPreferences(preferences: UserPreferences) {
  const userId = await getCurrentUserId()
  if (!userId) {
    return false
  }

  const { error } = await supabase!.from('user_preferences').upsert({
    user_id: userId,
    preferred_pet: preferences.preferredPet,
    favorite_topics: preferences.favoriteTopics,
    newsletter: preferences.newsletter,
  })

  if (error) {
    throw error
  }

  return true
}

async function submitContactMessageRemote(message: ContactMessageRecord) {
  const userId = await getCurrentUserId()

  const { error } = await supabase!.from('contact_messages').insert({
    id: message.id,
    user_id: userId,
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

export async function persistFavoriteIds(ids: string[]) {
  await saveFavorites(ids)

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('favorite', ids))
    return
  }

  await upsertFavorites(ids)
}

export async function persistPreferences(preferences: UserPreferences) {
  await savePreferences(preferences)

  if (!navigator.onLine || !isSupabaseConfigured || !supabase) {
    await enqueueSync(buildQueueItem('preference', preferences))
    return
  }

  await upsertPreferences(preferences)
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
      const synced = await upsertFavorites(item.payload as string[])
      if (synced) {
        processedIds.push(item.id)
      }
    }

    if (item.type === 'preference') {
      const synced = await upsertPreferences(item.payload as UserPreferences)
      if (synced) {
        processedIds.push(item.id)
      }
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
