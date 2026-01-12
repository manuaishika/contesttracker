import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value?: string
  onValueChange?: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue>({})

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", value, onValueChange, ...props }, ref) => {
    return (
      <AccordionContext.Provider value={{ value, onValueChange }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = "Accordion"

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-b", className)}
        data-value={value}
        {...props}
      />
    )
  }
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
  </button>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
