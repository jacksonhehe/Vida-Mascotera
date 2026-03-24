import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="rounded-full bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => (
          <li className="flex items-center gap-2" key={`${item.label}-${index}`}>
            {item.to ? (
              <Link className="rounded-full px-1 py-0.5 transition hover:text-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-400" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-slate-900">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
