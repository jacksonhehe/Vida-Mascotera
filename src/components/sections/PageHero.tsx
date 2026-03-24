import { Button } from '@/components/common/Button'

interface PageHeroProps {
  title: string
  intro: string
  emphasis: string
}

export function PageHero({ title, intro, emphasis }: PageHeroProps) {
  return (
    <section className="rounded-[2.5rem] bg-white px-6 py-10 shadow-soft md:px-10">
      <div className="max-w-3xl space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Recurso editorial</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{title}</h1>
        <p className="text-base leading-8 text-slate-600 md:text-lg">{intro}</p>
        <p className="text-sm leading-7 text-brand-800">{emphasis}</p>
        <div className="flex flex-wrap gap-3">
          <Button to="/contacto">Solicitar colaboración</Button>
          <Button to="/blog" variant="secondary">
            Leer blog
          </Button>
        </div>
      </div>
    </section>
  )
}
