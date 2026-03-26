import { Heart, LogOut, PawPrint, Settings2, Sparkles } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { useAuth } from '@/providers/AuthProvider'
import { useAppStore } from '@/store/app-store'

export function AccountPage() {
  const { profile, signOut } = useAuth()
  const favoritesCount = useAppStore((state) => state.favorites.length)
  const historyCount = useAppStore((state) => state.history.length)
  const preferences = useAppStore((state) => state.preferences)

  const preferredPetCopy =
    preferences.preferredPet === 'ambos'
      ? 'Perro y gato'
      : preferences.preferredPet === 'perros'
        ? 'Principalmente perro'
        : 'Principalmente gato'

  return (
    <div className="space-y-8">
      <Seo
        canonicalPath="/mi-cuenta"
        description="Tu espacio personal en Vida Mascotera para volver a tus favoritos, ajustar preferencias y encontrar contenido más útil para ti."
        title="Mi cuenta | Vida Mascotera"
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.5rem] bg-brand-900 p-8 text-white shadow-soft md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Mi cuenta</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">{profile?.fullName ?? 'Comunidad Vida Mascotera'}</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-brand-50/90">
            Aquí tienes a mano lo que más te interesa: tus favoritos, tus preferencias y una forma más rápida de volver a leer lo que te sirve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Tu perfil</p>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.5rem] bg-cream-50 p-5">
              <p className="text-sm text-slate-500">Correo</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{profile?.email}</p>
            </div>
            <div className="rounded-[1.5rem] bg-cream-50 p-5">
              <p className="text-sm text-slate-500">Tu contexto principal</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{preferredPetCopy}</p>
            </div>
            <div className="rounded-[1.5rem] bg-cream-50 p-5">
              <p className="text-sm text-slate-500">Temas guardados</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{preferences.favoriteTopics.length} temas de interés</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: 'Favoritos',
            body: `${favoritesCount} elementos guardados para volver rápido cuando quieras.`,
            to: '/favoritos',
            Icon: Heart,
          },
          {
            title: 'Para ti',
            body: 'Una selección pensada según tus temas y el tipo de mascota que más te interesa.',
            to: '/para-ti',
            Icon: Sparkles,
          },
          {
            title: 'Preferencias',
            body: 'Ajusta tus intereses para que la experiencia se sienta más útil y ordenada.',
            to: '/preferencias',
            Icon: Settings2,
          },
          {
            title: 'Historial',
            body: `${historyCount} lecturas recientes para retomar sin buscar desde cero.`,
            to: '/historial',
            Icon: PawPrint,
          },
        ].map(({ title, body, to, Icon }) => (
          <div className="rounded-[2rem] bg-white p-6 shadow-soft" key={title}>
            <Icon className="h-5 w-5 text-brand-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
            <Button className="mt-5" to={to} variant="secondary">
              Abrir
            </Button>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Sesión y acceso</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Tu cuenta mantiene tus favoritos y preferencias disponibles para que la web recuerde lo que te interesa.
            </p>
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
