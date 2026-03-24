import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { ShellPage } from '@/routes/shell-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <ShellPage page="home" /> },
      { path: 'perros', element: <ShellPage page="perros" /> },
      { path: 'gatos', element: <ShellPage page="gatos" /> },
      { path: 'alimentacion', element: <ShellPage page="alimentacion" /> },
      { path: 'salud-cuidados', element: <ShellPage page="salud" /> },
      { path: 'accesorios', element: <ShellPage page="accesorios" /> },
      { path: 'comparativas', element: <ShellPage page="comparativas" /> },
      { path: 'blog', element: <ShellPage page="blog" /> },
      { path: 'contacto', element: <ShellPage page="contacto" /> },
      { path: '*', element: <ShellPage page="404" /> },
    ],
  },
])

