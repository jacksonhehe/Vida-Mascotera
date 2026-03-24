import { CloudOff, Wifi } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/utils/cn'

export function OfflineStatus() {
  const isOffline = useAppStore((state) => state.isOffline)

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold',
        isOffline ? 'bg-coral-100 text-coral-700' : 'bg-mint-100 text-mint-700',
      )}
    >
      {isOffline ? <CloudOff size={14} /> : <Wifi size={14} />}
      {isOffline ? 'Modo offline activo' : 'Sincronizado'}
    </div>
  )
}

