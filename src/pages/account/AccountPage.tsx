import { Heart, History, LogOut, Settings2, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { useAppBootstrap } from '@/hooks/useAppBootstrap'
import { useAuth } from '@/providers/AuthProvider'
import { useAppStore } from '@/store/app-store'
import type { LucideIcon } from 'lucide-react'
import { formatLongDate } from '@/utils/format'
import { parseSavedItemKey } from '@/utils/saved-items'

interface QuickAccessCard {
  title: string
  body: string
  to: string
  Icon: LucideIcon
  accent: 'brand' | 'mint' | 'cream' | 'slate'
  cta: string
  meta?: string
}

export function AccountPage() {
  const { articles, products } = useAppBootstrap()
  const { profile, signOut } = useAuth()
  const favoritesCount = useAppStore((state) => state.favorites.length)
  const history = useAppStore((state) => state.history)
  const preferences = useAppStore((state) => state.preferences)

  const preferredPetCopy =
    preferences.preferredPet === 'ambos'
      ? 'Perro y gato'
      : preferences.preferredPet === 'perros'
        ? 'Principalmente perro'
        : 'Principalmente gato'

  const latestHistoryEntry = history
    .map((entry) => {
      const parsed = parseSavedItemKey(entry.key)
      if (!parsed) {
        return null
      }

      if (parsed.type === 'article') {
        const article = articles.find((item) => item.id === parsed.id)
        if (!article) {
          return null
        }

        return {
          title: article.title,
          meta: `Visto el ${formatLongDate(entry.visitedAt)}`,
          to: article.category === 'comparativas' ? `/comparativas/${article.slug}` : `/blog/${article.slug}`,
        }
      }

      const product = products.find((item) => item.id === parsed.id)
      if (!product) {
        return null
      }

      return {
        title: product.name,
        meta: `Visto el ${formatLongDate(entry.visitedAt)}`,
        to: `/recomendaciones/${product.slug}`,
      }
    })
    .find(Boolean)

  const quickAccess: QuickAccessCard[] = [
    {
      title: 'Para ti',
      body: 'Una selección pensada según tus temas y el tipo de mascota que más te interesa.',
      to: '/para-ti',
      Icon: Sparkles,
      accent: 'mint',
      cta: 'Abrir',
    },
    {
      title: 'Preferencias',
      body: `${preferences.favoriteTopics.length} temas activos para ordenar mejor lo que ves.`,
      to: '/preferencias',
      Icon: Settings2,
      accent: 'cream',
      cta: 'Abrir',
    },
    {
      title: 'Historial',
      body: latestHistoryEntry ? latestHistoryEntry.title : 'Cuando empieces a leer, aquí tendrás una forma simple de volver.',
      to: '/historial',
      Icon: History,
      accent: 'slate',
      cta: 'Ver historial',
      meta: latestHistoryEntry?.meta ?? `${history.length} lecturas recientes guardadas.`,
    },
  ]

  return (
    <div className="space-y-8">
      <Seo
        canonicalPath="/mi-cuenta"
        description="Tu espacio personal en Vida Mascotera para volver a tus favoritos, ajustar preferencias y encontrar contenido más útil para ti."
        title="Mi cuenta | Vida Mascotera"
      />

      <section className="grid items-start gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="self-stretch rounded-[2.5rem] bg-brand-900 p-6 text-white shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Mi cuenta</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{profile?.fullName ?? 'Comunidad Vida Mascotera'}</h1>
          <p className="mt-3 max-w-2xl text-base leading-8 text-brand-50/90">
            Aquí tienes a mano lo que más te interesa: tus favoritos, tus preferencias y una forma más rápida de volver a leer lo que te sirve.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/10 p-3.5">
              <p className="text-sm text-brand-100">Favoritos</p>
              <p className="mt-1.5 text-2xl font-semibold text-white">{favoritesCount}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-3.5">
              <p className="text-sm text-brand-100">Historial</p>
              <p className="mt-1.5 text-2xl font-semibold text-white">{history.length}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-3.5">
              <p className="text-sm text-brand-100">Temas activos</p>
              <p className="mt-1.5 text-2xl font-semibold text-white">{preferences.favoriteTopics.length}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button to="/favoritos" variant="secondary">
              <Heart className="mr-2 h-4 w-4" />
              Ver favoritos
            </Button>
            <Button to="/preferencias" variant="secondary">
              <Settings2 className="mr-2 h-4 w-4" />
              Ajustar preferencias
            </Button>
          </div>
        </div>

        <div className="rounded-[2.5rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Tu perfil</p>
          <div className="mt-4 space-y-3">
            <div className="rounded-[1.5rem] bg-cream-50 p-4">
              <p className="text-sm text-slate-500">Correo</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile?.email}</p>
            </div>
            <div className="rounded-[1.5rem] bg-cream-50 p-4">
              <p className="text-sm text-slate-500">Tu contexto principal</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{preferredPetCopy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickAccess.map(({ title, body, to, Icon, accent, cta, meta }) => (
          <div className="rounded-[2rem] bg-white p-6 shadow-soft" key={title}>
            <div
              className={`inline-flex rounded-full p-3 ${
                accent === 'brand'
                  ? 'bg-brand-50 text-brand-700'
                  : accent === 'mint'
                    ? 'bg-mint-50 text-[#1f4d47]'
                    : accent === 'cream'
                      ? 'bg-cream-100 text-amber-700'
                      : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
            {meta ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{meta}</p> : null}
            <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
            <Button className="mt-5" to={to} variant="secondary">
              {cta}
            </Button>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Sesión</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Puedes cerrar sesión cuando quieras. Tus preferencias y favoritos seguirán vinculados a tu cuenta.</p>
          </div>
          <Button onClick={() => void signOut()} variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </section>
    </div>
  )
}
