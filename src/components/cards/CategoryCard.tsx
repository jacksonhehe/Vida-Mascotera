import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CategoryHighlight } from '@/types/content'
import { cn } from '@/utils/cn'

const accentMap = {
  brand: 'from-brand-900/90 to-brand-700/70',
  mint: 'from-mint-800/85 to-mint-500/70',
  coral: 'from-coral-700/90 to-coral-500/70',
  cream: 'from-cream-800/80 to-cream-500/70',
}

export function CategoryCard({ category }: { category: CategoryHighlight }) {
  return (
    <Link
      className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-soft"
      to={category.path}
    >
      <img
        alt={category.title}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        src={category.image}
      />
      <div className={cn('absolute inset-0 bg-gradient-to-t', accentMap[category.accent])} />
      <div className="absolute inset-x-0 bottom-0 space-y-3 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">{category.title}</h3>
          <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
        <p className="max-w-sm text-sm leading-6 text-white/85">{category.description}</p>
      </div>
    </Link>
  )
}
