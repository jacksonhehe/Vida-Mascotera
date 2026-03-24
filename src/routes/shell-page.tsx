import { useAppBootstrap } from '@/hooks/useAppBootstrap'
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
  | 'blog'
  | 'contacto'
  | '404'

export function ShellPage({ page }: { page: ShellPageName }) {
  const { articles, products, loading } = useAppBootstrap()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-full bg-white px-5 py-3 text-sm text-slate-600 shadow-soft">
          Cargando contenido de Vida Mascotera...
        </div>
      </div>
    )
  }

  switch (page) {
    case 'home':
      return <HomePage articles={articles} products={products} />
    case 'blog':
      return <BlogPage articles={articles} />
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
}

