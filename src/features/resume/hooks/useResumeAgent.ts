"use client"
import { useCallback } from "react"
import { BASE_URL } from "@/lib/constants"
import type { RunStatus } from "@/types/agent"
import type { DigestSummary } from "@/types/digest"
import type { ResumeSSEEvent } from "../types"

interface ResumeAgentOptions {
  threadId: string
  approvedIds: string[]
  onNodeStart: (node: string) => void
  onNodeEnd: (node: string) => void
  onCompleted: (summary: DigestSummary) => void
  onError: (message: string) => void
  setStatus: (s: RunStatus) => void
}

export function useResumeAgent() {
  const resume = useCallback(async (opts: ResumeAgentOptions) => {
    const { threadId, approvedIds, onNodeStart, onNodeEnd, onCompleted, onError, setStatus } = opts
    setStatus("resuming")

    try {
      const response = await fetch(`${BASE_URL}/api/agent/resume/${threadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved_ids: approvedIds }),
      })

      if (!response.body) throw new Error("No response body")
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        const lines = text.split("\n").filter((l) => l.startsWith("data: "))
        for (const line of lines) {
          try {
            const event: ResumeSSEEvent = JSON.parse(line.replace("data: ", ""))
            if (event.type === "node_start") onNodeStart(event.node)
            else if (event.type === "node_end") onNodeEnd(event.node)
            else if (event.type === "completed") { onCompleted(event.summary); setStatus("completed") }
            else if (event.type === "error") { onError(event.message); setStatus("error") }
          } catch { }
        }
      }
    } catch (err) {
      onError(String(err))
      setStatus("error")
    }
  }, [])

  return { resume }
}