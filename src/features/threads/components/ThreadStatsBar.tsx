import type { ThreadStats } from "../types"
import { FileText } from "lucide-react"

interface ThreadStatsBarProps {
  stats: ThreadStats
}

export function ThreadStatsBar({ stats }: ThreadStatsBarProps) {
  const items = [
    { label: "Scraped", value: stats.rawJobs },
    { label: "Filtered", value: stats.filteredJobs },
    { label: "Applied", value: stats.applications, highlight: true },
  ]

  return (
    <div className="rounded-xl border border-white/8 bg-white/2 p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-3.5 h-3.5 text-white/30" />
        <span className="font-mono text-xs text-white/50">{stats.cvName}</span>
        <span className="ml-auto font-mono text-[10px] text-white/20">
          {new Date(stats.createdAt).toLocaleString("en-GB")}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div key={item.label} className={`rounded-lg p-3 text-center ${item.highlight ? "bg-emerald-500/8 border border-emerald-500/15" : "bg-white/3 border border-white/5"}`}>
            <p className={`font-mono text-xl font-bold ${item.highlight ? "text-emerald-400" : "text-white"}`}>
              {item.value}
            </p>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider mt-0.5">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}