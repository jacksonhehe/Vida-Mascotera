import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface ButtonProps {
  children: ReactNode
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
}

const variantClasses = {
  primary: 'bg-brand-900 text-white hover:bg-brand-800',
  secondary: 'bg-white text-brand-900 ring-1 ring-brand-200 hover:bg-brand-50',
  ghost: 'bg-transparent text-brand-900 hover:bg-brand-50',
}

export function Button({ children, to, onClick, variant = 'primary', className, type = 'button', disabled = false }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[variant],
    className,
  )

  if (to) {
    return (
      <Link className={classes} to={to}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
