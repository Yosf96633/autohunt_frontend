"use client"
import { useState } from "react"
import { ChevronDown, ChevronUp, FileText } from "lucide-react"

interface CoverLetterPreviewProps {
  coverLetter: string
}

export function CoverLetterPreview({ coverLetter }: CoverLetterPreviewProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 border border-white/8 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-mono text-white/40 hover:text-white/70 hover:bg-white/3 transition-all"
      >
        <FileText className="w-3.5 h-3.5" />
        Cover Letter
        {open ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
      </button>
      {open && (
        <div className="px-3 py-3 border-t border-white/6 bg-white/2">
          <p className="text-xs font-mono text-white/60 leading-relaxed whitespace-pre-wrap">
            {coverLetter}
          </p>
        </div>
      )}
    </div>
  )
}