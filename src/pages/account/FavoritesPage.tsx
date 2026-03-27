import { HeartOff } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { ProductCard } from '@/components/cards/ProductCard'
import { Seo } from '@/components/common/Seo'
import { useAppBootstrap } from '@/hooks/useAppBootstrap'
import { useAppStore } from '@/store/app-store'
import type { Article, ProductRecommendation } from '@/types/content'
import { parseSavedItemKey } from '@/utils/saved-items'

export function FavoritesPage() {
  const { articles, products } = useAppBootstrap()
  const favorites = useAppStore((state) => state.favorites)
  const removeFavorite = useAppStore((state) => state.removeFavorite)
  const setFavorites = useAppStore((state) => state.setFavorites)

  const { favoriteArticles, favoriteProducts, validKeys } = useMemo(() => {
    const articleIds = new Set(articles.map((article) => article.id))
    const productIds = new Set(products.map((product) => product.id))
    const validKeys: string[] = []
    const favoriteArticles: Article[] = []
    const favoriteProducts: ProductRecommendation[] = []

    for (const favorite of favorites) {
      const parsed = parseSavedItemKey(favorite)
      if (!parsed) {
        continue
      }

      if (parsed.type === 'article' && articleIds.has(parsed.id)) {
        const article = articles.find((item) => item.id === parsed.id)
        if (article) {
          validKeys.push(`article:${parsed.id}`)
          favoriteArticles.push(article)
        }
      }

      if (parsed.type === 'product' && productIds.has(parsed.id)) {
        const product = products.find((item) => item.id === parsed.id)
        if (product) {
          validKeys.push(`product:${parsed.id}`)
          favoriteProducts.push(product)
        }
      }
    }

    return { favoriteArticles, favoriteProducts, validKeys }
  }, [articles, favorites, products])

  useEffect(() => {
    if (favorites.length && validKeys.length !== favorites.length) {
      setFavorites(validKeys)
    }
  }, [favorites.length, setFavorites, validKeys])

  return (
    <div className="space-y-8">
      <Seo
        canonicalPath="/favoritos"
        description="Todos tus artículos, comparativas y recomendaciones guardadas para volver rápido cuando los necesites."
        title="Favoritos | Vida Mascotera"
      />

      <section className="rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-coral-600">Tus favoritos</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Lo que guardaste para volver después.</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Aquí reunimos tus lecturas y recomendaciones guardadas para que no tengas que buscarlas otra vez.
        </p>
      </section>

      {!favoriteArticles.length && !favoriteProducts.length ? (
        <section className="rounded-[2rem] bg-white p-10 text-center shadow-soft">
          <HeartOff className="mx-auto h-8 w-8 text-slate-400" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Todavía no guardaste favoritos</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Cuando marques artículos, comparativas o recomendaciones, los verás aquí para volver rápido más tarde.
          </p>
        </section>
      ) : null}

      {favoriteArticles.length > 0 ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">Artículos y comparativas</h2>
            <p className="text-sm text-slate-500">{favoriteArticles.length} guardados</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {favoriteArticles.map((article) =>
              article ? (
                <div className="space-y-3" key={article.id}>
                  <ArticleCard article={article} />
                  <button
                    className="text-sm font-semibold text-coral-700"
                    onClick={() => removeFavorite(`article:${article.id}`)}
                    type="button"
                  >
                    Quitar de favoritos
                  </button>
                </div>
              ) : null,
            )}
          </div>
        </section>
      ) : null}

      {favoriteProducts.length > 0 ? (
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">Recomendaciones guardadas</h2>
            <p className="text-sm text-slate-500">{favoriteProducts.length} guardadas</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {favoriteProducts.map((product) =>
              product ? (
                <div className="space-y-3" key={product.id}>
                  <ProductCard product={product} />
                  <button
                    className="text-sm font-semibold text-coral-700"
                    onClick={() => removeFavorite(`product:${product.id}`)}
                    type="button"
                  >
                    Quitar de favoritos
                  </button>
                </div>
              ) : null,
            )}
          </div>
        </section>
      ) : null}
    </div>
  )
}
