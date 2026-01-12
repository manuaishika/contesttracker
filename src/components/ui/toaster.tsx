import { useToast } from './use-toast'
import { Toast } from './toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => {
        let variant: "default" | "destructive" = "default"
        if (toast.variant === "destructive") {
          variant = "destructive"
        }
        return (
          <Toast 
            key={toast.id} 
            variant={variant}
          >
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div>{toast.description}</div>}
          </Toast>
        )
      })}
    </div>
  )
}
