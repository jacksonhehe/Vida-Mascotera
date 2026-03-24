import { Mail, MapPin, MessageSquareMore, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'

export function ContactPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2.5rem] bg-brand-900 p-8 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Contacto</p>
        <h1 className="mt-4 text-4xl font-semibold">Conversemos sobre contenido, colaboraciones y nuevas ideas para el universo pet.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-brand-100/85">
          Si quieres proponer una alianza, una campaña, un proyecto editorial o simplemente escribirnos, este es el punto de partida.
        </p>
        <div className="mt-8 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            hola@vidamascotera.com
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} />
            Atención remota para marcas, medios y proyectos digitales de LATAM.
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={18} />
            Apertura a colaboraciones editoriales, branded content y recomendaciones seleccionadas.
          </div>
        </div>
      </section>
      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <div className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Escríbenos</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Cuéntanos cómo podemos ayudarte</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Esta base ya está preparada para evolucionar hacia formularios conectados, soporte y gestión comercial.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Tu nombre" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Tu correo" type="email" />
          </div>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="¿Sobre qué quieres hablar?" />
          <textarea className="min-h-40 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Cuéntanos un poco más para responderte mejor" />
          <div className="flex flex-wrap items-center gap-3">
            <Button>Enviar mensaje</Button>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <MessageSquareMore size={16} />
              Respuesta humana y cercana
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
