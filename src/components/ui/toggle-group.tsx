import * as React from "react"
import type { ToggleProps } from "./toggle"

// ToggleProps is used for type checking in React.isValidElement

export interface ToggleGroupProps {
  value?: string[]
  onValueChange?: (value: string[]) => void
  children: React.ReactNode
}

function ToggleGroup({ value = [], onValueChange, children }: ToggleGroupProps) {
  return (
    <div className="flex gap-2">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ToggleProps>(child)) {
          const childValue = child.props.value as string
          return React.cloneElement(child, {
            pressed: value.includes(childValue),
            onPressedChange: (pressed: boolean) => {
              if (pressed) {
                onValueChange?.([...value, childValue])
              } else {
                onValueChange?.(value.filter((v) => v !== childValue))
              }
            },
          })
        }
        return child
      })}
    </div>
  )
}

export { ToggleGroup }
