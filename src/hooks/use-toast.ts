import { useState, useEffect } from 'react'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
}

interface ToastState {
  toasts: Toast[]
}

let toastState: ToastState = { toasts: [] }
const listeners = new Set<(toasts: Toast[]) => void>()

function notify() {
  listeners.forEach((listener) => listener([...toastState.toasts]))
}

export function toast(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substring(2, 9)
  toastState.toasts = [...toastState.toasts, { ...toast, id }]
  notify()

  setTimeout(() => {
    dismiss(id)
  }, 5000)

  return id
}

export function dismiss(id: string) {
  toastState.toasts = toastState.toasts.filter((t) => t.id !== id)
  notify()
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>(toastState.toasts)

  useEffect(() => {
    listeners.add(setToasts)
    return () => {
      listeners.delete(setToasts)
    }
  }, [])

  return {
    toasts,
    toast,
    dismiss,
  }
}
