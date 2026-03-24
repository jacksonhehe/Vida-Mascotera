import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CategoryHighlight } from '@/types/content'
import { cn } from '@/utils/cn'

const accentMap = {
  brand: 'from-brand-900/95 to-brand-700/75',
  mint: 'from-mint-900/95 to-mint-600/75',
  coral: 'from-coral-700/95 to-coral-500/75',
  cream: 'from-[#746249]/95 to-[#b69d7a]/75',
}

export function CategoryCard({ category }: { category: CategoryHighlight }) {
  return (
    <Link
      className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl"
      to={category.path}
    >
      <img
        alt={category.title}
        className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        src={category.image}
      />
      <div className={cn('absolute inset-0 bg-gradient-to-t', accentMap[category.accent])} />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <h3 className="max-w-xs text-2xl font-semibold leading-tight">{category.title}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="max-w-sm text-sm leading-7 text-white/90">{category.description}</p>
      </div>
    </Link>
  )
}
