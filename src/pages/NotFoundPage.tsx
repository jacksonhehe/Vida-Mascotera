import { Button } from '@/components/common/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Esta página se perdió en el camino.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Puede que el enlace haya cambiado o que todavía estemos organizando este contenido. Vuelve al inicio o sigue explorando nuestras guías.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button to="/">Volver al inicio</Button>
          <Button to="/blog" variant="secondary">
            Ir al blog
          </Button>
        </div>
      </div>
    </div>
  )
}
