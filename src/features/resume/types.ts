import type { DigestSummary } from "@/types/digest"

export type ResumeSSEEvent =
  | { type: "node_start"; node: string }
  | { type: "node_end"; node: string }
  | { type: "completed"; summary: DigestSummary }
  | { type: "done" }
  | { type: "error"; message: string }