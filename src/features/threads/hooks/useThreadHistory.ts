"use client"
import { useState, useEffect, useCallback } from "react"
import type { StoredThread } from "../types"

const STORAGE_KEY = "autohunt_threads"

export function useThreadHistory() {
  const [threads, setThreads] = useState<StoredThread[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setThreads(JSON.parse(raw))
    } catch {
      setThreads([])
    }
  }, [])

  const addThread = useCallback((id: string) => {
    setThreads((prev) => {
      const exists = prev.find((t) => t.id === id)
      if (exists) return prev
      const updated = [{ id, createdAt: new Date().toISOString() }, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const removeThread = useCallback((id: string) => {
    setThreads((prev) => {
      const updated = prev.filter((t) => t.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setThreads([])
  }, [])

  return { threads, addThread, removeThread, clearAll }
}