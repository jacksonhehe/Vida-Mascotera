import { ArrowUpRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '@/types/content'
import { useAppStore } from '@/store/app-store'
import { cn } from '@/utils/cn'
import { formatLongDate } from '@/utils/format'

export function ArticleCard({ article }: { article: Article }) {
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const isFavorite = favorites.includes(article.id)
  const detailPath = article.category === 'comparativas' ? `/comparativas/${article.slug}` : `/blog/${article.slug}`

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          alt={article.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
          src={article.image}
        />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800 backdrop-blur">
            {article.category}
          </span>
          <button
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className={cn(
              'rounded-full p-2 transition backdrop-blur',
              isFavorite ? 'bg-coral-100 text-coral-600' : 'bg-white/90 text-slate-500',
            )}
            onClick={() => toggleFavorite(article.id)}
            type="button"
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          </button>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
            <span>{article.author}</span>
            <span>{formatLongDate(article.publishedAt)}</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">{article.title}</h3>
          <p className="text-sm leading-7 text-slate-600">{article.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span className="rounded-full bg-cream-50 px-3 py-1 text-xs font-medium text-slate-600" key={tag}>
              #{tag}
            </span>
          ))}
        </div>

        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800" to={detailPath}>
          Leer artículo
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
    </article>
  )
}
