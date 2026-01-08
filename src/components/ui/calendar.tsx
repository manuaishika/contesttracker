import * as React from "react"
import { cn } from "@/lib/utils"

export interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "single" | "range"
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-3", className)}
        {...props}
      />
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar }
