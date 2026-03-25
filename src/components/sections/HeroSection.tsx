import { HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function HeroSection() {
  const featureItems = [
    { label: 'Guías claras para el día a día', Icon: ShieldCheck },
    { label: 'Recomendaciones con criterio editorial', Icon: HeartHandshake },
    { label: 'Ideas útiles para cuidar con más calma', Icon: Sparkles },
  ]

  return (
    <section className="relative overflow-hidden rounded-[2.75rem] bg-white px-6 py-8 shadow-soft md:px-10 md:py-12">
      <div className="absolute inset-0 bg-hero-glow opacity-90" />
      <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Una marca editorial para cuidar mejor a perros y gatos
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              Consejos útiles, comparativas honestas y recomendaciones que sí encajan con la vida real.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Vida Mascotera reúne contenido cálido, confiable y bien aterrizado para acompañarte en el bienestar, la convivencia y las decisiones de compra de tu mascota.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/blog">Empezar a leer</Button>
            <Button to="/comparativas" variant="secondary">
              Explorar comparativas
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {featureItems.map(({ label, Icon }) => (
              <div className="rounded-2xl bg-slate-50 p-4" key={label}>
                <Icon className="mb-3 h-5 w-5 text-brand-700" />
                <p className="text-sm font-medium leading-6 text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] bg-brand-900 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-100">Lo más valioso</p>
            <p className="mt-4 text-3xl font-semibold">Orientación confiable para que cada decisión se sienta más simple.</p>
            <p className="mt-3 text-sm leading-7 text-brand-100/85">
              Desde rutinas cotidianas hasta compras comparadas con criterio, construimos una experiencia pensada para personas que aman a sus mascotas y quieren hacerlo bien.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              alt="Perro feliz descansando"
              className="h-64 w-full rounded-[1.75rem] object-cover"
              src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80"
            />
            <img
              alt="Gato descansando en casa"
              className="h-64 w-full rounded-[1.75rem] object-cover"
              src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
