"use client"
import { motion } from "framer-motion"
import { RotateCcw, Trophy } from "lucide-react"
import { DigestStatCard } from "./DigestStatCard"
import { AppliedJobsList } from "./AppliedJobsList"
import type { DigestSummary } from "@/types/digest"

interface DigestPanelProps {
  summary: DigestSummary
  onReset: () => void
}

export function DigestPanel({ summary, onReset }: DigestPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-mono font-semibold text-white tracking-tight mb-1">Hunt Complete</h1>
        <p className="text-sm font-mono text-white/40">{new Date(summary.completedAt).toLocaleString()}</p>
      </div>
      {summary.topMatch && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-0.5">Top Match</p>
            <p className="text-sm font-mono text-white truncate">{summary.topMatch.title} — {summary.topMatch.company}</p>
          </div>
          <span className="font-mono text-lg font-bold text-emerald-400 shrink-0">{summary.topMatch.score.toFixed(1)}</span>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <DigestStatCard label="Scraped" value={summary.totalScraped} />
        <DigestStatCard label="Filtered" value={summary.totalFiltered} />
        <DigestStatCard label="Applied" value={summary.totalApplied} highlight />
        <DigestStatCard label="Skipped" value={summary.totalSkipped} />
      </div>
      <AppliedJobsList jobs={summary.appliedJobs} />
      <button type="button" onClick={onReset}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-semibold tracking-wide transition-all border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white">
        <RotateCcw className="w-4 h-4" />
        Run Again
      </button>
    </motion.div>
  )
}