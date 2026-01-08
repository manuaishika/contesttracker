import * as React from "react"
import { cn } from "@/lib/utils"

export interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
}

const Resizable = React.forwardRef<HTMLDivElement, ResizableProps>(
  ({ className, direction = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    />
  )
)
Resizable.displayName = "Resizable"

export { Resizable }
