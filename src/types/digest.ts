export interface DigestSummary {
  runId: string
  totalScraped: number
  totalFiltered: number
  totalApplied: number
  totalSkipped: number
  appliedJobs: {
    title: string
    company: string
    score: number
    status: string
    appliedAt: string
  }[]
  topMatch: {
    title: string
    company: string
    score: number
  } | null
  completedAt: string
}