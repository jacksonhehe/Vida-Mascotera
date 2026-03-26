import { Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function NewsletterCard() {
  return (
    <section className="overflow-hidden rounded-[2.25rem] bg-brand-900 p-8 text-white shadow-soft md:p-12">
      <div className="absolute" />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Mail size={16} />
            Novedades útiles, no spam
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Recibe guías, comparativas y consejos prácticos para el día a día con tu mascota.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-brand-50/90">
            Te enviaremos contenido claro y fácil de aprovechar para convivir mejor, resolver dudas comunes y descubrir nuevas lecturas.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-brand-50">
            <Sparkles className="h-4 w-4" />
            Ideas pensadas para tu rutina con tu mascota
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-5 text-slate-900">
          <div className="space-y-3">
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400"
              placeholder="Tu correo electrónico"
              type="email"
            />
            <Button className="w-full">Quiero recibir novedades</Button>
            <p className="text-xs leading-6 text-slate-500">Solo contenido útil sobre bienestar, hogar, convivencia y nuevas guías de Vida Mascotera.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
