export type RunStatus =
  | "idle"
  | "running"
  | "awaiting_review"
  | "resuming"
  | "completed"
  | "error"

export type NodeName =
  | "cvParser"
  | "scraper"
  | "scorer"
  | "filter"
  | "coverLetter"
  | "humanCheck"
  | "applicator"
  | "tracker"
  | "digestSummary"

export interface NodeState {
  name: string
  status: "pending" | "running" | "done"
}