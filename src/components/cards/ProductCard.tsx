import { ArrowUpRight, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ProductRecommendation } from '@/types/content'
import { useAppStore } from '@/store/app-store'
import { buildSavedItemKey } from '@/utils/saved-items'
import { cn } from '@/utils/cn'

export function ProductCard({ product }: { product: ProductRecommendation }) {
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const favoriteKey = buildSavedItemKey('product', product.id)
  const isFavorite = favorites.includes(favoriteKey)

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img alt={product.name} className="h-56 w-full object-cover" src={product.image} />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
          {product.badge}
        </div>
        <button
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          className={cn(
            'absolute right-4 top-4 rounded-full p-2 transition backdrop-blur',
            isFavorite ? 'bg-coral-100 text-coral-600' : 'bg-white/90 text-slate-500',
          )}
          onClick={() => toggleFavorite(favoriteKey)}
          type="button"
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-mint-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mint-700">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            {product.rating.toFixed(1)}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm leading-7 text-slate-600">{product.description}</p>
        </div>
        <div className="rounded-2xl bg-cream-50 p-4">
          <p className="text-sm font-semibold text-slate-800">{product.priceLabel}</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">{product.affiliateHint}</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800"
          to={`/recomendaciones/${product.slug}`}
        >
          {product.ctaLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
