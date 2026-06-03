import { ScoreBadge } from "@/components/shared/StatusBadge"
import type { DigestSummary } from "@/types/digest"

interface AppliedJobsListProps {
  jobs: DigestSummary["appliedJobs"]
}

export function AppliedJobsList({ jobs }: AppliedJobsListProps) {
  if (jobs.length === 0) return null

  return (
    <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
      <div className="px-4 py-3 border-b border-white/6">
        <h3 className="text-xs font-mono text-white/50 uppercase tracking-wider">Applied Jobs</h3>
      </div>
      <div className="divide-y divide-white/5">
        {jobs.map((job, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <ScoreBadge score={job.score} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-mono text-white truncate">{job.title}</p>
              <p className="text-xs font-mono text-white/40">{job.company}</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 shrink-0">{job.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}