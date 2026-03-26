import { ArticleCard } from '@/components/cards/ArticleCard'
import { Seo } from '@/components/common/Seo'
import { PageHero } from '@/components/sections/PageHero'
import type { Article } from '@/types/content'

export function BlogPage({ articles }: { articles: Article[] }) {
  return (
    <div className="space-y-10">
      <Seo canonicalPath="/blog" description="Guías, historias y consejos para el día a día con tu mascota." title="Blog Vida Mascotera | Guías y lecturas para el día a día" />
      <PageHero
        emphasis="Guías para volver cuando necesites información clara y fácil de aplicar."
        intro="El blog de Vida Mascotera reúne lecturas prácticas sobre bienestar, convivencia, alimentación, cuidado y vida diaria con tu mascota."
        title="Consejos y lecturas útiles para el día a día"
      />
      {articles.length ? (
        <section className="grid gap-6 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </section>
      ) : (
        <section className="rounded-[2rem] bg-white p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Estamos preparando nuevas lecturas</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Muy pronto verás aquí nuevas guías, comparativas y lecturas útiles para seguir aprendiendo.</p>
        </section>
      )}
    </div>
  )
}
