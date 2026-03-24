import { Mail } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function NewsletterCard() {
  return (
    <section className="rounded-[2rem] bg-brand-900 bg-hero-glow p-8 text-white shadow-soft md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
            <Mail size={16} />
            Newsletter curada cada semana
          </div>
          <h2 className="text-3xl font-semibold md:text-4xl">
            Consejos útiles, comparativas y recursos nuevos para tu mascota.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-brand-50/90 md:text-base">
            La base está preparada para conectar con Supabase y capturar suscripciones, perfiles e
            historial editorial sin depender solo del cliente.
          </p>
        </div>
        <div className="rounded-[1.5rem] bg-white p-5 text-slate-900">
          <div className="space-y-3">
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400"
              placeholder="Correo electrónico"
              type="email"
            />
            <Button className="w-full">Quiero recibir novedades</Button>
            <p className="text-xs leading-6 text-slate-500">
              Arquitectura lista para evolucionar a automatizaciones, segmentación y contenido
              personalizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

