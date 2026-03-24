import { ArrowRight, HeartHandshake, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
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
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 1)
  const recentArticles = articles.slice(0, 3)

  return (
    <div className="space-y-14">
      <HeroSection />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <SectionHeading
            description="Creamos contenido para resolver dudas reales sobre bienestar, rutina, hogar y decisiones de compra sin sonar frío ni excesivamente técnico."
            eyebrow="Nuestra propuesta"
            title="Una experiencia pensada para acompañarte antes, durante y después de cada decisión."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Confianza editorial',
                body: 'Guías claras y cercanas para entender mejor a tu mascota y actuar con más seguridad.',
                Icon: ShieldCheck,
              },
              {
                title: 'Recomendaciones honestas',
                body: 'Comparativas y selecciones útiles para invertir en productos que sí valen la pena.',
                Icon: Star,
              },
              {
                title: 'Acompañamiento cotidiano',
                body: 'Contenido pensado para la vida diaria, no solo para momentos puntuales.',
                Icon: HeartHandshake,
              },
            ].map(({ title, body, Icon }) => (
              <div className="rounded-[1.5rem] bg-cream-50 p-5" key={title}>
                <Icon className="h-5 w-5 text-brand-700" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {featuredArticles[0] ? (
          <div className="overflow-hidden rounded-[2rem] bg-brand-900 text-white shadow-soft">
            <img alt={featuredArticles[0].title} className="h-60 w-full object-cover" src={featuredArticles[0].image} />
            <div className="space-y-4 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Lectura destacada</p>
              <h2 className="text-3xl font-semibold">{featuredArticles[0].title}</h2>
              <p className="text-sm leading-7 text-brand-50/90">{featuredArticles[0].excerpt}</p>
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-white"
                to={featuredArticles[0].category === 'comparativas' ? `/comparativas/${featuredArticles[0].slug}` : `/blog/${featuredArticles[0].slug}`}
              >
                Leer ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      <section className="space-y-6">
        <SectionHeading
          description="Desde la convivencia cotidiana hasta la nutrición y las compras mejor pensadas, organizamos el contenido para que encuentres ayuda rápido."
          eyebrow="Explora por temas"
          title="Grandes pilares para cuidar mejor a tu mascota."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          description="Lecturas nuevas y relevantes para tutores que quieren respuestas claras, accionables y con una sensibilidad más humana."
          eyebrow="Lecturas recientes"
          title="Artículos para vivir con más calma, criterio y conexión."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {recentArticles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          description="Selecciones editoriales preparadas para crecer hacia una capa comercial real, sin perder la confianza ni la utilidad para el usuario final."
          eyebrow="Recomendaciones"
          title="Productos elegidos con intención, contexto y criterio."
        />
        <div className="grid gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <SectionHeading
            description="Pequeños pasos que ayudan mucho cuando una mascota llega por primera vez a casa o cuando quieres ordenar mejor la convivencia."
            eyebrow="Primeros pasos"
            title="Tres hábitos simples que te ahorran estrés desde el inicio."
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

        <div className="rounded-[2rem] bg-[#1f4d47] p-8 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-mint-100">Comparativas útiles</p>
          <h3 className="mt-4 text-3xl font-semibold">Compra con más claridad y menos impulso.</h3>
          <p className="mt-4 text-base leading-8 text-mint-50/90">
            Analizamos escenarios reales, pros, límites y señales para que puedas elegir mejor entre opciones parecidas sin perder tiempo.
          </p>
          <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white" to="/comparativas">
            Ver comparativas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <NewsletterCard />
    </div>
  )
}
