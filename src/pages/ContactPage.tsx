import { Mail, MapPin, MessageSquareMore, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2.5rem] bg-brand-900 p-8 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Contacto</p>
        <h1 className="mt-4 text-4xl font-semibold">Hablemos de contenido, alianzas y crecimiento.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-brand-100/85">
          La estructura ya está lista para convertir este formulario en entradas persistidas, flujo de soporte o canal comercial conectado a Supabase.
        </p>
        <div className="mt-8 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            hola@vidamascotera.com
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} />
            Atención remota para LATAM y proyectos editoriales digitales.
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={18} />
            Consultoría de contenido, afiliación y estrategia de portal pet.
          </div>
        </div>
      </section>
      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Escríbenos</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Formulario base para futuras integraciones</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Nombre" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Correo" type="email" />
          </div>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Asunto" />
          <textarea className="min-h-40 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Cuéntanos en qué podemos ayudarte" />
          <div className="flex flex-wrap items-center gap-3">
            <Button>Enviar consulta</Button>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <MessageSquareMore size={16} />
              Preparado para persistencia y automatización
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

