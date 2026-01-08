import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

export interface TooltipProps {
  children: React.ReactNode
}

export function Tooltip({ children }: TooltipProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipContext.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error("TooltipTrigger must be used within Tooltip")

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={() => context.onOpenChange(true)}
      onMouseLeave={() => context.onOpenChange(false)}
      {...props}
    />
  )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(TooltipContext)
  if (!context) throw new Error("TooltipContent must be used within Tooltip")

  if (!context.open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

export { TooltipTrigger, TooltipContent }
