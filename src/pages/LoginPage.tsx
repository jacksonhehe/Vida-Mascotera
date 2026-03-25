import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, KeyRound, Mail, ShieldCheck, Sparkles, UserRound } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import { StatusBanner } from '@/components/common/StatusBanner'
import { useAuth } from '@/providers/AuthProvider'
import type { UserRole } from '@/types/content'

type AuthMode = 'signin' | 'signup'
type FeedbackTone = 'info' | 'warning'

function getFriendlyAuthError(error: unknown, mode: AuthMode) {
  const message = error instanceof Error ? error.message.toLowerCase() : ''

  if (message.includes('invalid login credentials')) {
    return 'No encontramos una cuenta con ese correo y contraseña. Revisa tus datos o crea tu cuenta.'
  }

  if (message.includes('email not confirmed')) {
    return 'Revisa tu correo electrónico antes de volver a intentarlo.'
  }

  if (message.includes('user already registered')) {
    return 'Ese correo ya tiene una cuenta. Prueba iniciando sesión.'
  }

  if (message.includes('password should be at least')) {
    return 'La contraseña debe tener al menos 6 caracteres.'
  }

  if (mode === 'signin') {
    return 'No pudimos iniciar tu sesión. Revisa tu correo y contraseña.'
  }

  return 'No pudimos crear tu cuenta ahora mismo. Verifica los datos e inténtalo otra vez.'
}

function resolveRedirectPath(role: UserRole | null, fallbackPath: string | null) {
  if (fallbackPath && fallbackPath.startsWith('/')) {
    return fallbackPath
  }

  if (role === 'admin') {
    return '/admin/articulos'
  }

  if (role === 'editor') {
    return '/blog'
  }

  return '/'
}

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { status, profile, role, signIn, signUp, isAuthenticated } = useAuth()
  const [mode, setMode] = useState<AuthMode>('signin')
  const [fullName, setFullName] = useState(profile?.fullName ?? '')
  const [email, setEmail] = useState(profile?.email ?? '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ tone: FeedbackTone; message: string } | null>(null)

  const nextPath = useMemo(() => new URLSearchParams(location.search).get('next'), [location.search])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    navigate(resolveRedirectPath(role, nextPath), { replace: true })
  }, [isAuthenticated, navigate, nextPath, role])

  function validateForm() {
    if (!email.trim()) {
      return 'Escribe tu correo para continuar.'
    }

    if (!password.trim()) {
      return 'Escribe tu contraseña para continuar.'
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        return 'Queremos saber cómo llamarte.'
      }

      if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres.'
      }

      if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden.'
      }
    }

    return null
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback(null)

    const validationError = validateForm()
    if (validationError) {
      setFeedback({ tone: 'warning', message: validationError })
      return
    }

    setSubmitting(true)

    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp({ fullName, email, password })
        setFeedback({
          tone: 'info',
          message: 'Tu cuenta fue creada. Si hace falta confirmar el correo, te enviaremos un mensaje para completar el acceso.',
        })
      }
    } catch (error) {
      setFeedback({
        tone: 'warning',
        message: getFriendlyAuthError(error, mode),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream-50 px-4 py-10 sm:px-6 lg:px-8">
      <Seo
        canonicalPath="/login"
        description="Accede o crea tu cuenta de Vida Mascotera para guardar favoritos, preferencias y seguir disfrutando del contenido."
        title="Acceso a tu cuenta | Vida Mascotera"
      />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="overflow-hidden rounded-[2.5rem] bg-brand-900 p-8 text-white shadow-soft md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-brand-50">
            <Sparkles className="h-4 w-4" />
            Tu cuenta Vida Mascotera
          </p>
          <h1 className="mt-8 max-w-xl text-5xl font-semibold tracking-tight text-white">
            Entra o crea tu cuenta para seguir cuidando mejor a tu mascota
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-brand-50/90">
            Guarda tus contenidos favoritos, vuelve a tus recomendaciones y mantén tu experiencia siempre a mano.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              'Acceso sencillo con correo y contraseña.',
              'Creación de cuenta en pocos pasos.',
              'Tus contenidos y preferencias siempre a mano.',
              'Tu experiencia disponible cuando vuelvas.',
            ].map((item) => (
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5" key={item}>
                <p className="text-sm leading-7 text-brand-50">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
          <Link className="text-sm font-semibold text-brand-700 hover:text-brand-900" to="/">
            Volver al sitio
          </Link>

          <div className="mt-5 inline-flex rounded-full bg-slate-100 p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signin' ? 'bg-brand-900 text-white' : 'text-slate-600'}`}
              onClick={() => setMode('signin')}
              type="button"
            >
              Iniciar sesión
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-brand-900 text-white' : 'text-slate-600'}`}
              onClick={() => setMode('signup')}
              type="button"
            >
              Crear cuenta
            </button>
          </div>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900">
            {mode === 'signin' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {mode === 'signin'
              ? 'Accede con tu correo y contraseña para volver a tu cuenta.'
              : 'Completa tus datos para empezar a guardar tus preferencias y seguir tu contenido favorito.'}
          </p>

          {status === 'unavailable' ? (
            <div className="mt-8">
              <StatusBanner
                message="El acceso no está disponible en este momento. Inténtalo nuevamente más tarde."
                tone="warning"
              />
            </div>
          ) : null}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <label className="block" htmlFor="signup-full-name">
                <span className="mb-2 block text-sm font-medium text-slate-700">Tu nombre</span>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    autoComplete="name"
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    id="signup-full-name"
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Cómo quieres que te llamemos"
                    type="text"
                    value={fullName}
                  />
                </div>
              </label>
            ) : null}

            <label className="block" htmlFor="auth-email">
              <span className="mb-2 block text-sm font-medium text-slate-700">Correo electrónico</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  autoComplete="email"
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  id="auth-email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@correo.com"
                  type="email"
                  value={email}
                />
              </div>
            </label>

            <label className="block" htmlFor="auth-password">
              <span className="mb-2 block text-sm font-medium text-slate-700">Contraseña</span>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  id="auth-password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={mode === 'signin' ? 'Tu contraseña' : 'Crea una contraseña segura'}
                  type="password"
                  value={password}
                />
              </div>
            </label>

            {mode === 'signup' ? (
              <label className="block" htmlFor="auth-confirm-password">
                <span className="mb-2 block text-sm font-medium text-slate-700">Confirmar contraseña</span>
                <div className="relative">
                  <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    autoComplete="new-password"
                    className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                    id="auth-confirm-password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repite tu contraseña"
                    type="password"
                    value={confirmPassword}
                  />
                </div>
              </label>
            ) : null}

            <Button className="w-full" disabled={submitting || status === 'unavailable'} type="submit">
              {submitting ? 'Procesando...' : mode === 'signin' ? 'Entrar a mi cuenta' : 'Crear mi cuenta'}
            </Button>
          </form>

          {feedback ? (
            <div className="mt-5">
              <StatusBanner message={feedback.message} tone={feedback.tone} />
            </div>
          ) : null}

          <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-brand-700" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Acceso seguro y simple</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Entra con tus datos y sigue disfrutando de Vida Mascotera.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
            <ArrowRight className="h-4 w-4" />
            Si acabas de crear tu cuenta, revisa tu correo por si necesitas confirmar el acceso.
          </p>
        </section>
      </div>
    </div>
  )
}
