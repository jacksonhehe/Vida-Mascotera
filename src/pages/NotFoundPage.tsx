import { Button } from '@/components/common/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">La página no existe.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Revisa la navegación principal o vuelve al inicio para seguir explorando recursos de Vida Mascotera.
        </p>
        <Button className="mt-6" to="/">
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}

