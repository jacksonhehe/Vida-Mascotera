import { openDB } from 'idb'
import type {
  Article,
  ArticleEditorDraft,
  ContactMessageRecord,
  ProductRecommendation,
  SyncQueueItem,
  UserPreferences,
} from '@/types/content'

const DB_NAME = 'vida-mascotera-db'
const DB_VERSION = 4

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
  },
})

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

export async function saveFavorites(ids: string[]) {
  const db = await dbPromise
  const tx = db.transaction('favorites', 'readwrite')
  const existing = (await tx.store.getAllKeys()).map(String)

  await Promise.all(ids.map((id) => tx.store.put({ id })))
  await Promise.all(existing.filter((id) => !ids.includes(id)).map((id) => tx.store.delete(id)))
  await tx.done
}

export async function getFavorites(): Promise<string[]> {
  const db = await dbPromise
  const records = await db.getAll('favorites')
  return records.map((record) => String(record.id))
}

export async function savePreferences(preferences: UserPreferences) {
  const db = await dbPromise
  await db.put('preferences', { id: 'current', ...preferences })
}

export async function getStoredPreferences(): Promise<UserPreferences | null> {
  const db = await dbPromise
  const record = await db.get('preferences', 'current')

  if (!record) {
    return null
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
