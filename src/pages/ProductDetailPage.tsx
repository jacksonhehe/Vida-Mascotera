import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '@/components/cards/ProductCard'
import { Breadcrumbs } from '@/components/common/Breadcrumbs'
import { Button } from '@/components/common/Button'
import { Seo } from '@/components/common/Seo'
import type { ProductRecommendation } from '@/types/content'

interface ProductDetailPageProps {
  product: ProductRecommendation
  relatedProducts: ProductRecommendation[]
}

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  return (
    <article className="space-y-10">
      <Seo
        canonicalPath={`/recomendaciones/${product.slug}`}
        description={product.seoDescription}
        image={product.image}
        title={product.seoTitle}
        type="product"
      />

      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Recomendaciones', to: '/accesorios' },
          { label: product.name },
        ]}
      />

      <section className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <img alt={product.name} className="h-full min-h-[320px] w-full object-cover" src={product.image} />
          <div className="space-y-6 p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-800">
                {product.badge}
              </span>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                <Star className="h-4 w-4 fill-current" />
                {product.rating.toFixed(1)}
              </div>
            </div>
            <header className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{product.name}</h1>
              <p className="text-lg leading-8 text-slate-600">{product.longDescription}</p>
            </header>
            <div className="rounded-[1.75rem] bg-cream-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Cuándo tiene más sentido</p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                {product.useCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button>{product.ctaLabel}</Button>
              <p className="text-sm text-slate-500">{product.priceLabel}</p>
            </div>
            <p className="text-sm leading-7 text-slate-600">{product.affiliateHint}</p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Seguir explorando</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Otras recomendaciones de la misma línea</h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800" to="/accesorios">
              Volver a accesorios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
