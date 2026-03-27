import { useEffect, useMemo, useState } from 'react'
import { Copy, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { StatusBanner } from '@/components/common/StatusBanner'
import { deleteAdminArticle, duplicateAdminArticle, listAdminArticles } from '@/services/admin-article-service'
import type { AdminArticleFilters, Article } from '@/types/content'
import { formatLongDate } from '@/utils/format'

const initialFilters: AdminArticleFilters = {
  search: '',
  category: 'todas',
  status: 'todos',
  month: '',
}

export function AdminArticlesPage() {
  const [filters, setFilters] = useState(initialFilters)
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)

    try {
      setArticles(await listAdminArticles(filters))
    } catch {
      setError('No pudimos cargar los artículos del panel.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [filters.category, filters.month, filters.search, filters.status])

  const stats = useMemo(
    () => ({
      total: articles.length,
      drafts: articles.filter((article) => article.status === 'draft').length,
      published: articles.filter((article) => article.status === 'published').length,
    }),
    [articles],
  )

  async function handleDelete(article: Article) {
    if (!window.confirm(`¿Eliminar "${article.title}"? Esta acción no se puede deshacer.`)) {
      return
    }

    await deleteAdminArticle(article.id)
    void load()
  }

  async function handleDuplicate(article: Article) {
    await duplicateAdminArticle(article)
    void load()
  }

  return (
    <div className="space-y-6">
      <Seo canonicalPath="/admin/articulos" description="Gestión editorial privada de artículos." title="Admin artículos | Vida Mascotera" />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Total', value: stats.total },
          { label: 'Borradores', value: stats.drafts },
          { label: 'Publicados', value: stats.published },
        ].map((item) => (
          <div className="rounded-[1.75rem] bg-white p-5 shadow-soft" key={item.label}>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Artículos</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600">Busca, filtra y gestiona el contenido editorial desde una sola vista.</p>
          </div>
          <Button to="/admin/articulos/nuevo">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo artículo
          </Button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_180px_180px_180px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))}
              placeholder="Buscar por título o autor"
              value={filters.search}
            />
          </label>

          <select
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            onChange={(event) => setFilters((current) => ({ ...current, category: event.target.value as AdminArticleFilters['category'] }))}
            value={filters.category}
          >
            <option value="todas">Todas las categorías</option>
            <option value="perros">Perros</option>
            <option value="gatos">Gatos</option>
            <option value="alimentacion">Alimentación</option>
            <option value="salud">Salud</option>
            <option value="accesorios">Guias de compra</option>
            <option value="comparativas">Comparativas</option>
            <option value="blog">Blog</option>
          </select>

          <select
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value as AdminArticleFilters['status'] }))}
            value={filters.status}
          >
            <option value="todos">Todos los estados</option>
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
            <option value="archived">Archivado</option>
          </select>

          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            onChange={(event) => setFilters((current) => ({ ...current, month: event.target.value }))}
            type="month"
            value={filters.month}
          />
        </div>

        {error ? <div className="mt-6"><StatusBanner message={error} tone="warning" /></div> : null}

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm text-slate-500">
                <th className="px-4 py-3">Artículo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Actualizado</th>
                <th className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={5}>
                    Cargando artículos...
                  </td>
                </tr>
              ) : articles.length ? (
                articles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-4 py-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-slate-900">{article.title}</p>
                          {article.featured ? (
                            <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-800">
                              Destacado
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{article.author}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{article.status ?? 'published'}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{article.category}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{formatLongDate(article.updatedAt ?? article.publishedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700" to={`/admin/articulos/editar/${article.id}`}>
                          <Pencil className="h-4 w-4" />
                          Editar
                        </Link>
                        <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700" onClick={() => void handleDuplicate(article)} type="button">
                          <Copy className="h-4 w-4" />
                          Duplicar
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-sm text-rose-700" onClick={() => void handleDelete(article)} type="button">
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-500" colSpan={5}>
                    No hay artículos que coincidan con los filtros actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
