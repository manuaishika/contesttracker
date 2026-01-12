import * as React from "react"
import { Label } from "./label"

export interface FormFieldProps {
  label?: string
  error?: string
  children: React.ReactNode
}

function FormField({ label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

export { FormField }
