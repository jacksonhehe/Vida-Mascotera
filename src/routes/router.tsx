import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { ShellPage } from '@/routes/shell-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <ShellPage page="home" /> },
      { path: 'perros', element: <ShellPage page="perros" /> },
      { path: 'gatos', element: <ShellPage page="gatos" /> },
      { path: 'alimentacion', element: <ShellPage page="alimentacion" /> },
      { path: 'salud-cuidados', element: <ShellPage page="salud" /> },
      { path: 'accesorios', element: <ShellPage page="accesorios" /> },
      { path: 'comparativas', element: <ShellPage page="comparativas" /> },
      { path: 'comparativas/:slug', element: <ShellPage page="comparison-detail" /> },
      { path: 'blog', element: <ShellPage page="blog" /> },
      { path: 'blog/:slug', element: <ShellPage page="article-detail" /> },
      { path: 'recomendaciones/:slug', element: <ShellPage page="product-detail" /> },
      { path: 'contacto', element: <ShellPage page="contacto" /> },
      { path: '*', element: <ShellPage page="404" /> },
    ],
  },
])
