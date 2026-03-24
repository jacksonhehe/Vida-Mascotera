import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppBootstrap } from '@/hooks/useAppBootstrap'
import { getArticleBySlug, getRelatedArticles } from '@/services/content-service'
import { ArticleDetailPage } from '@/pages/ArticleDetailPage'
import { BlogPage } from '@/pages/BlogPage'
import { ContactPage } from '@/pages/ContactPage'
import { ContentPage } from '@/pages/ContentPage'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

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
  | 'contacto'
  | '404'

function ShellLoadingState() {
  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-soft md:p-10">
        <div className="h-3 w-32 rounded-full bg-slate-200" />
        <div className="mt-6 h-12 max-w-2xl rounded-2xl bg-slate-200" />
        <div className="mt-4 h-6 max-w-3xl rounded-2xl bg-slate-100" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div className="h-32 rounded-[1.5rem] bg-slate-100" key={index} />
          ))}
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft" key={index}>
            <div className="h-56 bg-slate-200" />
            <div className="space-y-4 p-6">
              <div className="h-4 w-24 rounded-full bg-slate-100" />
              <div className="h-7 rounded-2xl bg-slate-200" />
              <div className="h-20 rounded-2xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShellNotice({ message }: { message: string }) {
  return (
    <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-7 text-amber-900">
      {message}
    </div>
  )
}

export function ShellPage({ page }: { page: ShellPageName }) {
  const { slug } = useParams()
  const { articles, products, loading, error } = useAppBootstrap()

  const selectedArticle = useMemo(() => getArticleBySlug(articles, slug), [articles, slug])
  const relatedArticles = useMemo(
    () => (selectedArticle ? getRelatedArticles(articles, selectedArticle) : []),
    [articles, selectedArticle],
  )

  if (loading) {
    return <ShellLoadingState />
  }

  return (
    <div className="space-y-6">
      {error ? <ShellNotice message={error} /> : null}

      {(() => {
        switch (page) {
          case 'home':
            return <HomePage articles={articles} products={products} />
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
          case 'contacto':
            return <ContactPage />
          case 'perros':
          case 'gatos':
          case 'alimentacion':
          case 'salud':
          case 'accesorios':
          case 'comparativas':
            return <ContentPage articles={articles} category={page} products={products} />
          default:
            return <NotFoundPage />
        }
      })()}
    </div>
  )
}
