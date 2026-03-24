import { useState } from 'react'
import { Mail, MapPin, MessageSquareMore, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { StatusBanner } from '@/components/common/StatusBanner'
import { submitContactMessage } from '@/services/offline-sync-service'
import type { ContactMessageInput } from '@/types/content'

const initialForm: ContactMessageInput = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function validate(form: ContactMessageInput) {
  const errors: Partial<Record<keyof ContactMessageInput, string>> = {}

  if (form.name.trim().length < 2) {
    errors.name = 'Necesitamos al menos un nombre corto para responderte.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Revisa el correo para que podamos escribirte.'
  }

  if (form.subject.trim().length < 4) {
    errors.subject = 'Cuéntanos un asunto un poco más claro.'
  }

  if (form.message.trim().length < 20) {
    errors.message = 'Tu mensaje necesita un poco mas de contexto para ayudarte bien.'
  }

  return errors
}

export function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactMessageInput, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'warning'; message: string } | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setFeedback(null)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      const result = await submitContactMessage(form)
      setFeedback({
        tone: result.queued ? 'warning' : 'success',
        message: result.queued
          ? 'Guardamos tu mensaje y lo enviaremos en cuanto la conexion o el backend esten disponibles.'
          : 'Tu mensaje ya fue enviado. Gracias por escribirnos.',
      })
      setForm(initialForm)
    } catch {
      setFeedback({
        tone: 'warning',
        message: 'No pudimos enviar tu mensaje ahora mismo. Intentalo otra vez en unos minutos.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <Seo
        canonicalPath="/contacto"
        description="Habla con Vida Mascotera sobre colaboraciones, contenido, soporte editorial o propuestas de marca."
        title="Contacto | Vida Mascotera"
      />

      <section className="rounded-[2.5rem] bg-brand-900 p-8 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Contacto</p>
        <h1 className="mt-4 text-4xl font-semibold">Conversemos sobre contenido, colaboraciones y nuevas ideas para el universo pet.</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-brand-100/85">
          Si quieres proponer una alianza, una campana, un proyecto editorial o simplemente escribirnos, este es el punto de partida.
        </p>
        <div className="mt-8 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Mail size={18} />
            hola@vidamascotera.com
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} />
            Atencion remota para marcas, medios y proyectos digitales de LATAM.
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={18} />
            Apertura a colaboraciones editoriales, branded content y recomendaciones seleccionadas.
          </div>
        </div>
      </section>

      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <form className="space-y-5" noValidate onSubmit={handleSubmit}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Escribenos</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Cuentanos como podemos ayudarte</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Este formulario ya esta listo para guardar mensajes reales en Supabase y seguir funcionando incluso si la conexion falla.
            </p>
          </div>

          {feedback ? <StatusBanner message={feedback.message} tone={feedback.tone} /> : null}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="contact-name">
                Tu nombre
              </label>
              <input
                aria-invalid={Boolean(errors.name)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                id="contact-name"
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                value={form.name}
              />
              {errors.name ? <p className="text-sm text-coral-700">{errors.name}</p> : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="contact-email">
                Tu correo
              </label>
              <input
                aria-invalid={Boolean(errors.email)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                id="contact-email"
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                type="email"
                value={form.email}
              />
              {errors.email ? <p className="text-sm text-coral-700">{errors.email}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="contact-subject">
              Asunto
            </label>
            <input
              aria-invalid={Boolean(errors.subject)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              id="contact-subject"
              onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
              value={form.subject}
            />
            {errors.subject ? <p className="text-sm text-coral-700">{errors.subject}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="contact-message">
              Mensaje
            </label>
            <textarea
              aria-invalid={Boolean(errors.message)}
              className="min-h-40 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
              id="contact-message"
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              value={form.message}
            />
            {errors.message ? <p className="text-sm text-coral-700">{errors.message}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="min-w-40" disabled={submitting} type="submit">
              {submitting ? 'Enviando...' : 'Enviar mensaje'}
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <MessageSquareMore size={16} />
              Respuesta humana y cercana
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
