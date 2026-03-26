import { useEffect, useMemo, useRef, useState } from 'react'
import { ImagePlus, Plus, Save, Trash2, UploadCloud } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { StatusBanner } from '@/components/common/StatusBanner'
import {
  clearAdminDraft,
  createAdminArticle,
  getAdminArticleById,
  getAdminDraft,
  saveAdminDraft,
  updateAdminArticle,
  uploadArticleImage,
} from '@/services/admin-article-service'
import { getProducts } from '@/services/content-service'
import type { Article, ArticleSection, ArticleStatus, ProductRecommendation } from '@/types/content'
import { createSlug } from '@/utils/slug'

function createEmptyArticle(): Article {
  const now = new Date().toISOString()

  return {
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    category: 'blog',
    readTime: '3 min',
    author: '',
    publishedAt: now,
    updatedAt: now,
    image: '',
    tags: [],
    heroNote: '',
    body: [{ title: 'Introducción', paragraphs: [''] }],
    takeaways: [''],
    ctaLabel: 'Seguir leyendo',
    seoTitle: '',
    seoDescription: '',
    status: 'draft',
  }
}

function blocksToText(block: ArticleSection) {
  return block.paragraphs.join('\n\n')
}

function textToParagraphs(value: string) {
  return value
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function AdminArticleEditorPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isNew = !id
  const draftKey = isNew ? 'admin-article-new' : `admin-article-${id}`

  const [article, setArticle] = useState<Article>(createEmptyArticle())
  const [products, setProducts] = useState<ProductRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'pending'>('idle')
  const [notice, setNotice] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(false)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    void getProducts().then(setProducts).catch(() => setProducts([]))
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)

      const localDraft = await getAdminDraft(draftKey)
      const remoteArticle = id ? await getAdminArticleById(id) : null

      if (localDraft?.data) {
        setArticle(localDraft.data)
        setNotice('Recuperamos un borrador local reciente para que sigas trabajando.')
      } else if (remoteArticle) {
        setArticle(remoteArticle)
      } else {
        setArticle(createEmptyArticle())
      }

      setLoading(false)
    }

    void load()
  }, [draftKey, id])

  useEffect(() => {
    if (loading) {
      return
    }

    setSaveState('pending')

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current)
    }

    debounceRef.current = window.setTimeout(() => {
      setSaveState('saving')
      void saveAdminDraft(draftKey, id, article)
        .then(() => setSaveState('saved'))
        .catch(() => setSaveState('idle'))
    }, 900)

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current)
      }
    }
  }, [article, draftKey, id, loading])

  function updateArticle(patch: Partial<Article>) {
    setArticle((current) => ({
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    }))
  }

  async function persist(status: ArticleStatus) {
    const payload = {
      title: article.title,
      slug: article.slug || createSlug(article.title),
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      image: article.image,
      tags: article.tags.filter(Boolean),
      heroNote: article.heroNote,
      takeaways: article.takeaways.filter(Boolean),
      body: article.body.filter((section) => section.title.trim() || section.paragraphs.some(Boolean)),
      seoTitle: article.seoTitle || article.title,
      seoDescription: article.seoDescription || article.excerpt,
      publishedAt: status === 'published' ? article.publishedAt || new Date().toISOString() : article.publishedAt,
      updatedAt: new Date().toISOString(),
      status,
    }

    setSaveState('saving')

    const saved = id ? await updateAdminArticle(id, payload) : await createAdminArticle(payload)
    await clearAdminDraft(draftKey)
    setArticle(saved)
    setSaveState('saved')
    setNotice(status === 'published' ? 'Artículo publicado correctamente.' : 'Borrador guardado.')

    if (!id) {
      navigate(`/admin/articulos/editar/${saved.id}`, { replace: true })
    }
  }

  async function handleImageUpload(file: File | null) {
    if (!file) {
      return
    }

    setSaveState('saving')
    const imageUrl = await uploadArticleImage(file)
    updateArticle({ image: imageUrl })
    setSaveState('saved')
  }

  const previewArticle = useMemo(
    () => ({
      ...article,
      title: article.title || 'Vista previa del artículo',
      excerpt: article.excerpt || 'Aquí verás cómo quedará el artículo antes de publicarlo.',
      heroNote: article.heroNote || 'Usa esta vista para revisar jerarquía visual, imagen, titulares y bloques de contenido.',
      author: article.author || 'Equipo editorial',
      image:
        article.image ||
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80',
      seoTitle: article.seoTitle || article.title || 'Vista previa',
      seoDescription: article.seoDescription || article.excerpt || 'Vista previa del contenido editorial.',
      slug: article.slug || createSlug(article.title || 'vista-previa'),
      status: article.status ?? 'draft',
      body: article.body.length ? article.body : [{ title: 'Introducción', paragraphs: ['Añade bloques para empezar a previsualizar tu artículo.'] }],
      takeaways: article.takeaways.filter(Boolean).length ? article.takeaways.filter(Boolean) : ['Añade ideas clave para verlas aquí.'],
    }),
    [article],
  )

  if (loading) {
    return <div className="rounded-[2rem] bg-white p-8 shadow-soft">Cargando editor...</div>
  }

  return (
    <div className="space-y-6">
      <Seo
        canonicalPath={id ? `/admin/articulos/editar/${id}` : '/admin/articulos/nuevo'}
        description="Editor administrativo privado de artículos."
        title={id ? 'Editar artículo | Admin Vida Mascotera' : 'Nuevo artículo | Admin Vida Mascotera'}
      />

      {notice ? <StatusBanner message={notice} tone="info" /> : null}

      <div className="space-y-4">
        <div className="inline-flex rounded-full bg-white p-1 shadow-soft">
          <button
            aria-pressed={activeTab === 'editor'}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === 'editor' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('editor')}
            type="button"
          >
            Editor
          </button>
          <button
            aria-pressed={activeTab === 'preview'}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === 'preview' ? 'bg-brand-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
            onClick={() => setActiveTab('preview')}
            type="button"
          >
            Vista previa
          </button>
        </div>

        {activeTab === 'editor' ? (
          <section className="space-y-6 rounded-[2rem] bg-white p-6 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{id ? 'Editar artículo' : 'Nuevo artículo'}</h1>
              <p className="mt-2 text-sm text-slate-500">
                {saveState === 'saving'
                  ? 'Guardando...'
                  : saveState === 'saved'
                    ? 'Borrador guardado'
                    : saveState === 'pending'
                      ? 'Cambios pendientes'
                      : 'Listo para editar'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => void persist('draft')} variant="secondary">
                <Save className="mr-2 h-4 w-4" />
                Guardar borrador
              </Button>
              {article.status === 'published' ? (
                <Button onClick={() => void persist('draft')} variant="secondary">
                  Despublicar
                </Button>
              ) : (
                <Button onClick={() => void persist('published')}>Publicar</Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Título</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => {
                  const title = event.target.value
                  updateArticle({
                    title,
                    slug: slugTouched ? article.slug : createSlug(title),
                    seoTitle: article.seoTitle ? article.seoTitle : title,
                  })
                }}
                value={article.title}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Slug</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => {
                  setSlugTouched(true)
                  updateArticle({ slug: createSlug(event.target.value) })
                }}
                value={article.slug}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Extracto</span>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              onChange={(event) => updateArticle({ excerpt: event.target.value, seoDescription: article.seoDescription || event.target.value })}
              value={article.excerpt}
            />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Categoría</span>
              <select
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ category: event.target.value as Article['category'] })}
                value={article.category}
              >
                <option value="perros">Perros</option>
                <option value="gatos">Gatos</option>
                <option value="alimentacion">Alimentación</option>
                <option value="salud">Salud</option>
                <option value="accesorios">Guias de compra</option>
                <option value="comparativas">Comparativas</option>
                <option value="blog">Blog</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Autor</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ author: event.target.value })}
                value={article.author}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Fecha de publicación</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ publishedAt: event.target.value })}
                type="datetime-local"
                value={article.publishedAt.slice(0, 16)}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Imagen destacada</span>
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ image: event.target.value })}
                placeholder="https://..."
                value={article.image}
              />
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                <UploadCloud className="mr-2 h-4 w-4" />
                Subir imagen
                <input className="hidden" onChange={(event) => void handleImageUpload(event.target.files?.[0] ?? null)} type="file" />
              </label>
            </div>
            {article.image ? <img alt="Vista previa" className="h-48 rounded-[1.5rem] object-cover" src={article.image} /> : null}
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Etiquetas</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
                placeholder="perros, paseo, rutinas"
                value={article.tags.join(', ')}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Ideas clave</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ takeaways: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
                placeholder="Idea 1, Idea 2, Idea 3"
                value={article.takeaways.join(', ')}
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Hero note</span>
            <textarea
              className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              onChange={(event) => updateArticle({ heroNote: event.target.value })}
              value={article.heroNote}
            />
          </label>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Bloques del cuerpo</h2>
              <Button
                onClick={() =>
                  updateArticle({
                    body: [...article.body, { title: 'Nuevo bloque', paragraphs: [''] }],
                  })
                }
                variant="secondary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Añadir bloque
              </Button>
            </div>

            {article.body.map((block, index) => (
              <div className="rounded-[1.5rem] border border-slate-200 p-4" key={index}>
                <div className="flex items-center justify-between gap-3">
                  <input
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    onChange={(event) => {
                      const next = [...article.body]
                      next[index] = { ...next[index], title: event.target.value }
                      updateArticle({ body: next })
                    }}
                    value={block.title}
                  />
                  <button
                    className="rounded-full bg-rose-50 p-3 text-rose-700"
                    onClick={() => {
                      const next = article.body.filter((_, sectionIndex) => sectionIndex !== index)
                      updateArticle({ body: next.length ? next : [{ title: 'Introducción', paragraphs: [''] }] })
                    }}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  className="mt-4 min-h-40 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  onChange={(event) => {
                    const next = [...article.body]
                    next[index] = { ...next[index], paragraphs: textToParagraphs(event.target.value) }
                    updateArticle({ body: next })
                  }}
                  placeholder="Separa párrafos con una línea en blanco"
                  value={blocksToText(block)}
                />
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">SEO title</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ seoTitle: event.target.value })}
                value={article.seoTitle}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">SEO description</span>
              <textarea
                className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                onChange={(event) => updateArticle({ seoDescription: event.target.value })}
                value={article.seoDescription}
              />
            </label>
          </div>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="rounded-[2rem] bg-white p-4 shadow-soft">
              <div className="mb-4 flex items-center gap-3 text-sm text-slate-500">
                <ImagePlus className="h-4 w-4" />
                Vista previa editorial
              </div>
              <ArticleDetailPage article={previewArticle} products={products} relatedArticles={[]} />
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
