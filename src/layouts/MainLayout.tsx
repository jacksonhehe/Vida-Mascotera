import { useMemo, useState } from 'react'
import { ChevronDown, Heart, Menu, PawPrint, ShieldCheck, User, X } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { navigationItems } from '@/lib/constants'
import { useAuth } from '@/providers/AuthProvider'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/utils/cn'

const primaryNavigation = [
  { label: 'Inicio', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'Comparativas', path: '/comparativas' },
]

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const favoritesCount = useAppStore((state) => state.favorites.length)
  const { role, status } = useAuth()
  const authReady = status !== 'loading'
  const isAuthenticated = status === 'authenticated'

  const exploreItems = useMemo(
    () => navigationItems.filter((item) => ['perros', 'gatos', 'alimentacion', 'salud', 'accesorios'].includes(item.category)),
    [],
  )

  return (
    <div className="min-h-screen bg-cream-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-cream-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink className="flex items-center gap-3" to="/">
            <div className="rounded-2xl bg-brand-900 p-3 text-white">
              <PawPrint className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">Vida Mascotera</p>
              <p className="hidden text-xs uppercase tracking-[0.24em] text-slate-500 sm:block">Cuidado, hogar y bienestar pet</p>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-2 lg:flex">
            {primaryNavigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition',
                    isActive ? 'bg-brand-900 text-white' : 'text-slate-600 hover:bg-white',
                  )
                }
                key={item.path}
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}

            <div
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setExploreOpen(false)
                }
              }}
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button
                aria-expanded={exploreOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white"
                onClick={() => setExploreOpen((open) => !open)}
                type="button"
              >
                Explorar
                <ChevronDown className="h-4 w-4" />
              </button>
              <div
                className={cn(
                  'absolute left-0 top-full z-50 w-80 pt-3 transition duration-150',
                  exploreOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
                )}
              >
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-soft">
                  <div className="grid gap-2">
                    {exploreItems.map((item) => (
                      <Link
                        className="rounded-2xl px-4 py-3 transition hover:bg-cream-50"
                        key={item.path}
                        onClick={() => setExploreOpen(false)}
                        to={item.path}
                      >
                        <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              aria-label={`Favoritos: ${favoritesCount}`}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm transition hover:text-brand-900"
              to={isAuthenticated ? '/favoritos' : '/login'}
            >
              <div className="relative">
                <Heart className="h-5 w-5" />
                {favoritesCount ? (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-900 px-1 text-[11px] font-semibold text-white">
                    {favoritesCount}
                  </span>
                ) : null}
              </div>
            </Link>

            {!authReady ? (
              <div className="hidden lg:block">
                <div className="h-12 w-36 rounded-full bg-white/80 shadow-sm" />
              </div>
            ) : isAuthenticated ? (
              <div className="hidden items-center gap-2 lg:flex">
                <Button to="/para-ti" variant="ghost">
                  <span className="whitespace-nowrap">Para ti</span>
                </Button>
                <Button className="whitespace-nowrap" to="/mi-cuenta" variant="secondary">
                  <User className="mr-2 h-4 w-4" />
                  Mi cuenta
                </Button>
                {role === 'admin' ? (
                  <Button className="whitespace-nowrap" to="/admin/articulos" variant="ghost">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Panel
                  </Button>
                ) : null}
              </div>
            ) : (
              <div className="hidden lg:block">
                <Button to="/login" variant="secondary">
                  <User className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </Button>
              </div>
            )}

            <button
              aria-label={mobileOpen ? 'Cerrar navegación' : 'Abrir navegación'}
              className="rounded-full bg-white p-3 text-slate-700 lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              type="button"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-slate-200 px-4 py-4 lg:hidden sm:px-6">
            <div className="flex flex-col gap-2">
              {primaryNavigation.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl px-4 py-3 text-sm font-medium transition',
                      isActive ? 'bg-brand-900 text-white' : 'bg-white text-slate-700',
                    )
                  }
                  key={item.path}
                  onClick={() => setMobileOpen(false)}
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="rounded-[1.5rem] bg-white p-3">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Explorar</p>
                <div className="flex flex-col gap-2">
                  {exploreItems.map((item) => (
                    <NavLink
                      className={({ isActive }) =>
                        cn(
                          'rounded-2xl px-4 py-3 text-sm font-medium transition',
                          isActive ? 'bg-brand-900 text-white' : 'bg-cream-50 text-slate-700',
                        )
                      }
                      key={item.path}
                      onClick={() => setMobileOpen(false)}
                      to={item.path}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              {!authReady ? null : isAuthenticated ? (
                <>
                  <Button className="mt-2" to="/mi-cuenta" variant="secondary">
                    Mi cuenta
                  </Button>
                  <Button className="mt-2" to="/favoritos" variant="secondary">
                    Favoritos
                  </Button>
                  <Button className="mt-2" to="/para-ti" variant="secondary">
                    Para ti
                  </Button>
                  <Button className="mt-2" to="/historial" variant="secondary">
                    Historial
                  </Button>
                  {role === 'admin' ? (
                    <Button className="mt-2" to="/admin/articulos" variant="secondary">
                      Panel editorial
                    </Button>
                  ) : null}
                </>
              ) : (
                <Button className="mt-2" to="/login" variant="secondary">
                  Iniciar sesión
                </Button>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.9fr_0.85fr] lg:px-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Vida Mascotera</h3>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-400">Cuidado, hogar y bienestar pet</p>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Guías, comparativas y lecturas prácticas para cuidar mejor a tu perro o tu gato sin perder tiempo en ruido.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Explora</p>
            {navigationItems.slice(1, 8).map((item) => (
              <NavLink className="block text-sm text-slate-600 hover:text-brand-900" key={item.path} to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Hablemos</p>
            <p className="text-sm text-slate-600">hola@vidamascotera.com</p>
            <p className="text-sm leading-7 text-slate-600">Escríbenos si quieres proponer una colaboración, compartir una idea o resolver una duda.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
