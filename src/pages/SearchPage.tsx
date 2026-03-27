import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { Seo } from '@/components/common/Seo'
import type { Article, PetCategory } from '@/types/content'

interface SearchPageProps {
  articles: Article[]
}

const searchSections: Array<{ label: string; value: SearchSection }> = [
  { label: 'Todas las lecturas', value: 'todas' },
  { label: 'Blog', value: 'blog' },
  { label: 'Comparativas', value: 'comparativas' },
  { label: 'Perros', value: 'perros' },
  { label: 'Gatos', value: 'gatos' },
  { label: 'Alimentación', value: 'alimentacion' },
  { label: 'Salud y cuidados', value: 'salud' },
  { label: 'Guías de compra', value: 'accesorios' },
]

type SearchSection = Exclude<PetCategory, 'inicio' | 'contacto'> | 'todas'

function normalizeSearchText(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function matchesArticle(article: Article, query: string) {
  if (!query) {
    return true
  }

  const searchableText = [
    article.title,
    article.excerpt,
    article.author,
    article.heroNote,
    article.tags.join(' '),
    article.takeaways.join(' '),
    article.body.flatMap((section) => [section.title, ...section.paragraphs]).join(' '),
  ].join(' ')

  return normalizeSearchText(searchableText).includes(query)
}

export function SearchPage({ articles }: SearchPageProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''
  const section = (searchParams.get('seccion') as SearchSection | null) ?? 'todas'
  const [draftQuery, setDraftQuery] = useState(query)

  useEffect(() => {
    setDraftQuery(query)
  }, [query])

  const normalizedQuery = useMemo(() => normalizeSearchText(query), [query])

  const filteredArticles = useMemo(() => {
    const results = articles.filter((article) => {
      const sectionMatch = section === 'todas' ? true : article.category === section
      return sectionMatch && matchesArticle(article, normalizedQuery)
    })

    return [...results].sort((left, right) => {
      if (Boolean(left.featured) !== Boolean(right.featured)) {
        return left.featured ? -1 : 1
      }

      return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    })
  }, [articles, normalizedQuery, section])

  const suggestedArticles = useMemo(
    () =>
      [...articles]
        .sort((left, right) => {
          if (Boolean(left.featured) !== Boolean(right.featured)) {
            return left.featured ? -1 : 1
          }

          return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
        })
        .slice(0, 6),
    [articles],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextParams = new URLSearchParams(searchParams)

    if (draftQuery.trim()) {
      nextParams.set('q', draftQuery.trim())
    } else {
      nextParams.delete('q')
    }

    if (section === 'todas') {
      nextParams.delete('seccion')
    }

    setSearchParams(nextParams)
  }

  const handleSectionChange = (value: SearchSection) => {
    const nextParams = new URLSearchParams(searchParams)

    if (value === 'todas') {
      nextParams.delete('seccion')
    } else {
      nextParams.set('seccion', value)
    }

    setSearchParams(nextParams)
  }

  const helperText = query
    ? `Resultados para "${query}"${section !== 'todas' ? ` en ${searchSections.find((item) => item.value === section)?.label?.toLowerCase()}` : ''}.`
    : 'Busca por título, tema, autor o palabra clave para encontrar lecturas más rápido.'

  return (
    <div className="space-y-10">
      <Seo
        canonicalPath="/buscar"
        description="Encuentra artículos, comparativas y lecturas útiles en Vida Mascotera."
        title={query ? `Buscar: ${query} | Vida Mascotera` : 'Buscar lecturas | Vida Mascotera'}
      />

      <section className="rounded-[2.5rem] bg-white px-6 py-10 shadow-soft md:px-10">
        <div className="max-w-4xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Buscar lecturas</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">Encuentra artículos y comparativas sin dar vueltas.</h1>
          <p className="text-base leading-8 text-slate-600 md:text-lg">{helperText}</p>

          <form className="grid gap-4 md:grid-cols-[1fr_16rem_auto]" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="global-search-query">
              Buscar artículos
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                className="w-full rounded-2xl border border-slate-200 px-12 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                id="global-search-query"
                onChange={(event) => setDraftQuery(event.target.value)}
                placeholder="Ejemplo: cachorro, rutina, arnés o alimentación"
                type="search"
                value={draftQuery}
              />
            </div>

            <label className="sr-only" htmlFor="global-search-section">
              Filtrar sección
            </label>
            <select
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              id="global-search-section"
              onChange={(event) => handleSectionChange(event.target.value as SearchSection)}
              value={section}
            >
              {searchSections.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            <button
              className="inline-flex items-center justify-center rounded-full bg-brand-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              type="submit"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {query ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Resultados</h2>
              <p className="mt-1 text-sm text-slate-500">Mostramos las lecturas que mejor coinciden con tu búsqueda.</p>
            </div>
            <p className="text-sm text-slate-500">{filteredArticles.length} resultados</p>
          </div>

          {filteredArticles.length ? (
            <div className="grid gap-6 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <ArticleCard article={article} key={article.id} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white p-8 text-center shadow-soft">
              <h2 className="text-2xl font-semibold text-slate-900">No encontramos lecturas con esa búsqueda</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Prueba con otra palabra clave o cambia el filtro para ampliar los resultados.
              </p>
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Empieza por aquí</h2>
            <p className="mt-1 text-sm text-slate-500">Mientras buscas algo concreto, estas lecturas te ayudan a orientarte rápido.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {suggestedArticles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
