import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null)

export interface CollapsibleProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Collapsible({ open: controlledOpen, onOpenChange, children }: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const handleOpenChange = onOpenChange ?? setInternalOpen

  return (
    <CollapsibleContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </CollapsibleContext.Provider>
  )
}

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleTrigger must be used within Collapsible")

  return (
    <button
      ref={ref}
      className={cn(className)}
      onClick={() => context.onOpenChange(!context.open)}
      {...props}
    />
  )
})
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(CollapsibleContext)
  if (!context) throw new Error("CollapsibleContent must be used within Collapsible")

  if (!context.open) return null

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden", className)}
      {...props}
    />
  )
})
CollapsibleContent.displayName = "CollapsibleContent"

export { CollapsibleTrigger, CollapsibleContent }
