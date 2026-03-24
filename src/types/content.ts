export type PetCategory =
  | 'inicio'
  | 'perros'
  | 'gatos'
  | 'alimentacion'
  | 'salud'
  | 'accesorios'
  | 'comparativas'
  | 'blog'
  | 'contacto'

export interface NavItem {
  label: string
  path: string
  category: PetCategory
  description: string
}

export interface CategoryHighlight {
  id: string
  title: string
  description: string
  path: string
  accent: 'brand' | 'mint' | 'coral' | 'cream'
  image: string
}

export interface ArticleSection {
  title: string
  paragraphs: string[]
}

export interface ComparisonRow {
  criteria: string
  optionA: string
  optionB: string
  recommendation: string
}

export interface ComparisonTable {
  title: string
  optionALabel: string
  optionBLabel: string
  rows: ComparisonRow[]
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: PetCategory
  readTime: string
  author: string
  publishedAt: string
  featured?: boolean
  image: string
  tags: string[]
  heroNote: string
  body: ArticleSection[]
  takeaways: string[]
  ctaLabel: string
  seoTitle: string
  seoDescription: string
  comparisonTable?: ComparisonTable
}

export interface ProductRecommendation {
  id: string
  name: string
  category: 'perros' | 'gatos' | 'accesorios' | 'alimentacion'
  description: string
  rating: number
  priceLabel: string
  affiliateHint: string
  image: string
  badge: string
  ctaLabel: string
}

export interface StarterTip {
  id: string
  title: string
  body: string
}

export interface UserPreferences {
  favoriteTopics: PetCategory[]
  preferredPet: 'perros' | 'gatos' | 'ambos'
  newsletter: boolean
}

export interface UserProfile {
  id: string
  email: string
  fullName: string
  city?: string
  avatarUrl?: string
}

export interface SyncQueueItem {
  id: string
  type: 'favorite' | 'preference'
  payload: unknown
  createdAt: string
}
