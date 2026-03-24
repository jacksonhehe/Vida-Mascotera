import { Star } from 'lucide-react'
import type { ProductRecommendation } from '@/types/content'

export function ProductCard({ product }: { product: ProductRecommendation }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white shadow-soft">
      <img alt={product.name} className="h-56 w-full object-cover" src={product.image} />
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
          <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <div className="rounded-2xl bg-cream-50 p-4">
          <p className="text-sm font-semibold text-slate-800">{product.priceLabel}</p>
          <p className="mt-1 text-xs leading-6 text-slate-500">{product.affiliateHint}</p>
        </div>
      </div>
    </article>
  )
}

