import { ArrowRight, CheckCircle2 } from 'lucide-react'
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
  const highlightedArticles = articles.filter((article) => article.featured).slice(0, 3)
  const highlightedIds = new Set(highlightedArticles.map((article) => article.id))
  const recentArticles = articles.filter((article) => !highlightedIds.has(article.id)).slice(0, 3)
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

      {highlightedArticles.length > 0 ? (
        <section className="space-y-6">
          <SectionHeading
            description="Una selección de lecturas para entrar rápido a temas que suelen importar más en el día a día."
            eyebrow="Lecturas destacadas"
            title="Tres lecturas para empezar con buen criterio."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {highlightedArticles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </section>
      ) : null}

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

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft md:p-7">
          <SectionHeading
            description="Pequeños pasos que ayudan mucho cuando una mascota llega por primera vez a casa o cuando quieres ordenar mejor la convivencia."
            eyebrow="Primeros pasos"
            title="Tres hábitos simples que te ahorran estrés desde el inicio."
          />
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            {starterTips.map((tip) => (
              <div className="rounded-[1.5rem] bg-cream-50 p-4" key={tip.id}>
                <h3 className="text-base font-semibold text-slate-900">{tip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#1f4d47] p-6 text-white shadow-soft md:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-mint-100">Comparativas útiles</p>
          <h3 className="mt-4 max-w-md text-3xl font-semibold">Decide con más claridad y menos ruido.</h3>
          <p className="mt-4 max-w-lg text-base leading-8 text-mint-50/90">
            Analizamos escenarios reales, pros, límites y señales para que puedas elegir mejor entre opciones parecidas sin perder tiempo.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              'Arnés o collar según tu rutina de paseo.',
              'Comedero lento o plato amplio según cómo come tu mascota.',
              'Transportadora blanda o rígida según tus trayectos.',
            ].map((item) => (
              <div className="flex items-start gap-3 rounded-[1.25rem] bg-white/10 px-4 py-3" key={item}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-mint-100" />
                <p className="text-sm leading-6 text-mint-50">{item}</p>
              </div>
            ))}
          </div>
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
