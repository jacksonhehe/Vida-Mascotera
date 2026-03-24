import { useMemo } from 'react'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { ProductCard } from '@/components/cards/ProductCard'
import { PageHero } from '@/components/sections/PageHero'
import { categoryCopy } from '@/lib/constants'
import { useAppStore } from '@/store/app-store'
import type { Article, ProductRecommendation, PetCategory } from '@/types/content'

interface ContentPageProps {
  category: Exclude<PetCategory, 'inicio' | 'contacto'>
  articles: Article[]
  products: ProductRecommendation[]
}

export function ContentPage({ category, articles, products }: ContentPageProps) {
  const copy = categoryCopy[category]
  const selectedCategory = useAppStore((state) => state.selectedCategory)
  const searchTerm = useAppStore((state) => state.searchTerm)
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory)
  const setSearchTerm = useAppStore((state) => state.setSearchTerm)

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const categoryMatch =
          selectedCategory === 'todas' ? article.category === category : article.category === selectedCategory
        const searchMatch =
          searchTerm.length === 0 ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        return categoryMatch && searchMatch
      }),
    [articles, category, searchTerm, selectedCategory],
  )

  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === category || category === 'comparativas'),
    [category, products],
  )

  return (
    <div className="space-y-10">
      <PageHero emphasis={copy.emphasis} intro={copy.intro} title={copy.title} />
      <section className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[0.7fr_0.3fr]">
          <input
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar artículos, temas o términos clave"
            type="search"
            value={searchTerm}
          />
          <select
            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-400"
            onChange={(event) => setSelectedCategory(event.target.value as PetCategory | 'todas')}
            value={selectedCategory}
          >
            <option value="todas">Filtrar por: esta sección</option>
            <option value={category}>{category}</option>
            <option value="blog">blog</option>
            <option value="comparativas">comparativas</option>
          </select>
        </div>
      </section>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Artículos relacionados</h2>
          <p className="text-sm text-slate-500">{filteredArticles.length} resultados</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {filteredArticles.length ? (
            filteredArticles.map((article) => <ArticleCard article={article} key={article.id} />)
          ) : (
            <div className="rounded-[1.5rem] bg-white p-6 text-sm text-slate-600 shadow-soft">
              No hay coincidencias con los filtros actuales.
            </div>
          )}
        </div>
      </section>
      {filteredProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">Selección recomendada</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
