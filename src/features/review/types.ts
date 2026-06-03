import type { ScoredJob } from "@/types/job"

export interface ReviewState {
  approvedIds: Set<string>
}

export type { ScoredJob }