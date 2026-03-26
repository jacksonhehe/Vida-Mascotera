import { ArrowRight, HeartHandshake, ShieldCheck, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { CategoryCard } from '@/components/cards/CategoryCard'
import { NewsletterCard } from '@/components/common/NewsletterCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Seo } from '@/components/common/Seo'
import { HeroSection } from '@/components/sections/HeroSection'
import { featuredCategories, starterTips } from '@/lib/constants'
import type { Article } from '@/types/content'

interface HomePageProps {
  articles: Article[]
}

export function HomePage({ articles }: HomePageProps) {
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 1)
  const recentArticles = articles.slice(0, 3)
  const highlightedGuides = articles.filter((article) => article.category === 'comparativas' || article.category === 'blog').slice(3, 6)
  const recentSectionCards = [
    ...recentArticles.map((article) => ({
      type: 'article' as const,
      id: article.id,
      article,
    })),
    ...[
      {
        type: 'cta' as const,
        id: 'blog-cta',
        eyebrow: 'Sigue explorando',
        title: 'Encuentra más lecturas para resolver dudas comunes.',
        body: 'Ve al blog y revisa artículos claros sobre bienestar, convivencia y rutina diaria.',
        to: '/blog',
        label: 'Ir al blog',
      },
      {
        type: 'cta' as const,
        id: 'comparativas-cta',
        eyebrow: 'Elige con calma',
        title: 'Compara opciones sin perder tiempo en ruido.',
        body: 'Explora comparativas pensadas para ayudarte a decidir con más criterio y menos estrés.',
        to: '/comparativas',
        label: 'Ver comparativas',
      },
    ],
  ].slice(0, 3)

  return (
    <div className="space-y-12 lg:space-y-14">
      <Seo canonicalPath="/" />
      <HeroSection />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-soft md:p-8">
          <SectionHeading
            description="Reunimos lecturas útiles sobre bienestar, rutina, hogar y convivencia para que encuentres ayuda clara cuando la necesites."
            eyebrow="Empieza por aquí"
            title="Contenido práctico para entender mejor a tu mascota."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Guías claras',
                body: 'Explicaciones simples para entender mejor a tu mascota y actuar con más seguridad.',
                Icon: ShieldCheck,
              },
              {
                title: 'Comparativas útiles',
                body: 'Ayudas prácticas para elegir con más calma entre opciones parecidas.',
                Icon: Star,
              },
              {
                title: 'Vida diaria',
                body: 'Consejos pensados para la convivencia de todos los días, no solo para momentos puntuales.',
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
            <div className="space-y-4 p-7 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Lectura destacada</p>
              <h2 className="text-3xl font-semibold">{featuredArticles[0].title}</h2>
              <p className="text-sm leading-7 text-brand-50/90">{featuredArticles[0].excerpt}</p>
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white"
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
          description="Organizamos los temas principales para que encuentres rápido lo que necesitas según tu mascota o tu duda."
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
          {recentSectionCards.map((item) =>
            item.type === 'article' ? (
              <ArticleCard article={item.article} key={item.id} />
            ) : (
              <div className="flex h-full flex-col justify-between rounded-[2rem] bg-white p-7 shadow-soft md:p-8" key={item.id}>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">{item.eyebrow}</p>
                  <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
                <Link className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900" to={item.to}>
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ),
          )}
        </div>
      </section>

      {highlightedGuides.length > 0 ? (
        <section className="space-y-6">
          <SectionHeading
            description="Lecturas seleccionadas para profundizar en temas frecuentes y seguir aprendiendo con calma."
            eyebrow="Guías destacadas"
            title="Lecturas para resolver dudas con más contexto."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {highlightedGuides.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] bg-white p-7 shadow-soft md:p-8">
          <SectionHeading
            description="Pequeños pasos que ayudan mucho cuando una mascota llega por primera vez a casa o cuando quieres ordenar mejor la convivencia."
            eyebrow="Primeros pasos"
            title="Tres hábitos simples que te ahorran estrés desde el inicio."
          />
          <div className="mt-6 grid gap-4">
            {starterTips.map((tip) => (
              <div className="rounded-[1.5rem] bg-cream-50 p-5" key={tip.id}>
                <h3 className="text-lg font-semibold text-slate-900">{tip.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#1f4d47] p-7 text-white shadow-soft md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-mint-100">Comparativas útiles</p>
          <h3 className="mt-4 text-3xl font-semibold">Decide con más claridad y menos ruido.</h3>
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
