import { ArticleCard } from '@/components/cards/ArticleCard'
import { Seo } from '@/components/common/Seo'
import { PageHero } from '@/components/sections/PageHero'
import type { Article } from '@/types/content'

export function BlogPage({ articles }: { articles: Article[] }) {
  return (
    <div className="space-y-10">
      <Seo canonicalPath="/blog" description="Guias, historias y consejos para el dia a dia con tu mascota." title="Blog Vida Mascotera | Guias y lecturas para el dia a dia" />
      <PageHero
        emphasis="Guias para volver cuando necesites informacion clara y facil de aplicar."
        intro="El blog de Vida Mascotera reune lecturas practicas sobre bienestar, convivencia, alimentacion, cuidado y vida diaria con tu mascota."
        title="Consejos y lecturas utiles para el dia a dia"
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
          <p className="mt-3 text-sm leading-7 text-slate-600">Muy pronto veras aqui nuevas guias, comparativas y lecturas utiles para seguir aprendiendo.</p>
        </section>
      )}
    </div>
  )
}
