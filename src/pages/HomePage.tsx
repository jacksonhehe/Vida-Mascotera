import { ArticleCard } from '@/components/cards/ArticleCard'
import { CategoryCard } from '@/components/cards/CategoryCard'
import { ProductCard } from '@/components/cards/ProductCard'
import { NewsletterCard } from '@/components/common/NewsletterCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { HeroSection } from '@/components/sections/HeroSection'
import { featuredCategories, starterTips } from '@/lib/constants'
import type { Article, ProductRecommendation } from '@/types/content'

interface HomePageProps {
  articles: Article[]
  products: ProductRecommendation[]
}

export function HomePage({ articles, products }: HomePageProps) {
  return (
    <div className="space-y-12">
      <HeroSection />

      <section className="space-y-6">
        <SectionHeading
          description="Una portada que mezcla orientación editorial, verticales claras y preparación para crecimiento comercial y SEO."
          eyebrow="Categorías destacadas"
          title="Grandes pilares para organizar contenido y convertir visitas en recurrencia."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          description="Contenido reciente listo para venir de Supabase o funcionar desde caché local cuando no haya conexión."
          eyebrow="Artículos recientes"
          title="Lecturas útiles para decisiones mejores y cuidados más simples."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          description="Bloque diseñado para evolucionar hacia comparativas, monetización por afiliación y recomendaciones editoriales filtrables."
          eyebrow="Productos recomendados"
          title="Selección curada con intención comercial, sin perder claridad editorial."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <SectionHeading
            description="Micro-contenido rápido para captar tráfico temprano, ayudar a nuevos dueños y generar futuras series editoriales."
            eyebrow="Dueños primerizos"
            title="Primeros pasos que realmente cambian la experiencia de convivencia."
          />
          <div className="mt-8 grid gap-4">
            {starterTips.map((tip) => (
              <div className="rounded-[1.5rem] bg-cream-50 p-5" key={tip.id}>
                <h3 className="text-lg font-semibold text-slate-900">{tip.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-mint-900 p-8 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-mint-100">Base de producto</p>
          <h3 className="mt-4 text-3xl font-semibold">Estado global claro y preparado para crecer.</h3>
          <p className="mt-4 text-sm leading-7 text-mint-100/90">
            Zustand centraliza favoritos, filtros, preferencias y estado de conectividad; la arquitectura separa tipos, servicios, hooks y rutas para evitar acoplamiento temprano.
          </p>
        </div>
      </section>

      <NewsletterCard />
    </div>
  )
}

