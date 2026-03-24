import { ArticleCard } from '@/components/cards/ArticleCard'
import { PageHero } from '@/components/sections/PageHero'
import type { Article } from '@/types/content'

export function BlogPage({ articles }: { articles: Article[] }) {
  return (
    <div className="space-y-10">
      <PageHero
        emphasis="Preparado para etiquetas, autores, fichas y futura estrategia SEO."
        intro="Una capa editorial flexible para guías evergreen, contenido de actualidad y formatos híbridos."
        title="Blog Vida Mascotera"
      />
      <section className="grid gap-6 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </section>
    </div>
  )
}

