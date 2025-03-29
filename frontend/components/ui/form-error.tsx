import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormErrorProps {
  id?: string
  message?: string
  className?: string
}

export function FormError({ id, message, className }: FormErrorProps) {
  if (!message) return null

  return (
    <div id={id} className={cn("flex items-center gap-2 text-sm text-destructive mt-1.5", className)} role="alert">
      <AlertCircle className="h-4 w-4" aria-hidden="true" />
      <span>{message}</span>
    </div>
  )
}

