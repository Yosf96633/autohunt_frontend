"use client"
import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { RotateCcw, CheckCircle } from "lucide-react"
import { Header } from "@/components/Layout/Header"
import { PageWrapper } from "@/components/Layout/PageWrapper"
import { SetupForm } from "@/features/setup/components/SetupForm"
import { AgentRunner } from "@/features/agent/components/AgentRunner"
import { JobReviewPanel } from "@/features/review/components/JobReviewPanel"
import { DigestPanel } from "@/features/digest/components/DigestPanel"
import { useAgentStream } from "@/features/agent/hooks/useAgentStream"
import { useResumeAgent } from "@/features/resume/hooks/useResumeAgent"
import type { SetupFormData } from "@/features/setup/types"
import type { DigestSummary } from "@/types/digest"

export default function DashboardPage() {
  const { state, status, setStatus, threadId, startRun, reset } = useAgentStream()
  const { resume } = useResumeAgent()
  const [digest, setDigest] = useState<DigestSummary | null>(null)

  const handleStart = useCallback(
    (formData: SetupFormData) => startRun(formData),
    [startRun]
  )

  const handleApprove = useCallback(
    (approvedIds: string[]) => {
      resume({
        threadId,
        approvedIds,
        onNodeStart: () => {},
        onNodeEnd: () => {},
        onCompleted: (summary) => {
          setDigest(summary)
          setStatus("completed")
        },
        onError: (msg) => {
          console.error("Resume error:", msg)
          setStatus("error")
        },
        setStatus,
      })
    },
    [threadId, resume, setStatus]
  )

  const handleReset = useCallback(() => {
    reset()
    setDigest(null)
  }, [reset])

  return (
    <div className="min-h-screen flex flex-col bg-[#080810]">
      <Header />
      <PageWrapper>
        <AnimatePresence mode="wait">

          {status === "idle" && (
            <SetupForm key="setup" onSubmit={handleStart} />
          )}

          {(status === "running" || status === "resuming") && (
            <AgentRunner
              key="running"
              completedNodes={state.completedNodes}
              currentNode={state.currentNode}
              error={state.error}
            />
          )}

          {status === "awaiting_review" && (
            <JobReviewPanel
              key="review"
              jobs={state.interruptedJobs}
              onSubmit={handleApprove}
            />
          )}

          {status === "completed" && digest && (
            <DigestPanel key="digest" summary={digest} onReset={handleReset} />
          )}

          {status === "completed" && !digest && (
            <motion.div
              key="completed-no-digest"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-col items-center gap-6 py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-mono font-semibold text-white tracking-tight mb-2">
                    Hunt Complete
                  </h1>
                  <p className="text-sm font-mono text-white/40">
                    The agent finished. No digest was returned.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold tracking-wide transition-all border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                  Run Again
                </button>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <AgentRunner
              key="error"
              completedNodes={state.completedNodes}
              currentNode={null}
              error={state.error}
            />
          )}

        </AnimatePresence>
      </PageWrapper>
    </div>
  )
}