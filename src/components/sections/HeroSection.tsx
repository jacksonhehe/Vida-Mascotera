import { HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { OfflineStatus } from '@/components/common/OfflineStatus'

export function HeroSection() {
  const featureItems = [
    { label: 'Contenido confiable', Icon: ShieldCheck },
    { label: 'Favoritos y filtros', Icon: HeartHandshake },
    { label: 'Offline y sincronización', Icon: Sparkles },
  ]

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-white px-6 py-8 shadow-soft md:px-10 md:py-12">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <OfflineStatus />
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Contenido útil para una vida mejor con tu mascota
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
              Vida Mascotera combina guía editorial, favoritos y contenido offline en una sola base escalable.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Una plataforma cálida y premium para dueños de perros y gatos, lista para crecer como blog, portal de recursos y futura capa comercial de afiliación.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/blog">Explorar artículos</Button>
            <Button to="/comparativas" variant="secondary">
              Ver comparativas
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {featureItems.map(({ label, Icon }) => (
              <div className="rounded-2xl bg-slate-50 p-4" key={label}>
                <Icon className="mb-3 h-5 w-5 text-brand-700" />
                <p className="text-sm font-medium text-slate-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[2rem] bg-brand-900 p-6 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-100">Preparado para</p>
            <p className="mt-4 text-3xl font-semibold">Autenticación, perfiles y contenido dinámico</p>
            <p className="mt-3 text-sm leading-7 text-brand-100/85">
              Supabase gestiona identidad y persistencia; IndexedDB conserva favoritos y caché cuando el usuario se queda sin conexión.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              alt="Perro feliz"
              className="h-56 w-full rounded-[1.75rem] object-cover"
              src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80"
            />
            <img
              alt="Gato tranquilo"
              className="h-56 w-full rounded-[1.75rem] object-cover"
              src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=80"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
