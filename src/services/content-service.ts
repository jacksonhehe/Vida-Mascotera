import { cacheArticles, cacheProducts, getCachedArticles, getCachedProducts } from '@/lib/indexed-db'
import { mockArticles, mockProducts } from '@/lib/mock-data'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import type { Article, ArticleStatus, ProductRecommendation, SupabaseArticleDTO, SupabaseProductDTO } from '@/types/content'
import { createSlug } from '@/utils/slug'

export class ContentServiceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentServiceError'
  }
}

export function sortArticles(items: Article[]) {
  return [...items].sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime())
}

function getEditorialClosingSection(article: Article): Article['body'][number] {
  const sectionByCategory = {
    perros: {
      title: 'Qué observar en la vida diaria',
      paragraphs: [
        'En perros, los cambios más útiles casi siempre se ven en lo cotidiano: cómo descansa, cómo pasea, cuánto explora y cómo responde a la rutina de casa.',
        'Si una recomendación te ayuda a tener días más tranquilos y previsibles, probablemente estás yendo en la dirección correcta.',
      ],
    },
    gatos: {
      title: 'Pequeños ajustes, grandes cambios',
      paragraphs: [
        'Con gatos, mover un recurso, cambiar una ubicación o respetar mejor sus tiempos puede generar mejoras muy visibles sin transformar toda la casa.',
        'La clave suele estar en observar con calma y ajustar el entorno con sensibilidad, no en sumar cosas sin criterio.',
      ],
    },
    alimentacion: {
      title: 'La mejor decisión es la que puedes sostener',
      paragraphs: [
        'Una buena elección nutricional no solo debe sonar correcta, también tiene que ser viable para tu presupuesto, tu ritmo de vida y la respuesta real de tu mascota.',
        'Cuando una rutina de comida se vuelve clara y sostenible, el bienestar suele notarse mucho más allá del plato.',
      ],
    },
    salud: {
      title: 'Prevenir también es acompañar',
      paragraphs: [
        'Los cuidados preventivos funcionan mejor cuando se integran a la semana sin dramatismo: revisar, observar y actuar a tiempo suele evitar problemas mayores.',
        'Si algo cambia de forma persistente, el siguiente paso no es adivinar más, sino consultar con un profesional.',
      ],
    },
    accesorios: {
      title: 'Comprar mejor también es cuidar',
      paragraphs: [
        'Un buen accesorio no solo se ve bien: acompaña una necesidad concreta, dura con el uso real y facilita la convivencia dentro de casa.',
        'Elegir con más pausa casi siempre significa gastar menos veces y con mejores resultados.',
      ],
    },
    comparativas: {
      title: 'Antes de decidir, vuelve a tu contexto',
      paragraphs: [
        'Las comparativas sirven más cuando las conectas con tu rutina, el espacio disponible, la personalidad de tu mascota y la frecuencia real de uso.',
        'La opción adecuada no siempre es la más popular, sino la que resuelve mejor tu escenario concreto.',
      ],
    },
    blog: {
      title: 'Lleva la lectura a tu día a día',
      paragraphs: [
        'La mejor lectura es la que puedes convertir en una acción pequeña, repetible y realista dentro de tu semana.',
        'Cuando un consejo se adapta a tu rutina, deja de ser teoría y empieza a mejorar convivencia y bienestar.',
      ],
    },
    inicio: {
      title: 'Lleva la lectura a tu día a día',
      paragraphs: [
        'La mejor lectura es la que puedes convertir en una acción pequeña, repetible y realista dentro de tu semana.',
        'Cuando un consejo se adapta a tu rutina, deja de ser teoría y empieza a mejorar convivencia y bienestar.',
      ],
    },
    contacto: {
      title: 'Lleva la lectura a tu día a día',
      paragraphs: [
        'La mejor lectura es la que puedes convertir en una acción pequeña, repetible y realista dentro de tu semana.',
        'Cuando un consejo se adapta a tu rutina, deja de ser teoría y empieza a mejorar convivencia y bienestar.',
      ],
    },
  } satisfies Record<Article['category'], Article['body'][number]>

  return sectionByCategory[article.category]
}

