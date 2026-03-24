import { useState } from 'react'
import { Menu, PawPrint, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { navigationItems } from '@/lib/constants'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/utils/cn'

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const profile = useAppStore((state) => state.profile)
  const favoritesCount = useAppStore((state) => state.favorites.length)

  return (
    <div className="min-h-screen bg-cream-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-cream-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <NavLink className="flex items-center gap-3" to="/">
            <div className="rounded-2xl bg-brand-900 p-3 text-white">
              <PawPrint className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">Vida Mascotera</p>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Cuidado, hogar y bienestar pet</p>
            </div>
          </NavLink>
          <nav className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => (
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
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm sm:block">
              Favoritos: <span className="font-semibold text-brand-800">{favoritesCount}</span>
            </div>
            <div className="hidden rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm md:block">
              {profile ? profile.fullName : 'Bienvenido a Vida Mascotera'}
            </div>
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
              {navigationItems.map((item) => (
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
            </div>
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Vida Mascotera</h3>
            <p className="max-w-md text-sm leading-7 text-slate-600">
              Un espacio editorial para acompañarte con guías, comparativas y recomendaciones que hacen más fácil cuidar a quienes forman parte de tu familia.
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
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Contacto</p>
            <p className="text-sm text-slate-600">hola@vidamascotera.com</p>
            <p className="text-sm text-slate-600">Colaboraciones editoriales, campañas afines y proyectos de marca.</p>
            <p className="text-sm text-slate-600">Base lista para seguir creciendo con autenticación y contenido real.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
