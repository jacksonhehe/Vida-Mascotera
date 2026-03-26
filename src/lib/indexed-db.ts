import { openDB } from 'idb'
import type {
  Article,
  ArticleEditorDraft,
  ContactMessageRecord,
  ProductRecommendation,
  SyncQueueItem,
  UserHistoryEntry,
  UserPreferences,
} from '@/types/content'

const DB_NAME = 'vida-mascotera-db'
const DB_VERSION = 5
const CURRENT_PREFERENCES_KEY = 'current'
const GUEST_SCOPE = 'guest'

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    if (!db.objectStoreNames.contains('favorites')) {
      db.createObjectStore('favorites', { keyPath: 'id' })
    }

    if (!db.objectStoreNames.contains('content')) {
      db.createObjectStore('content', { keyPath: 'id' })
    }

    if (!db.objectStoreNames.contains('products')) {
      db.createObjectStore('products', { keyPath: 'id' })
    }

    if (!db.objectStoreNames.contains('syncQueue')) {
      db.createObjectStore('syncQueue', { keyPath: 'id' })
    }

    if (oldVersion < 2) {
      if (!db.objectStoreNames.contains('contactMessages')) {
        db.createObjectStore('contactMessages', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'id' })
      }
    }

    if (oldVersion < 3) {
      if (db.objectStoreNames.contains('content')) {
        db.deleteObjectStore('content')
      }

      if (db.objectStoreNames.contains('products')) {
        db.deleteObjectStore('products')
      }

      db.createObjectStore('content', { keyPath: 'id' })
      db.createObjectStore('products', { keyPath: 'id' })
    }

    if (oldVersion < 4) {
      if (!db.objectStoreNames.contains('articleDrafts')) {
        db.createObjectStore('articleDrafts', { keyPath: 'id' })
      }
    }

    if (oldVersion < 5) {
      if (!db.objectStoreNames.contains('favoriteCollections')) {
        db.createObjectStore('favoriteCollections', { keyPath: 'scopeKey' })
      }

      if (!db.objectStoreNames.contains('preferenceProfiles')) {
        db.createObjectStore('preferenceProfiles', { keyPath: 'scopeKey' })
      }

      if (!db.objectStoreNames.contains('historyCollections')) {
        db.createObjectStore('historyCollections', { keyPath: 'scopeKey' })
      }
    }
  },
})

function normalizeScopeKey(scopeKey?: string | null) {
  return scopeKey ?? GUEST_SCOPE
}

export async function cacheArticles(articles: Article[]) {
  const db = await dbPromise
  const tx = db.transaction('content', 'readwrite')
  await Promise.all(articles.map((article) => tx.store.put(article)))
  await tx.done
}

export async function cacheProducts(products: ProductRecommendation[]) {
  const db = await dbPromise
  const tx = db.transaction('products', 'readwrite')
  await Promise.all(products.map((product) => tx.store.put(product)))
  await tx.done
}

export async function getCachedArticles(): Promise<Article[]> {
  const db = await dbPromise
  return db.getAll('content')
}

export async function getCachedProducts(): Promise<ProductRecommendation[]> {
  const db = await dbPromise
  return db.getAll('products')
}

export async function saveFavoriteKeys(scopeKey: string | null | undefined, keys: string[]) {
  const db = await dbPromise
  await db.put('favoriteCollections', { scopeKey: normalizeScopeKey(scopeKey), keys })
}

export async function getFavoriteKeys(scopeKey: string | null | undefined): Promise<string[]> {
  const db = await dbPromise
  const record = await db.get('favoriteCollections', normalizeScopeKey(scopeKey))
  return record?.keys ?? []
}

export async function saveScopedPreferences(scopeKey: string | null | undefined, preferences: UserPreferences) {
  const db = await dbPromise
  await db.put('preferenceProfiles', { scopeKey: normalizeScopeKey(scopeKey), ...preferences })
}

export async function getScopedPreferences(scopeKey: string | null | undefined): Promise<UserPreferences | null> {
  const db = await dbPromise
  const record = await db.get('preferenceProfiles', normalizeScopeKey(scopeKey))

  if (!record) {
    return null
  }

  return {
    favoriteTopics: record.favoriteTopics,
    preferredPet: record.preferredPet,
    newsletter: record.newsletter,
  }
}

export async function saveHistoryEntries(scopeKey: string | null | undefined, history: UserHistoryEntry[]) {
  const db = await dbPromise
  await db.put('historyCollections', { scopeKey: normalizeScopeKey(scopeKey), entries: history })
}

export async function getHistoryEntries(scopeKey: string | null | undefined): Promise<UserHistoryEntry[]> {
  const db = await dbPromise
  const record = await db.get('historyCollections', normalizeScopeKey(scopeKey))
  return record?.entries ?? []
}

export async function saveFavorites(ids: string[]) {
  await saveFavoriteKeys(GUEST_SCOPE, ids)
}

export async function getFavorites(): Promise<string[]> {
  return getFavoriteKeys(GUEST_SCOPE)
}

export async function savePreferences(preferences: UserPreferences) {
  const db = await dbPromise
  await db.put('preferences', { id: CURRENT_PREFERENCES_KEY, ...preferences })
  await saveScopedPreferences(GUEST_SCOPE, preferences)
}

export async function getStoredPreferences(): Promise<UserPreferences | null> {
  const db = await dbPromise
  const record = await db.get('preferences', CURRENT_PREFERENCES_KEY)

  if (!record) {
    return getScopedPreferences(GUEST_SCOPE)
  }

  return {
    favoriteTopics: record.favoriteTopics,
    preferredPet: record.preferredPet,
    newsletter: record.newsletter,
  }
}

export async function saveContactMessage(message: ContactMessageRecord) {
  const db = await dbPromise
  await db.put('contactMessages', message)
}

export async function saveArticleDraft(draft: ArticleEditorDraft) {
  const db = await dbPromise
  await db.put('articleDrafts', draft)
}

export async function getArticleDraft(id: string): Promise<ArticleEditorDraft | null> {
  const db = await dbPromise
  return (await db.get('articleDrafts', id)) ?? null
}

export async function deleteArticleDraft(id: string) {
  const db = await dbPromise
  await db.delete('articleDrafts', id)
}

export async function getContactMessages(): Promise<ContactMessageRecord[]> {
  const db = await dbPromise
  return db.getAll('contactMessages')
}

export async function enqueueSync(item: SyncQueueItem) {
  const db = await dbPromise
  await db.put('syncQueue', item)
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await dbPromise
  return db.getAll('syncQueue')
}

export async function clearSyncQueue(ids: string[]) {
  const db = await dbPromise
  const tx = db.transaction('syncQueue', 'readwrite')
  await Promise.all(ids.map((id) => tx.store.delete(id)))
  await tx.done
}
