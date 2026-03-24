import { Heart } from 'lucide-react'
import type { Article } from '@/types/content'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/utils/cn'
import { formatLongDate } from '@/utils/format'

export function ArticleCard({ article }: { article: Article }) {
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const isFavorite = favorites.includes(article.id)

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-soft">
      <img alt={article.title} className="h-52 w-full object-cover" src={article.image} />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            {article.category}
          </span>
          <button
            className={cn(
              'rounded-full p-2 transition',
              isFavorite ? 'bg-coral-100 text-coral-600' : 'bg-slate-100 text-slate-500',
            )}
            onClick={() => toggleFavorite(article.id)}
            type="button"
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          </button>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">{article.title}</h3>
          <p className="text-sm leading-6 text-slate-600">{article.excerpt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{article.author}</span>
          <span>{formatLongDate(article.publishedAt)}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  )
}

