"use client"
import { Trash2, ChevronRight, Clock } from "lucide-react"
import type { StoredThread } from "../types"

interface ThreadListItemProps {
  thread: StoredThread
  active: boolean
  onSelect: () => void
  onRemove: () => void
}

export function ThreadListItem({ thread, active, onSelect, onRemove }: ThreadListItemProps) {
  const date = new Date(thread.createdAt)
  const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 cursor-pointer border-l-2 transition-all ${
        active
          ? "border-l-emerald-400 bg-emerald-500/5"
          : "border-l-transparent hover:border-l-white/10 hover:bg-white/2"
      }`}
      onClick={onSelect}
    >
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-white/80 truncate">{thread.id}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Clock className="w-2.5 h-2.5 text-white/25" />
          <p className="font-mono text-[10px] text-white/30">
            {formatted} · {time}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded text-white/20 hover:text-red-400 transition-all"
        >
          <Trash2 className="w-3 h-3" />
        </button>
        <ChevronRight className={`w-3.5 h-3.5 transition-colors ${active ? "text-emerald-400" : "text-white/15"}`} />
      </div>
    </div>
  )
}