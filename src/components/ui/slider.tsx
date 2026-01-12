import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderPropsBase extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value?: number[]
  onValueChange?: (value: number[]) => void
  type?: never
}

export type SliderProps = SliderPropsBase

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [0], onValueChange, ...props }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        value={value[0]}
        onChange={(e) => onValueChange?.([Number(e.target.value)])}
        className={cn("w-full", className)}
        {...props}
      />
    )
  }
)
Slider.displayName = "Slider"

export { Slider }