export function normalizeArticle(article: Article): Article {
  const slug = article.slug || createSlug(article.title) || article.id
  const hasEditorialClosing = article.body.some((section) => section.title === getEditorialClosingSection(article).title)

  return {
    ...article,
    slug,
    status: article.status ?? 'published',
    body: hasEditorialClosing ? article.body : [...article.body, getEditorialClosingSection(article)],
  }
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

function isArticleEntity(value: unknown): value is Article {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.slug === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.excerpt === 'string' &&
    Array.isArray(candidate.body) &&
    Array.isArray(candidate.tags) &&
    Array.isArray(candidate.takeaways)
  )
}

function isProductEntity(value: unknown): value is ProductRecommendation {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.slug === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.description === 'string' &&
    typeof candidate.longDescription === 'string' &&
    Array.isArray(candidate.useCases)
  )
}

export function mapArticleDto(dto: SupabaseArticleDTO): Article {
  return normalizeArticle({
    id: dto.id,
    slug: dto.slug ?? (createSlug(dto.title) || dto.id),
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
    status: dto.status ?? 'published',
  })
}

function mapProductDto(dto: SupabaseProductDTO): ProductRecommendation {
  return {
    id: dto.id,
    slug: dto.slug ?? (createSlug(dto.name) || dto.id),
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
    ctaLabel: dto.cta_label ?? 'Ver recomendación',
    seoTitle: dto.seo_title ?? dto.name,
    seoDescription: dto.seo_description ?? dto.description,
  }
}

async function loadArticlesFromSupabase(status: ArticleStatus = 'published') {
  if (!isSupabaseConfigured || !supabase) {
    throw new ContentServiceError('Supabase no está configurado.')
  }

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', status)
    .order('published_at', { ascending: false })

  if (error) {
    throw new ContentServiceError(error.message)
  }

  if (!data?.length) {
    throw new ContentServiceError('No se encontraron artículos remotos.')
  }

  const validated = data.filter(isArticleDto)
  if (!validated.length) {
    throw new ContentServiceError('La respuesta remota de artículos no cumple el formato esperado.')
  }

  return sortArticles(validated.map(mapArticleDto))
}

async function loadProductsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new ContentServiceError('Supabase no está configurado.')
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
    const remote = await loadArticlesFromSupabase('published')
    await cacheArticles(remote)
    return remote
  } catch {
    const cached = await getCachedArticles()
    const validCached = cached.filter(isArticleEntity).map(normalizeArticle).filter((article) => article.status === 'published')
    if (validCached.length) {
      return sortArticles(validCached)
    }

    const normalizedMocks = mockArticles.map(normalizeArticle).map((article) => ({ ...article, status: 'published' as const }))
    await cacheArticles(normalizedMocks)
    return sortArticles(normalizedMocks)
  }
}

export async function getProducts(): Promise<ProductRecommendation[]> {
  try {
    const remote = await loadProductsFromSupabase()
    await cacheProducts(remote)
    return remote
  } catch {
    const cached = await getCachedProducts()
    const validCached = cached.filter(isProductEntity)
    if (validCached.length) {
      return validCached
    }

    await cacheProducts(mockProducts)
    return mockProducts
  }
}

export function getArticleBySlug(articles: Article[], slug?: string) {
  return articles.find((article) => article.slug === slug || createSlug(article.title) === slug)
}

export function getRelatedArticles(articles: Article[], current: Article) {
  return articles.filter((article) => article.id !== current.id && article.category === current.category).slice(0, 3)
}

export function getProductBySlug(products: ProductRecommendation[], slugOrId?: string) {
  return products.find(
    (product) => product.slug === slugOrId || product.id === slugOrId || createSlug(product.name) === slugOrId,
  )
}

export function getRelatedProducts(products: ProductRecommendation[], current: ProductRecommendation) {
  return products.filter((product) => product.id !== current.id && product.category === current.category).slice(0, 3)
}
