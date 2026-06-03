"use client"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { JobCard } from "./JobCard"
import { useJobReview } from "../hooks/useJobReview"
import { EmptyState } from "@/components/shared/EmptyState"
import type { ScoredJob } from "@/types/job"

interface JobReviewPanelProps {
  jobs: ScoredJob[]
  onSubmit: (approvedIds: string[]) => void
}

export function JobReviewPanel({ jobs, onSubmit }: JobReviewPanelProps) {
  const { approvedIds, toggle, approveAll, skipAll, isApproved } = useJobReview(jobs)

  const handleSubmit = () => onSubmit(Array.from(approvedIds))

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-mono font-semibold text-white tracking-tight mb-1">Review Jobs</h1>
          <p className="text-sm font-mono text-white/40">{approvedIds.size} of {jobs.length} selected for application</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={approveAll} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-white/50 hover:text-white/80 transition-all">All</button>
          <button type="button" onClick={skipAll} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-mono text-white/50 hover:text-white/80 transition-all">None</button>
        </div>
      </div>
      {jobs.length === 0 ? (
        <EmptyState message="No jobs found for review" />
      ) : (
        <div className="space-y-3 mb-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} approved={isApproved(job.id)} onToggle={() => toggle(job.id)} />
          ))}
        </div>
      )}
      <button type="button" onClick={handleSubmit} disabled={approvedIds.size === 0}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-semibold tracking-wide transition-all bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed">
        <Send className="w-4 h-4" />
        Apply to {approvedIds.size} Job{approvedIds.size !== 1 ? "s" : ""}
      </button>
    </motion.div>
  )
}