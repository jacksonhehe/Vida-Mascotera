import { ArticleCard } from '@/components/cards/ArticleCard'
import { Seo } from '@/components/common/Seo'
import { useAppBootstrap } from '@/hooks/useAppBootstrap'
import { useAppStore } from '@/store/app-store'

export function ForYouPage() {
  const { articles } = useAppBootstrap()
  const preferences = useAppStore((state) => state.preferences)

  const recommended = articles
    .map((article) => {
      let score = 0

      if (preferences.favoriteTopics.includes(article.category)) {
        score += 3
      }

      if (preferences.preferredPet !== 'ambos') {
        if (article.category === preferences.preferredPet) {
          score += 2
        }

        if (article.tags.some((tag) => tag.toLowerCase().includes(preferences.preferredPet.slice(0, -1)))) {
          score += 1
        }
      }

      score += Math.max(0, 6 - article.tags.length / 2)

      return { article, score }
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 9)
    .map((item) => item.article)

  return (
    <div className="space-y-8">
      <Seo
        canonicalPath="/para-ti"
        description="Una selección de lecturas más alineada con tus intereses y con el tipo de mascota que te importa más."
        title="Para ti | Vida Mascotera"
      />

      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Para ti</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Una selección más alineada con lo que te interesa.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Estas lecturas priorizan tus temas guardados y el contexto que elegiste para ayudarte a encontrar antes lo que te puede servir.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {recommended.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </section>
    </div>
  )
}
