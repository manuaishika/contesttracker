import * as React from "react"
import { cn } from "@/lib/utils"

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function Drawer({ open: controlledOpen, onOpenChange, children }: DrawerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const handleOpenChange = onOpenChange ?? setInternalOpen

  return (
    <DrawerContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  )
}

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button ref={ref} className={className} {...props} />
))
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = React.useContext(DrawerContext)
  if (!context?.open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={() => context.onOpenChange(false)} />
      <div
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 rounded-t-lg border bg-background p-4",
          className
        )}
        {...props}
      />
    </div>
  )
})
DrawerContent.displayName = "DrawerContent"

export { DrawerTrigger, DrawerContent }
