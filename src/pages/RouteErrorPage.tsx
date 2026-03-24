import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { Button } from '@/components/common/Button'

export function RouteErrorPage() {
  const error = useRouteError()

  const title = isRouteErrorResponse(error) ? 'No pudimos abrir esta página' : 'Algo interrumpió la experiencia'
  const message = isRouteErrorResponse(error)
    ? 'La ruta que intentas visitar no está disponible ahora mismo. Puedes volver al inicio o seguir explorando nuestras guías.'
    : 'Ocurrió un problema inesperado. Ya dejamos una salida clara para que puedas seguir navegando sin ver una pantalla técnica.'

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-4">
      <div className="max-w-2xl rounded-[2.5rem] bg-white p-10 shadow-soft md:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Vida Mascotera</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">{message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Volver al inicio</Button>
          <Button to="/blog" variant="secondary">
            Ir al blog
          </Button>
        </div>
      </div>
    </div>
  )
}
