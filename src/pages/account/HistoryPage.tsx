import { Link } from 'react-router-dom'
import { Seo } from '@/components/common/Seo'
import { useAppBootstrap } from '@/hooks/useAppBootstrap'
import { useAppStore } from '@/store/app-store'
import { formatLongDate } from '@/utils/format'
import { parseSavedItemKey } from '@/utils/saved-items'

export function HistoryPage() {
  const { articles, products } = useAppBootstrap()
  const history = useAppStore((state) => state.history)

  const items = history
    .map((entry) => {
      const parsed = parseSavedItemKey(entry.key)
      if (!parsed) {
        return null
      }

      if (parsed.type === 'article') {
        const article = articles.find((item) => item.id === parsed.id)
        if (!article) {
          return null
        }

        return {
          key: entry.key,
          title: article.title,
          description: article.excerpt,
          to: article.category === 'comparativas' ? `/comparativas/${article.slug}` : `/blog/${article.slug}`,
          visitedAt: entry.visitedAt,
        }
      }

      const product = products.find((item) => item.id === parsed.id)
      if (!product) {
        return null
      }

      return {
        key: entry.key,
        title: product.name,
        description: product.description,
        to: `/recomendaciones/${product.slug}`,
        visitedAt: entry.visitedAt,
      }
    })
    .filter(Boolean)

  return (
    <div className="space-y-8">
      <Seo
        canonicalPath="/historial"
        description="Vuelve a tus lecturas y recomendaciones recientes sin tener que buscarlas desde cero."
        title="Historial | Vida Mascotera"
      />

      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Historial</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Tus lecturas recientes, ordenadas para volver fácil.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Cuando abras artículos, comparativas o recomendaciones, aparecerán aquí para que retomes sin empezar desde cero.
        </p>
      </section>

      <section className="space-y-4">
        {items.length ? (
          items.map((item) =>
            item ? (
              <Link className="block rounded-[2rem] bg-white p-6 shadow-soft transition hover:-translate-y-1" key={item.key} to={item.to}>
                <p className="text-sm text-slate-500">Visto el {formatLongDate(item.visitedAt)}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </Link>
            ) : null,
          )
        ) : (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-900">Todavía no hay historial reciente</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">Empieza a leer y aquí tendrás una forma rápida de volver a lo último que viste.</p>
          </div>
        )}
      </section>
    </div>
  )
}
