"use client"
import { useState, useCallback } from "react"
import type { ScoredJob } from "@/types/job"

export function useJobReview(jobs: ScoredJob[]) {
  const [approvedIds, setApprovedIds] = useState<Set<string>>(
    () => new Set(jobs.map((j) => j.id))
  )

  const toggle = useCallback((id: string) => {
    setApprovedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const approveAll = useCallback(() => setApprovedIds(new Set(jobs.map((j) => j.id))), [jobs])
  const skipAll = useCallback(() => setApprovedIds(new Set()), [])
  const isApproved = (id: string) => approvedIds.has(id)

  return { approvedIds, toggle, approveAll, skipAll, isApproved }
}