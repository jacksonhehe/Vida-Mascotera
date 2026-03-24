import { cacheArticles, cacheProducts, getCachedArticles, getCachedProducts } from '@/lib/indexed-db'
import { mockArticles, mockProducts } from '@/lib/mock-data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { Article, ProductRecommendation } from '@/types/content'

export async function getArticles(): Promise<Article[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('articles').select('*').order('published_at', { ascending: false })

    if (data?.length) {
      const mapped = data.map(
        (item): Article => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          readTime: item.read_time,
          author: item.author,
          publishedAt: item.published_at,
          featured: item.featured,
          image: item.image,
          tags: item.tags ?? [],
        }),
      )
      await cacheArticles(mapped)
      return mapped
    }
  }

  const cached = await getCachedArticles()
  if (cached.length) {
    return cached
  }

  await cacheArticles(mockArticles)
  return mockArticles
}

export async function getProducts(): Promise<ProductRecommendation[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('products').select('*')

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
        }),
      )
      await cacheProducts(mapped)
      return mapped
    }
  }

  const cached = await getCachedProducts()
  if (cached.length) {
    return cached
  }

  await cacheProducts(mockProducts)
  return mockProducts
}

