import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/layouts/AdminLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { LoginPage } from '@/pages/LoginPage'
import { AccountPage } from '@/pages/account/AccountPage'
import { FavoritesPage } from '@/pages/account/FavoritesPage'
import { ForYouPage } from '@/pages/account/ForYouPage'
import { HistoryPage } from '@/pages/account/HistoryPage'
import { PreferencesPage } from '@/pages/account/PreferencesPage'
import { AdminArticleEditorPage } from '@/pages/admin/AdminArticleEditorPage'
import { AdminArticlesPage } from '@/pages/admin/AdminArticlesPage'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { AccessDeniedPage, RequireAuth, RequireRole } from '@/routes/guards'
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
      {
        element: <RequireAuth />,
        children: [
          { path: 'mi-cuenta', element: <AccountPage /> },
          { path: 'favoritos', element: <FavoritesPage /> },
          { path: 'preferencias', element: <PreferencesPage /> },
          { path: 'para-ti', element: <ForYouPage /> },
          { path: 'historial', element: <HistoryPage /> },
        ],
      },
      { path: '*', element: <ShellPage page="404" /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: '/acceso-denegado',
    element: <AccessDeniedPage />,
    errorElement: <RouteErrorPage />,
  },
  {
    element: <RequireRole allowedRoles={['admin']} />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate replace to="/admin/articulos" /> },
          { path: 'articulos', element: <AdminArticlesPage /> },
          { path: 'articulos/nuevo', element: <AdminArticleEditorPage /> },
          { path: 'articulos/editar/:id', element: <AdminArticleEditorPage /> },
        ],
      },
    ],
  },
])
