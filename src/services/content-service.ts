import { cacheArticles, cacheProducts, getCachedArticles, getCachedProducts } from '@/lib/indexed-db'
import { mockArticles, mockProducts } from '@/lib/mock-data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { Article, ProductRecommendation } from '@/types/content'

function sortArticles(items: Article[]) {
  return [...items].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
}

export async function getArticles(): Promise<Article[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data?.length) {
        const mapped = data.map(
          (item): Article => ({
            id: item.id,
            slug: item.slug ?? item.id,
            title: item.title,
            excerpt: item.excerpt,
            category: item.category,
            readTime: item.read_time,
            author: item.author,
            publishedAt: item.published_at,
            featured: item.featured,
            image: item.image,
            tags: item.tags ?? [],
            heroNote: item.hero_note ?? item.excerpt,
            body: item.body ?? [],
            takeaways: item.takeaways ?? [],
            ctaLabel: item.cta_label ?? 'Seguir leyendo',
            seoTitle: item.seo_title ?? item.title,
            seoDescription: item.seo_description ?? item.excerpt,
            comparisonTable: item.comparison_table ?? undefined,
          }),
        )

        const sorted = sortArticles(mapped)
        await cacheArticles(sorted)
        return sorted
      }
    }
  } catch {
    const cached = await getCachedArticles()
    if (cached.length) {
      return sortArticles(cached)
    }
  }

  const cached = await getCachedArticles()
  if (cached.length) {
    return sortArticles(cached)
  }

  await cacheArticles(mockArticles)
  return sortArticles(mockArticles)
}

export async function getProducts(): Promise<ProductRecommendation[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        throw error
      }

      if (data?.length) {
        const mapped = data.map(
          (item): ProductRecommendation => ({
            id: item.id,
            name: item.name,
            category: item.category,
            description: item.description,
            rating: item.rating,
            priceLabel: item.price_label,
            affiliateHint: item.affiliate_hint,
            image: item.image,
            badge: item.badge ?? 'Recomendado',
            ctaLabel: item.cta_label ?? 'Ver recomendación',
          }),
        )
        await cacheProducts(mapped)
        return mapped
      }
    }
  } catch {
    const cached = await getCachedProducts()
    if (cached.length) {
      return cached
    }
  }

  const cached = await getCachedProducts()
  if (cached.length) {
    return cached
  }

  await cacheProducts(mockProducts)
  return mockProducts
}

export function getArticleBySlug(articles: Article[], slug?: string) {
  return articles.find((article) => article.slug === slug)
}

export function getRelatedArticles(articles: Article[], current: Article) {
  return articles
    .filter((article) => article.id !== current.id && article.category === current.category)
    .slice(0, 3)
}
