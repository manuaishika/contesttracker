import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"

export interface InputOTPProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number
  value?: string
  onChange?: (value: string) => void
}

const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(
  ({ className, length = 6, value = "", onChange, ...props }, ref) => {
    const handleChange = (index: number, char: string) => {
      const newValue = value.split("")
      newValue[index] = char
      onChange?.(newValue.join(""))
    }

    return (
      <div
        ref={ref}
        className={cn("flex gap-2", className)}
        {...props}
      >
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 text-center"
          />
        ))}
      </div>
    )
  }
)
InputOTP.displayName = "InputOTP"

export { InputOTP }
