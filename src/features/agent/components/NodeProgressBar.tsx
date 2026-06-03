"use client"
import { motion } from "framer-motion"
import { NODE_ORDER } from "@/lib/constants"
import { NodeStatusItem } from "./NodeStatusItem"

interface NodeProgressBarProps {
  completedNodes: string[]
  currentNode: string | null
}

export function NodeProgressBar({ completedNodes, currentNode }: NodeProgressBarProps) {
  const progress = completedNodes.length / NODE_ORDER.length

  return (
    <div>
      <div className="h-0.5 bg-white/6 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="divide-y divide-white/5">
        {NODE_ORDER.map((node) => {
          const status = completedNodes.includes(node) ? "done" : currentNode === node ? "running" : "pending"
          return <NodeStatusItem key={node} node={node} status={status} />
        })}
      </div>
    </div>
  )
}