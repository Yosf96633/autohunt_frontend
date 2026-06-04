"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Crosshair, Trash2 } from "lucide-react"
import { ThreadListItem } from "@/features/threads/components/ThreadListItem"
import { ThreadDetail } from "@/features/threads/components/ThreadDetail"
import { useThreadHistory } from "@/features/threads/hooks/useThreadHistory"
import { EmptyState } from "@/components/shared/EmptyState"

export default function ThreadsPage() {
  const { threads, removeThread, clearAll } = useThreadHistory()
  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    threads[0]?.id ?? null
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#080810]">
      {/* Header */}
      <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="h-14 px-6 flex items-center gap-4">
          <Link href="/dashboard" className="text-white/30 hover:text-white/70 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Crosshair className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-widest text-white/90 uppercase">
              AutoHunt
            </span>
          </div>
          <span className="font-mono text-xs text-white/30 tracking-wider">/ Hunt History</span>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div className="w-72 min-w-72 border-r border-white/8 flex flex-col bg-[#09090f]">
          {/* Sidebar header */}
          <div className="px-4 py-3 border-b border-white/6 flex items-center justify-between">
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider">
              {threads.length} Thread{threads.length !== 1 ? "s" : ""}
            </span>
            {threads.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="font-mono text-[10px] text-white/20 hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Thread list */}
          <div className="flex-1 overflow-y-auto">
            {threads.length === 0 ? (
              <EmptyState message="No threads saved yet" />
            ) : (
              threads.map((thread) => (
                <ThreadListItem
                  key={thread.id}
                  thread={thread}
                  active={activeThreadId === thread.id}
                  onSelect={() => setActiveThreadId(thread.id)}
                  onRemove={() => {
                    removeThread(thread.id)
                    if (activeThreadId === thread.id) {
                      const remaining = threads.filter((t) => t.id !== thread.id)
                      setActiveThreadId(remaining[0]?.id ?? null)
                    }
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 flex overflow-hidden">
          <ThreadDetail threadId={activeThreadId} />
        </div>
      </div>
    </div>
  )
}