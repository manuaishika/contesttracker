import * as React from "react"
import { cn } from "@/lib/utils"

interface HoverCardContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

export interface HoverCardProps {
  children: React.ReactNode
}

export function HoverCard({ children }: HoverCardProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <HoverCardContext.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </HoverCardContext.Provider>
  )
}

const HoverCardTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(HoverCardContext)
  if (!context) throw new Error("HoverCardTrigger must be used within HoverCard")

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
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(HoverCardContext)
  if (!context) throw new Error("HoverCardContent must be used within HoverCard")

  if (!context.open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
})
HoverCardContent.displayName = "HoverCardContent"

export { HoverCardTrigger, HoverCardContent }
