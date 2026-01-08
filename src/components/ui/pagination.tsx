import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  ({ className, currentPage = 1, totalPages = 1, onPageChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    )
  }
)
Pagination.displayName = "Pagination"

export { Pagination }
