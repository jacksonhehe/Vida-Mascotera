import { FilePenLine, LogOut, Plus, ShieldCheck } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { useAdminAccess } from '@/hooks/useAdminAccess'
import { useAuth } from '@/providers/AuthProvider'

function AdminAccessScreen({ mode }: { mode: 'forbidden' | 'unavailable' | 'loading' }) {
  const content = {
    loading: {
      title: 'Comprobando acceso',
      description: 'Estamos validando tu sesión y permisos para entrar al panel editorial.',
    },
    forbidden: {
      title: 'Sin permisos de administración',
      description: 'Tu cuenta inició sesión, pero no tiene rol admin para usar este panel.',
    },
    unavailable: {
      title: 'Panel no disponible',
      description: 'No pudimos validar el acceso administrativo en este momento.',
    },
  }[mode]

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-10 shadow-soft">
        <Seo canonicalPath="/admin" description="Panel editorial privado de Vida Mascotera." title="Admin | Vida Mascotera" />
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800">
          <ShieldCheck className="h-4 w-4" />
          Vida Mascotera Admin
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">{content.title}</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">{content.description}</p>

        {mode === 'forbidden' ? (
          <div className="mt-8 flex gap-3">
            <Button to="/">Volver al sitio</Button>
            <Button to="/login" variant="secondary">
              Cambiar de cuenta
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function AdminLayout() {
  const { state, profile } = useAdminAccess()
  const { signOut } = useAuth()

  if (state === 'loading' || state === 'forbidden' || state === 'unavailable') {
    return <AdminAccessScreen mode={state} />
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-6">
          <Link className="block rounded-[1.5rem] bg-brand-900 p-5 text-white" to="/admin/articulos">
            <p className="text-sm uppercase tracking-[0.24em] text-brand-100">Panel privado</p>
            <h1 className="mt-3 text-2xl font-semibold">Vida Mascotera Admin</h1>
            <p className="mt-2 text-sm leading-6 text-brand-50/90">Gestiona artículos, borradores y contenido editorial desde la web.</p>
          </Link>

          <nav className="mt-8 space-y-2">
            {[
              { label: 'Artículos', to: '/admin/articulos', Icon: FilePenLine },
              { label: 'Nuevo artículo', to: '/admin/articulos/nuevo', Icon: Plus },
            ].map(({ label, to, Icon }) => (
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-brand-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
                }
                key={to}
                to={to}
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Administración</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Centro editorial</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 sm:block">
                {profile?.fullName ?? 'Administrador'}
              </div>
              <Button onClick={() => void signOut()} variant="secondary">
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
