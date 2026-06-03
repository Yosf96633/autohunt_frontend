import { cn } from "@/lib/utils"

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-4 h-4 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin",
        className
      )}
    />
  )
}