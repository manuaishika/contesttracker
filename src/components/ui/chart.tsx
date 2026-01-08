import * as React from "react"
import { cn } from "@/lib/utils"

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  )
)
Chart.displayName = "Chart"

export { Chart }
