import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ShellSkeleton } from '@/components/common/ShellSkeleton'
import { StatusBanner } from '@/components/common/StatusBanner'
import { useAppBootstrap } from '@/hooks/useAppBootstrap'
import { getArticleBySlug, getProductBySlug, getRelatedArticles, getRelatedProducts } from '@/services/content-service'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { BlogPage } from '@/pages/BlogPage'
import { ContactPage } from '@/pages/ContactPage'
import { ContentPage } from '@/pages/ContentPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'

type ShellPageName =
  | 'home'
  | 'perros'
  | 'gatos'
  | 'alimentacion'
  | 'salud'
  | 'accesorios'
  | 'comparativas'
  | 'comparison-detail'
  | 'blog'
  | 'article-detail'
  | 'product-detail'
  | 'contacto'
  | '404'

export function ShellPage({ page }: { page: ShellPageName }) {
  const { slug } = useParams()
  const { articles, products, loading, error } = useAppBootstrap()

  const selectedArticle = useMemo(() => getArticleBySlug(articles, slug), [articles, slug])
  const selectedProduct = useMemo(() => getProductBySlug(products, slug), [products, slug])
  const relatedArticles = useMemo(
    () => (selectedArticle ? getRelatedArticles(articles, selectedArticle) : []),
    [articles, selectedArticle],
  )
  const relatedProducts = useMemo(
    () => (selectedProduct ? getRelatedProducts(products, selectedProduct) : []),
    [products, selectedProduct],
  )

  if (loading) {
    return <ShellSkeleton />
  }

  return (
    <div className="space-y-6">
      {error ? <StatusBanner message={error} tone="warning" /> : null}

      {(() => {
        switch (page) {
          case 'home':
            return <HomePage articles={articles} />
          case 'blog':
            return <BlogPage articles={articles} />
          case 'article-detail':
            return selectedArticle && selectedArticle.category !== 'comparativas' ? (
              <ArticleDetailPage article={selectedArticle} products={products} relatedArticles={relatedArticles} />
            ) : (
              <NotFoundPage />
            )
          case 'comparison-detail':
            return selectedArticle && selectedArticle.category === 'comparativas' ? (
              <ArticleDetailPage article={selectedArticle} products={products} relatedArticles={relatedArticles} />
            ) : (
              <NotFoundPage />
            )
          case 'product-detail':
            return selectedProduct ? (
              <ProductDetailPage product={selectedProduct} relatedProducts={relatedProducts} />
            ) : (
              <NotFoundPage />
            )
          case 'contacto':
            return <ContactPage />
          case 'perros':
          case 'gatos':
          case 'alimentacion':
          case 'salud':
          case 'accesorios':
          case 'comparativas':
            return <ContentPage articles={articles} category={page} />
          default:
            return <NotFoundPage />
        }
      })()}
    </div>
  )
}
