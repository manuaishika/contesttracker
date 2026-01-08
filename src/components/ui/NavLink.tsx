import { Link, LinkProps, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export function NavLink({ children, className, ...props }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === props.to

  return (
    <Link
      {...props}
      className={cn(
        'px-4 py-2 rounded-md transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-accent hover:text-accent-foreground',
        className
      )}
    >
      {children}
    </Link>
  )
}
