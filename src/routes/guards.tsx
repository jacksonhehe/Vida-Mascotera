import { ShieldAlert } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { useAuth } from '@/providers/AuthProvider'
import type { UserRole } from '@/types/content'

function AccessLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-10 shadow-soft">
        <Seo canonicalPath="/login" description="Acceso de Vida Mascotera." title="Accediendo | Vida Mascotera" />
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Vida Mascotera</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Comprobando tu acceso</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Estamos validando tu sesión para llevarte a la zona adecuada.
        </p>
      </div>
    </div>
  )
}

export function RequireRole({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const location = useLocation()
  const { status, role } = useAuth()

  if (status === 'loading') {
    return <AccessLoadingScreen />
  }

  if (status === 'unauthenticated' || status === 'unavailable') {
    const next = `${location.pathname}${location.search}${location.hash}`
    return <Navigate replace to={`/login?next=${encodeURIComponent(next)}`} />
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate replace to="/acceso-denegado" />
  }

  return <Outlet />
}

export function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
      <div className="max-w-2xl rounded-[2.5rem] bg-white p-10 shadow-soft md:p-12">
        <Seo canonicalPath="/acceso-denegado" description="Acceso restringido en Vida Mascotera." title="Acceso denegado | Vida Mascotera" />
        <div className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-4 py-2 text-sm font-semibold text-coral-700">
          <ShieldAlert className="h-4 w-4" />
          Acceso restringido
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">Tu cuenta no tiene permiso para entrar aquí</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          Si necesitas acceso editorial o administrativo, podemos prepararlo desde tu perfil en Vida Mascotera.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Volver al inicio</Button>
          <Button to="/login" variant="secondary">
            Cambiar de cuenta
          </Button>
        </div>
      </div>
    </div>
  )
}
