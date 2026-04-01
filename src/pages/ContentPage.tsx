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
  const searchTerm = useAppStore((state) => state.searchTerm)
  const setSearchTerm = useAppStore((state) => state.setSearchTerm)

  useEffect(() => {
    setSearchTerm('')
  }, [category, setSearchTerm])

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const searchMatch =
          searchTerm.length === 0 ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase())

        return article.category === category && searchMatch
      }),
    [articles, category, searchTerm],
  )

  const editorialPicks = useMemo(
    () =>
      articles
        .filter((article) => article.category !== category)
        .filter((article) =>
          category === 'comparativas'
            ? article.category === 'blog'
            : article.category === 'comparativas' || article.category === 'blog',
        )
        .slice(0, 3),
    [articles, category],
  )

  const emptyTitle =
    searchTerm.length > 0 ? 'No encontramos resultados con esa búsqueda' : 'Aún no tenemos contenido visible en esta sección'

  const emptyBody =
    searchTerm.length > 0
      ? 'Prueba con otra palabra clave o vuelve a la vista completa para descubrir más lecturas y comparativas.'
      : 'Estamos preparando nuevas publicaciones para esta categoría. Mientras tanto, puedes explorar el blog o nuestras comparativas.'

  return (
    <div className="space-y-10">
      <Seo canonicalPath={categoryPaths[category]} description={copy.intro} title={`Vida Mascotera | ${copy.title}`} />
      <PageHero
        emphasis={copy.emphasis}
        intro={copy.intro}
        primaryCta={
          category === 'comparativas'
            ? { label: 'Ir al blog', to: '/blog' }
            : category === 'blog'
              ? { label: 'Ver comparativas', to: '/comparativas' }
              : { label: 'Seguir leyendo', to: '/blog' }
        }
        secondaryCta={
          category === 'comparativas' || category === 'blog'
            ? undefined
            : { label: 'Ver comparativas', to: '/comparativas' }
        }
        title={copy.title}
      />

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Contenido relacionado</h2>
            <p className="mt-1 text-sm text-slate-500">Encuentra ideas útiles para esta etapa, necesidad o tipo de mascota.</p>
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
            <p className="mt-1 text-sm text-slate-500">Más lecturas relacionadas para profundizar en este tema.</p>
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
