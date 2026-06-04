"use client"
import { useEffect } from "react"
import { LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { EmptyState } from "@/components/shared/EmptyState"
import { ThreadStatsBar } from "./ThreadStatsBar"
import { ThreadApplicationCard } from "./ThreadApplicationCard"
import { useThreadData } from "../hooks/useThreadData"

interface ThreadDetailProps {
  threadId: string | null
}

export function ThreadDetail({ threadId }: ThreadDetailProps) {
  const { data, empty, loading, error, fetchThread } = useThreadData()

  useEffect(() => {
    if (threadId) fetchThread(threadId)
  }, [threadId, fetchThread])

  if (!threadId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState message="Select a thread to view details" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center gap-3">
        <LoadingSpinner className="w-5 h-5" />
        <p className="font-mono text-sm text-white/40">Loading thread...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="font-mono text-sm text-red-400">{error}</p>
      </div>
    )
  }

  if (empty || !data) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <EmptyState message="No data found for this thread yet" />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Thread ID header */}
      <div className="mb-6">
        <p className="font-mono text-xs text-white/30 uppercase tracking-wider mb-1">Thread</p>
        <p className="font-mono text-sm text-white/70 break-all">{data.thread_id}</p>
      </div>

      {/* Stats */}
      {data.stats && <ThreadStatsBar stats={data.stats} />}

      {/* Applications */}
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs text-white/40 uppercase tracking-wider">
          Applications
        </p>
        <span className="font-mono text-xs text-emerald-400">
          {data.applications.length} total
        </span>
      </div>

      {data.applications.length === 0 ? (
        <EmptyState message="No applications recorded for this thread" />
      ) : (
        <div className="space-y-3">
          {data.applications.map((app) => (
            <ThreadApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  )
}