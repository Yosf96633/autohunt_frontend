"use client"
import { useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { BASE_URL } from "@/lib/constants"
import type { RunStatus } from "@/types/agent"
import type { ScoredJob } from "@/types/job"
import type { SetupFormData } from "@/features/setup/types"
import type { AgentStreamState, SSEEvent } from "../types"

const INITIAL_STATE: AgentStreamState = {
  completedNodes: [],
  currentNode: null,
  error: null,
  interruptedJobs: [],
  runId: null,
}

const INTERNAL_NODES = new Set(["__start__", "__end__", "RunnableLambda", "LangGraph"])

const THREADS_KEY = "autohunt_threads"

function saveThreadToStorage(threadId: string) {
  try {
    const raw = localStorage.getItem(THREADS_KEY)
    const existing = raw ? JSON.parse(raw) : []
    const alreadyExists = existing.find((t: { id: string }) => t.id === threadId)
    if (alreadyExists) return
    const updated = [{ id: threadId, createdAt: new Date().toISOString() }, ...existing]
    localStorage.setItem(THREADS_KEY, JSON.stringify(updated))
  } catch {
    // localStorage unavailable — silently skip
  }
}

export function useAgentStream() {
  const [state, setState] = useState<AgentStreamState>(INITIAL_STATE)
  const [status, setStatus] = useState<RunStatus>("idle")
  const [threadId, setThreadId] = useState<string>("")

  const reset = useCallback(() => {
    setState(INITIAL_STATE)
    setStatus("idle")
    setThreadId("")
  }, [])

  const startRun = useCallback(async (formData: SetupFormData, mock = false) => {
    const newThreadId = uuidv4()
    setThreadId(newThreadId)
    setState(INITIAL_STATE)
    setStatus("running")

    // ← Save thread to localStorage before request
    saveThreadToStorage(newThreadId)

    const fd = new FormData()
    fd.append("cv", formData.cv as File)
    fd.append("thread_id", newThreadId)
    fd.append("preferences", JSON.stringify(formData.preferences))
    fd.append("mock", mock ? "true" : "false")

    try {
      const response = await fetch(`${BASE_URL}/api/agent/run`, { method: "POST", body: fd })
      if (!response.body) throw new Error("No response body")
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value)
        const lines = text.split("\n").filter((l) => l.startsWith("data: "))

        let shouldStop = false
        for (const line of lines) {
          try {
            const event: SSEEvent = JSON.parse(line.replace("data: ", ""))
            console.log("SSE event:", event)
            if (handleEvent(event, setStatus, setState)) {
              shouldStop = true
              break
            }
          } catch (e) {
            console.error("SSE parse error:", e, "line:", line)
          }
        }
        if (shouldStop) break
      }
    } catch (err) {
      setState((s) => ({ ...s, error: String(err) }))
      setStatus("error")
    }
  }, [])

  return { state, status, setStatus, threadId, startRun, reset }
}

function handleEvent(
  event: SSEEvent,
  setStatus: (s: RunStatus) => void,
  setState: React.Dispatch<React.SetStateAction<AgentStreamState>>
): boolean {
  switch (event.type) {
    case "node_start":
      if (INTERNAL_NODES.has(event.node)) return false
      setState((s) => ({ ...s, currentNode: event.node }))
      return false

    case "node_end":
      if (INTERNAL_NODES.has(event.node)) return false
      setState((s) => ({
        ...s,
        completedNodes: [...s.completedNodes, event.node],
        currentNode: null,
      }))
      return false

    case "interrupted":
      setState((s) => ({
        ...s,
        runId: event.runId,
        interruptedJobs: event.jobs as ScoredJob[],
        currentNode: null,
      }))
      setStatus("awaiting_review")
      return true

    case "error":
      setState((s) => ({ ...s, error: event.message }))
      setStatus("error")
      return true

    case "done":
      setStatus("completed")
      return true

    default:
      return false
  }
}