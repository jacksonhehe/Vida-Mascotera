import { useEffect, useMemo } from 'react'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { Seo } from '@/components/common/Seo'
import { PageHero } from '@/components/sections/PageHero'
import { categoryCopy } from '@/lib/constants'
import { useAppStore } from '@/store/app-store'
import type { Article, PetCategory } from '@/types/content'

interface ContentPageProps {
  category: Exclude<PetCategory, 'inicio' | 'contacto'>
  articles: Article[]
}

const categoryPaths: Record<Exclude<PetCategory, 'inicio' | 'contacto'>, string> = {
  perros: '/perros',
  gatos: '/gatos',
  alimentacion: '/alimentacion',
  salud: '/salud-cuidados',
  accesorios: '/accesorios',
  comparativas: '/comparativas',
  blog: '/blog',
}

export function ContentPage({ category, articles }: ContentPageProps) {
  const copy = categoryCopy[category]
  const selectedCategory = useAppStore((state) => state.selectedCategory)
  const searchTerm = useAppStore((state) => state.searchTerm)
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory)
  const setSearchTerm = useAppStore((state) => state.setSearchTerm)

  useEffect(() => {
    setSelectedCategory('todas')
    setSearchTerm('')
  }, [category, setSearchTerm, setSelectedCategory])

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const categoryMatch =
          selectedCategory === 'todas' ? article.category === category : article.category === selectedCategory
        const searchMatch =
          searchTerm.length === 0 ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase())

        return categoryMatch && searchMatch
      }),
    [articles, category, searchTerm, selectedCategory],
  )

  const editorialPicks = useMemo(
    () =>
      articles
        .filter((article) => article.category !== category)
        .filter((article) => (category === 'comparativas' ? article.category === 'blog' : article.category === 'comparativas' || article.category === 'blog'))
        .slice(0, 3),
    [articles, category],
  )

  const emptyTitle =
    searchTerm.length > 0 ? 'No encontramos resultados con esa busqueda' : 'Aun no tenemos contenido visible en esta seccion'

  const emptyBody =
    searchTerm.length > 0
      ? 'Prueba con otra palabra clave o vuelve a la vista completa para descubrir mas lecturas y comparativas.'
      : 'Estamos preparando nuevas publicaciones para esta categoria. Mientras tanto, puedes explorar el blog o nuestras comparativas.'

  return (
    <div className="space-y-10">
      <Seo canonicalPath={categoryPaths[category]} description={copy.intro} title={`Vida Mascotera | ${copy.title}`} />
      <PageHero emphasis={copy.emphasis} intro={copy.intro} title={copy.title} />

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[0.7fr_0.3fr]">
          <label className="sr-only" htmlFor="content-search">
            Buscar contenido
          </label>
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            id="content-search"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por tema, necesidad o palabra clave"
            type="search"
            value={searchTerm}
          />
          <label className="sr-only" htmlFor="content-filter">
            Filtrar categoria
          </label>
          <select
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
            id="content-filter"
            onChange={(event) => setSelectedCategory(event.target.value as PetCategory | 'todas')}
            value={selectedCategory}
          >
            <option value="todas">Mostrar solo esta seccion</option>
            <option value={category}>{category}</option>
            <option value="blog">blog</option>
            <option value="comparativas">comparativas</option>
          </select>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Contenido relacionado</h2>
            <p className="mt-1 text-sm text-slate-500">Encuentra ideas utiles para esta etapa, necesidad o tipo de mascota.</p>
          </div>
          <p className="text-sm text-slate-500">{filteredArticles.length} resultados</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {filteredArticles.length ? (
            filteredArticles.map((article) => <ArticleCard article={article} key={article.id} />)
          ) : (
            <div className="rounded-[1.75rem] bg-white p-8 text-center shadow-soft lg:col-span-3">
              <h3 className="text-2xl font-semibold text-slate-900">{emptyTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{emptyBody}</p>
            </div>
          )}
        </div>
      </section>

      {editorialPicks.length > 0 ? (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Sigue leyendo</h2>
            <p className="mt-1 text-sm text-slate-500">Una seleccion editorial para ampliar contexto sin empujar recomendaciones de compra.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {editorialPicks.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
