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

export type ArticleStatus = 'draft' | 'published' | 'archived'
export type UserRole = 'admin' | 'editor' | 'reader'

export interface NavItem {
  label: string
  path: string
  category: PetCategory
  description: string
}

export interface SeoMetadata {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'product'
  canonicalPath?: string
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
  updatedAt?: string
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
  status?: ArticleStatus
}

export interface ProductRecommendation {
  id: string
  slug: string
  name: string
  category: 'perros' | 'gatos' | 'accesorios' | 'alimentacion'
  description: string
  longDescription: string
  useCases: string[]
  rating: number
  priceLabel: string
  affiliateHint: string
  image: string
  badge: string
  ctaLabel: string
  seoTitle: string
  seoDescription: string
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
  role?: UserRole
}

export interface SyncQueueItem {
  id: string
  type: 'favorite' | 'preference' | 'contact_message'
  payload: unknown
  createdAt: string
}

export interface ContactMessageInput {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMessageRecord extends ContactMessageInput {
  id: string
  createdAt: string
  status: 'pending' | 'sent'
}

export interface ArticleEditorDraft {
  id: string
  articleId?: string
  data: Article
  updatedAt: string
}

export interface AdminArticleFilters {
  search: string
  category: PetCategory | 'todas'
  status: ArticleStatus | 'todos'
  month: string
}

export interface ArticleUpsertInput {
  id?: string
  title: string
  slug: string
  excerpt: string
  category: PetCategory
  author: string
  image: string
  tags: string[]
  heroNote: string
  takeaways: string[]
  body: ArticleSection[]
  seoTitle: string
  seoDescription: string
  publishedAt: string
  updatedAt: string
  status: ArticleStatus
}

export interface SupabaseArticleDTO {
  id: string
  slug: string | null
  title: string
  excerpt: string
  category: PetCategory
  read_time: string
  author: string
  published_at: string
  updated_at?: string | null
  featured?: boolean | null
  image: string
  tags?: string[] | null
  hero_note?: string | null
  body?: ArticleSection[] | null
  takeaways?: string[] | null
  cta_label?: string | null
  seo_title?: string | null
  seo_description?: string | null
  comparison_table?: ComparisonTable | null
  status?: ArticleStatus | null
}

export interface SupabaseProductDTO {
  id: string
  slug?: string | null
  name: string
  category: ProductRecommendation['category']
  description: string
  long_description?: string | null
  use_cases?: string[] | null
  rating: number
  price_label: string
  affiliate_hint: string
  image: string
  badge?: string | null
  cta_label?: string | null
  seo_title?: string | null
  seo_description?: string | null
}

export interface SupabaseProfileDTO {
  id: string
  full_name?: string | null
  avatar_url?: string | null
  role?: UserRole | null
}
