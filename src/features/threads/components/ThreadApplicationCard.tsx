"use client"
import { useState } from "react"
import { MapPin, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { ScoreBadge } from "@/components/shared/StatusBadge"
import type { ThreadApplication } from "../types"

interface ThreadApplicationCardProps {
  app: ThreadApplication
}

export function ThreadApplicationCard({ app }: ThreadApplicationCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-white/8 bg-white/2 overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <ScoreBadge score={app.score} />
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm font-semibold text-white truncate">{app.title}</h3>
          <div className="flex items-center gap-3 mt-0.5 text-xs font-mono text-white/40">
            <span>{app.company}</span>
            {app.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {app.location}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
            app.status === "applied"
              ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/8"
              : "text-white/30 border-white/8 bg-white/3"
          }`}>
            {app.status}
          </span>
          <a href={app.applyUrl} target="_blank" rel="noopener noreferrer"
            className="text-white/20 hover:text-white/60 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Reasoning */}
      <div className="px-4 pb-3">
        <p className="font-mono text-xs text-white/40 leading-relaxed">{app.reasoning}</p>
      </div>

      {/* Skills */}
      <div className="px-4 pb-3 flex flex-wrap gap-1.5">
        {app.matchedSkills.map((s) => (
          <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">{s}</span>
        ))}
        {app.missingSkills.map((s) => (
          <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs font-mono text-white/25">{s}</span>
        ))}
      </div>

      {/* Cover letter toggle */}
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center gap-2 px-4 py-2 border-t border-white/5 text-xs font-mono text-white/30 hover:text-white/60 hover:bg-white/2 transition-all"
      >
        Cover Letter
        {expanded ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
      </button>
      {expanded && (
        <div className="px-4 py-3 border-t border-white/5 bg-white/1">
          <p className="font-mono text-xs text-white/50 leading-relaxed whitespace-pre-wrap">{app.coverLetter}</p>
        </div>
      )}
    </div>
  )
}