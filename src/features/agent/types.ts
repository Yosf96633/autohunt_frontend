import type { ScoredJob } from "@/types/job"

export interface AgentStreamState {
  completedNodes: string[]
  currentNode: string | null
  error: string | null
  interruptedJobs: ScoredJob[]
  runId: string | null
}

export type SSEEvent =
  | { type: "node_start"; node: string }
  | { type: "node_end"; node: string }
  | { type: "error"; message: string }
  | { type: "interrupted"; node: string; runId: string; status: "awaiting_review"; jobs: ScoredJob[] }
  | { type: "done" }