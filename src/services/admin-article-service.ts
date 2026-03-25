import { deleteArticleDraft, getArticleDraft, saveArticleDraft } from '@/lib/indexed-db'
import { supabase } from '@/lib/supabase'
import { getCurrentUserRole } from '@/services/auth-service'
import { mapArticleDto } from '@/services/content-service'
import type { AdminArticleFilters, Article, ArticleEditorDraft, ArticleSection, ArticleUpsertInput, SupabaseArticleDTO } from '@/types/content'
import { createSlug } from '@/utils/slug'

const ARTICLE_IMAGE_BUCKET = 'article-images'

function ensureSupabase() {
  if (!supabase) {
    throw new Error('El panel necesita Supabase configurado para funcionar.')
  }

  return supabase
}

function calculateReadTime(body: ArticleSection[]) {
  const wordCount = body.flatMap((section) => section.paragraphs).join(' ').split(/\s+/).filter(Boolean).length
  const minutes = Math.max(3, Math.ceil(wordCount / 180))
  return `${minutes} min`
}

function toArticlePayload(input: ArticleUpsertInput) {
  return {
    slug: input.slug || createSlug(input.title),
    title: input.title,
    excerpt: input.excerpt,
    category: input.category,
    read_time: calculateReadTime(input.body),
    author: input.author,
    published_at: input.publishedAt,
    updated_at: input.updatedAt,
    image: input.image,
    tags: input.tags,
    hero_note: input.heroNote,
    body: input.body,
    takeaways: input.takeaways,
    cta_label: 'Seguir leyendo',
    seo_title: input.seoTitle,
    seo_description: input.seoDescription,
    comparison_table: input.category === 'comparativas' ? null : null,
    status: input.status,
  }
}

export async function requireAdminRole() {
  const role = await getCurrentUserRole()
  return role === 'admin'
}

export async function listAdminArticles(filters: AdminArticleFilters) {
  const client = ensureSupabase()
  let query = client.from('articles').select('*').order('updated_at', { ascending: false })

  if (filters.category !== 'todas') {
    query = query.eq('category', filters.category)
  }

  if (filters.status !== 'todos') {
    query = query.eq('status', filters.status)
  }

  if (filters.month) {
    const [year, month] = filters.month.split('-')
    const start = `${year}-${month}-01T00:00:00.000Z`
    const endDate = new Date(Number(year), Number(month), 0)
    const end = `${filters.month}-${String(endDate.getDate()).padStart(2, '0')}T23:59:59.999Z`
    query = query.gte('updated_at', start).lte('updated_at', end)
  }

  const { data, error } = await query
  if (error) {
    throw error
  }

  return (data as SupabaseArticleDTO[])
    .map(mapArticleDto)
    .filter((article) => {
      if (!filters.search.trim()) {
        return true
      }

      const search = filters.search.toLowerCase()
      return (
        article.title.toLowerCase().includes(search) ||
        article.excerpt.toLowerCase().includes(search) ||
        article.author.toLowerCase().includes(search)
      )
    })
}

export async function getAdminArticleById(id: string) {
  const client = ensureSupabase()
  const { data, error } = await client.from('articles').select('*').eq('id', id).maybeSingle<SupabaseArticleDTO>()
  if (error) {
    throw error
  }

  return data ? mapArticleDto(data) : null
}

export async function createAdminArticle(input: ArticleUpsertInput) {
  const client = ensureSupabase()
  const payload = toArticlePayload(input)
  const { data, error } = await client.from('articles').insert(payload).select('*').single<SupabaseArticleDTO>()
  if (error) {
    throw error
  }

  return mapArticleDto(data)
}

export async function updateAdminArticle(id: string, input: ArticleUpsertInput) {
  const client = ensureSupabase()
  const payload = toArticlePayload(input)
  const { data, error } = await client.from('articles').update(payload).eq('id', id).select('*').single<SupabaseArticleDTO>()
  if (error) {
    throw error
  }

  return mapArticleDto(data)
}

export async function deleteAdminArticle(id: string) {
  const client = ensureSupabase()
  const { error } = await client.from('articles').delete().eq('id', id)
  if (error) {
    throw error
  }
}

export async function duplicateAdminArticle(article: Article) {
  return createAdminArticle({
    id: undefined,
    title: `${article.title} (Copia)`,
    slug: `${article.slug}-copia`,
    excerpt: article.excerpt,
    category: article.category,
    author: article.author,
    image: article.image,
    tags: article.tags,
    heroNote: article.heroNote,
    takeaways: article.takeaways,
    body: article.body,
    seoTitle: `${article.seoTitle} | Copia`,
    seoDescription: article.seoDescription,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
  })
}

export async function uploadArticleImage(file: File) {
  const client = ensureSupabase()
  const fileName = `${Date.now()}-${createSlug(file.name.replace(/\.[^.]+$/, ''))}.${file.name.split('.').pop() || 'jpg'}`
  const path = `articles/${fileName}`
  const { error } = await client.storage.from(ARTICLE_IMAGE_BUCKET).upload(path, file, { upsert: true })
  if (error) {
    throw error
  }

  const { data } = client.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function saveAdminDraft(draftId: string, articleId: string | undefined, data: Article) {
  const record: ArticleEditorDraft = {
    id: draftId,
    articleId,
    data,
    updatedAt: new Date().toISOString(),
  }

  await saveArticleDraft(record)
  return record
}

export async function getAdminDraft(draftId: string) {
  return getArticleDraft(draftId)
}

export async function clearAdminDraft(draftId: string) {
  await deleteArticleDraft(draftId)
}
