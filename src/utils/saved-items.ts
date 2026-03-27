import type { SavedItemType } from '@/types/content'

export function buildSavedItemKey(type: SavedItemType, id: string) {
  return `${type}:${id}`
}

export function parseSavedItemKey(key: string): { type: SavedItemType; id: string } | null {
  const [type, ...rest] = key.split(':')
  const id = rest.join(':')

  if (!id && key) {
    return { type: 'article', id: key }
  }

  if (!id || (type !== 'article' && type !== 'product')) {
    return null
  }

  return { type, id }
}

export function uniqueKeys(keys: string[]) {
  return [...new Set(keys.filter(Boolean))]
}
