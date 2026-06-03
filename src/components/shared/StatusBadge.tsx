import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  score: number
  className?: string
}

export function ScoreBadge({ score, className }: StatusBadgeProps) {
  const color =
    score >= 8
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : score >= 6
      ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
      : "bg-red-500/15 text-red-400 border-red-500/30"

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-mono text-xs font-semibold",
        color,
        className
      )}
    >
      {score.toFixed(1)}
    </span>
  )
}