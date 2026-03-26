import { useEffect, useState } from 'react'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { StatusBanner } from '@/components/common/StatusBanner'
import { useAppStore } from '@/store/app-store'
import type { PetCategory, UserPreferences } from '@/types/content'
import { cn } from '@/utils/cn'

const availableTopics: Array<{ value: PetCategory; label: string }> = [
  { value: 'perros', label: 'Perros' },
  { value: 'gatos', label: 'Gatos' },
  { value: 'alimentacion', label: 'Alimentación' },
  { value: 'salud', label: 'Salud' },
  { value: 'comparativas', label: 'Comparativas' },
  { value: 'blog', label: 'Blog' },
]

export function PreferencesPage() {
  const preferences = useAppStore((state) => state.preferences)
  const setPreferences = useAppStore((state) => state.setPreferences)
  const [draft, setDraft] = useState<UserPreferences>(preferences)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(preferences)
  }, [preferences])

  function toggleTopic(topic: PetCategory) {
    setDraft((current) => ({
      ...current,
      favoriteTopics: current.favoriteTopics.includes(topic)
        ? current.favoriteTopics.filter((item) => item !== topic)
        : [...current.favoriteTopics, topic],
    }))
  }

  function handleSave() {
    setPreferences(draft)
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-8">
      <Seo
        canonicalPath="/preferencias"
        description="Ajusta tus intereses para que Vida Mascotera te muestre contenido más útil para ti."
        title="Preferencias | Vida Mascotera"
      />

      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Preferencias</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Haz que la experiencia se parezca más a ti.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Cuéntanos qué tipo de mascota tienes y qué temas te interesan más para ordenar mejor el contenido que te mostramos.
        </p>
      </section>

      {saved ? <StatusBanner message="Tus preferencias quedaron guardadas." tone="info" /> : null}

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Tu contexto</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">Esto nos ayuda a darte una experiencia más rápida y relevante.</p>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm font-medium text-slate-700">¿Con qué mascota convives más?</p>
              <div className="mt-3 grid gap-3">
                {[
                  ['perros', 'Perro'],
                  ['gatos', 'Gato'],
                  ['ambos', 'Perro y gato'],
                ].map(([value, label]) => (
                  <button
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition',
                      draft.preferredPet === value
                        ? 'border-brand-500 bg-brand-50 text-brand-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50',
                    )}
                    key={value}
                    onClick={() => setDraft((current) => ({ ...current, preferredPet: value as UserPreferences['preferredPet'] }))}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
              <input
                checked={draft.newsletter}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-700"
                onChange={(event) => setDraft((current) => ({ ...current, newsletter: event.target.checked }))}
                type="checkbox"
              />
              <span className="text-sm leading-7 text-slate-600">Quiero recibir novedades y nuevas guías en mi correo.</span>
            </label>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">Temas que más te interesan</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">Puedes elegir varios. Esto ordena mejor favoritos, sugerencias y contenido para ti.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {availableTopics.map((topic) => {
              const selected = draft.favoriteTopics.includes(topic.value)
              return (
                <button
                  className={cn(
                    'rounded-full px-4 py-3 text-sm font-semibold transition',
                    selected ? 'bg-brand-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                  )}
                  key={topic.value}
                  onClick={() => toggleTopic(topic.value)}
                  type="button"
                >
                  {topic.label}
                </button>
              )
            })}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-cream-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Cómo lo usamos</p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Tus preferencias sirven para priorizar lecturas, comparativas y recordatorios que encajan mejor con tus intereses dentro de la web.
            </p>
          </div>

          <Button className="mt-6" onClick={handleSave}>
            Guardar preferencias
          </Button>
        </div>
      </section>
    </div>
  )
}
