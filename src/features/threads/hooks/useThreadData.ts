"use client"
import { useState, useCallback } from "react"
import { BASE_URL } from "@/lib/constants"
import type { ThreadData, ThreadResponse } from "../types"

interface ThreadDataState {
  data: ThreadData | null
  empty: boolean
  loading: boolean
  error: string | null
}

const INITIAL: ThreadDataState = {
  data: null,
  empty: false,
  loading: false,
  error: null,
}

export function useThreadData() {
  const [state, setState] = useState<ThreadDataState>(INITIAL)

  const fetchThread = useCallback(async (threadId: string) => {
    setState({ data: null, empty: false, loading: true, error: null })

    try {
      const res = await fetch(`${BASE_URL}/api/agent/thread/${threadId}`)
      const json: ThreadResponse = await res.json()

      if (!json.success) {
        setState({ data: null, empty: false, loading: false, error: json.message ?? "Failed to fetch" })
        return
      }

      setState({
        data: json.data,
        empty: json.empty,
        loading: false,
        error: null,
      })
    } catch (err) {
      setState({ data: null, empty: false, loading: false, error: String(err) })
    }
  }, [])

  const reset = useCallback(() => setState(INITIAL), [])

  return { ...state, fetchThread, reset }
}