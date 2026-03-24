import { cacheArticles, cacheProducts, getCachedArticles, getCachedProducts } from '@/lib/indexed-db'
import { mockArticles, mockProducts } from '@/lib/mock-data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { Article, ProductRecommendation, SupabaseArticleDTO, SupabaseProductDTO } from '@/types/content'

class ContentServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentServiceError'
  }
}

function sortArticles(items: Article[]) {
  return [...items].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
}

function isArticleDto(value: unknown): value is SupabaseArticleDTO {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>
  return typeof candidate.id === 'string' && typeof candidate.title === 'string' && typeof candidate.excerpt === 'string'
}

function isProductDto(value: unknown): value is SupabaseProductDTO {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>
  return typeof candidate.id === 'string' && typeof candidate.name === 'string' && typeof candidate.description === 'string'
}

function mapArticleDto(dto: SupabaseArticleDTO): Article {
  return {
    id: dto.id,
    slug: dto.slug ?? dto.id,
    title: dto.title,
    excerpt: dto.excerpt,
    category: dto.category,
    readTime: dto.read_time,
    author: dto.author,
    publishedAt: dto.published_at,
    updatedAt: dto.updated_at ?? dto.published_at,
    featured: dto.featured ?? false,
    image: dto.image,
    tags: dto.tags ?? [],
    heroNote: dto.hero_note ?? dto.excerpt,
    body: dto.body ?? [],
    takeaways: dto.takeaways ?? [],
    ctaLabel: dto.cta_label ?? 'Seguir leyendo',
    seoTitle: dto.seo_title ?? dto.title,
    seoDescription: dto.seo_description ?? dto.excerpt,
    comparisonTable: dto.comparison_table ?? undefined,
  }
}

function mapProductDto(dto: SupabaseProductDTO): ProductRecommendation {
  return {
    id: dto.id,
    slug: dto.slug ?? dto.id,
    name: dto.name,
    category: dto.category,
    description: dto.description,
    longDescription: dto.long_description ?? dto.description,
    useCases: dto.use_cases ?? [],
    rating: dto.rating,
    priceLabel: dto.price_label,
    affiliateHint: dto.affiliate_hint,
    image: dto.image,
    badge: dto.badge ?? 'Recomendado',
    ctaLabel: dto.cta_label ?? 'Ver recomendacion',
    seoTitle: dto.seo_title ?? dto.name,
    seoDescription: dto.seo_description ?? dto.description,
  }
}

async function loadArticlesFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new ContentServiceError('Supabase no esta configurado.')
  }

  const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false })
  if (error) {
    throw new ContentServiceError(error.message)
  }

  if (!data?.length) {
    throw new ContentServiceError('No se encontraron articulos remotos.')
  }

  const validated = data.filter(isArticleDto)
  if (!validated.length) {
    throw new ContentServiceError('La respuesta remota de articulos no cumple el formato esperado.')
  }

  return sortArticles(validated.map(mapArticleDto))
}

async function loadProductsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new ContentServiceError('Supabase no esta configurado.')
  }

  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    throw new ContentServiceError(error.message)
  }

  if (!data?.length) {
    throw new ContentServiceError('No se encontraron productos remotos.')
  }

  const validated = data.filter(isProductDto)
  if (!validated.length) {
    throw new ContentServiceError('La respuesta remota de productos no cumple el formato esperado.')
  }

  return validated.map(mapProductDto)
}

export async function getArticles(): Promise<Article[]> {
  try {
    const remote = await loadArticlesFromSupabase()
    await cacheArticles(remote)
    return remote
  } catch {
    const cached = await getCachedArticles()
    if (cached.length) {
      return sortArticles(cached)
    }

    await cacheArticles(mockArticles)
    return sortArticles(mockArticles)
  }
}

export async function getProducts(): Promise<ProductRecommendation[]> {
  try {
    const remote = await loadProductsFromSupabase()
    await cacheProducts(remote)
    return remote
  } catch {
    const cached = await getCachedProducts()
    if (cached.length) {
      return cached
    }

    await cacheProducts(mockProducts)
    return mockProducts
  }
}

export function getArticleBySlug(articles: Article[], slug?: string) {
  return articles.find((article) => article.slug === slug)
}

export function getRelatedArticles(articles: Article[], current: Article) {
  return articles.filter((article) => article.id !== current.id && article.category === current.category).slice(0, 3)
}

export function getProductBySlug(products: ProductRecommendation[], slugOrId?: string) {
  return products.find((product) => product.slug === slugOrId || product.id === slugOrId)
}

export function getRelatedProducts(products: ProductRecommendation[], current: ProductRecommendation) {
  return products.filter((product) => product.id !== current.id && product.category === current.category).slice(0, 3)
}
