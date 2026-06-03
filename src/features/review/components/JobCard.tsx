"use client";
import { MapPin, ExternalLink } from "lucide-react";
import { ScoreBadge } from "@/components/shared/StatusBadge";
import { CoverLetterPreview } from "./CoverLetterPreview";
import { ApprovalActions } from "./ApprovalActions";
import type { ScoredJob } from "@/types/job";

interface JobCardProps {
  job: ScoredJob;
  approved: boolean;
  onToggle: () => void;
}

export function JobCard({ job, approved, onToggle }: JobCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${approved ? "border-white/10 bg-white/3" : "border-white/5 bg-white/1 opacity-50"}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <ScoreBadge score={job.score} />
            <h3 className="text-sm font-mono font-semibold text-white truncate">
              {job.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-white/40">
            <span>{job.company}</span>
            {job.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/20 hover:text-white/60 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <ApprovalActions approved={approved} onToggle={onToggle} />
        </div>
      </div>
      <p className="text-xs font-mono text-white/50 leading-relaxed mb-3">
        {job.reasoning}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-1">
        {job.matchedSkills.map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400"
          >
            {s}
          </span>
        ))}
        {job.missingSkills.map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-xs font-mono text-white/25"
          >
            {s}
          </span>
        ))}
      </div>
      <CoverLetterPreview coverLetter={job.coverLetter} />
    </div>
  );
}
