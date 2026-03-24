import { AlertCircle, CheckCircle2, Info, WifiOff } from 'lucide-react'
import { cn } from '@/utils/cn'

type BannerTone = 'info' | 'success' | 'warning' | 'offline'

const toneClasses: Record<BannerTone, string> = {
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  offline: 'border-coral-200 bg-coral-50 text-coral-900',
}

const toneIcons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  offline: WifiOff,
}

export function StatusBanner({ tone, message }: { tone: BannerTone; message: string }) {
  const Icon = toneIcons[tone]

  return (
    <div className={cn('flex items-start gap-3 rounded-[1.5rem] border px-5 py-4 text-sm leading-7', toneClasses[tone])} role="status">
      <Icon className="mt-1 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
