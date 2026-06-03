"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { NODE_LABELS } from "@/lib/constants"

interface NodeStatusItemProps {
  node: string
  status: "pending" | "running" | "done"
}

export function NodeStatusItem({ node, status }: NodeStatusItemProps) {
  const label = NODE_LABELS[node] ?? node

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-5 h-5 flex items-center justify-center shrink-0">
        {status === "done" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center"
          >
            <Check className="w-2.5 h-2.5 text-emerald-400" />
          </motion.div>
        )}
        {status === "running" && <LoadingSpinner className="w-4 h-4" />}
        {status === "pending" && <div className="w-1.5 h-1.5 rounded-full bg-white/15" />}
      </div>
      <span className={`text-sm font-mono transition-colors ${
        status === "done" ? "text-white/60 line-through decoration-white/20"
        : status === "running" ? "text-white" : "text-white/25"
      }`}>{label}</span>
      {status === "running" && (
        <span className="ml-auto text-xs font-mono text-emerald-400 animate-pulse">running</span>
      )}
    </div>
  )
}