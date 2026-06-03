"use client"
import { motion } from "framer-motion"
import { NodeProgressBar } from "./NodeProgressBar"
import { LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { NODE_LABELS } from "@/lib/constants"

interface AgentRunnerProps {
  completedNodes: string[]
  currentNode: string | null
  error: string | null
}

export function AgentRunner({ completedNodes, currentNode, error }: AgentRunnerProps) {
  const currentLabel = currentNode ? (NODE_LABELS[currentNode] ?? currentNode) : "Initialising"

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
      <div className="mb-8 flex items-center gap-4">
        <LoadingSpinner className="w-5 h-5" />
        <div>
          <h1 className="text-2xl font-mono font-semibold text-white tracking-tight mb-0.5">Hunt in Progress</h1>
          <p className="text-sm font-mono text-emerald-400">{currentLabel}...</p>
        </div>
      </div>
      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm font-mono text-red-400">{error}</div>
      )}
      <div className="rounded-xl border border-white/8 bg-white/3 p-6">
        <NodeProgressBar completedNodes={completedNodes} currentNode={currentNode} />
      </div>
    </motion.div>
  )
}