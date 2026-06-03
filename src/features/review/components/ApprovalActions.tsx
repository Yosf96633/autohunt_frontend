"use client"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApprovalActionsProps {
  approved: boolean
  onToggle: () => void
}

export function ApprovalActions({ approved, onToggle }: ApprovalActionsProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-semibold transition-all",
        approved
          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400"
          : "bg-white/5 border-white/10 text-white/30 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-400"
      )}
    >
      {approved ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      {approved ? "Approved" : "Skipped"}
    </button>
  )
}