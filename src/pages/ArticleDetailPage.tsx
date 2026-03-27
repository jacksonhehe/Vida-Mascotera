import { ArrowRight, Clock3, Heart, Sparkles } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { useAppStore } from '@/store/app-store'
import { formatLongDate } from '@/utils/format'
import { buildSavedItemKey } from '@/utils/saved-items'
import type { Article, ProductRecommendation } from '@/types/content'

interface ArticleDetailPageProps {
  article: Article
  products: ProductRecommendation[]
  relatedArticles: Article[]
}

export function ArticleDetailPage({ article, products: _products, relatedArticles }: ArticleDetailPageProps) {
  const detailPath = article.category === 'comparativas' ? '/comparativas' : '/blog'
  const canonicalPath = article.category === 'comparativas' ? `/comparativas/${article.slug}` : `/blog/${article.slug}`
  const recordHistory = useAppStore((state) => state.recordHistory)

  useEffect(() => {
    recordHistory(buildSavedItemKey('article', article.id))
  }, [article.id, recordHistory])

  return (
    <article className="space-y-10">
      <Seo
        canonicalPath={canonicalPath}
        description={article.seoDescription}
        image={article.image}
        title={article.seoTitle}
        type="article"
      />

      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: article.category === 'comparativas' ? 'Comparativas' : 'Blog', to: detailPath },
          { label: article.title },
        ]}
      />

      <section className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <header className="space-y-6 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-800"
                to={detailPath}
              >
                {article.category === 'comparativas' ? 'Comparativa' : 'Artículo'}
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                <Clock3 className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{article.title}</h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">{article.heroNote}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span>{article.author}</span>
              <span>{formatLongDate(article.publishedAt)}</span>
              <span>{article.tags.join(' · ')}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contacto">Hablar con el equipo</Button>
              <Button to={detailPath} variant="secondary">
                Seguir leyendo
              </Button>
            </div>
          </header>
          <div className="relative min-h-[320px]">
            <img alt={article.title} className="h-full w-full object-cover" src={article.image} />
            <div className="absolute inset-x-6 bottom-6 rounded-[1.75rem] bg-slate-950/75 p-5 text-white backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Resumen rápido</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-white/90">
                {article.takeaways.map((takeaway) => (
                  <li className="flex gap-3" key={takeaway}>
                    <Sparkles className="mt-1 h-4 w-4 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_0.34fr]">
        <div className="space-y-8 rounded-[2rem] bg-white p-8 shadow-soft md:p-10">
          {article.body.map((section) => (
            <section className="space-y-4" key={section.title}>
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className="text-base leading-8 text-slate-600" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {article.comparisonTable ? (
            <section className="space-y-5 rounded-[1.75rem] bg-cream-50 p-6">
              <h2 className="text-2xl font-semibold text-slate-900">{article.comparisonTable.title}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-sm text-slate-500">
                      <th className="px-4">Criterio</th>
                      <th className="px-4">{article.comparisonTable.optionALabel}</th>
                      <th className="px-4">{article.comparisonTable.optionBLabel}</th>
                      <th className="px-4">Qué conviene mirar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {article.comparisonTable.rows.map((row) => (
                      <tr className="rounded-2xl bg-white shadow-sm" key={row.criteria}>
                        <td className="rounded-l-2xl px-4 py-4 font-semibold text-slate-900">{row.criteria}</td>
                        <td className="px-4 py-4 text-sm leading-6 text-slate-600">{row.optionA}</td>
                        <td className="px-4 py-4 text-sm leading-6 text-slate-600">{row.optionB}</td>
                        <td className="rounded-r-2xl px-4 py-4 text-sm leading-6 text-brand-800">{row.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-brand-900 p-6 text-white shadow-soft">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Heart className="h-4 w-4" />
              Vida Mascotera
            </div>
            <h2 className="mt-5 text-2xl font-semibold">Una buena lectura debe darte ideas claras para poner en práctica.</h2>
            <p className="mt-4 text-sm leading-7 text-brand-50/90">
              Reunimos guías y comparativas para ayudarte a entender mejor este tema y tomar decisiones más simples en el día a día.
            </p>
            <Button className="mt-6 w-full" to="/comparativas" variant="secondary">
              Ver comparativas
            </Button>
          </div>
        </aside>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Seguir explorando</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Lecturas que conectan con este tema</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800" to={detailPath}>
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard article={relatedArticle} key={relatedArticle.id} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
