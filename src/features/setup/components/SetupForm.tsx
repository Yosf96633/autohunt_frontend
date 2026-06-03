"use client"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"
import { CVUploader } from "./CVUploader"
import { PreferencesForm } from "./PreferencesForm"
import { useSetupForm } from "../hooks/useSetupForm"
import type { SetupFormData } from "../types"

interface SetupFormProps {
  onSubmit: (data: SetupFormData) => void
}

export function SetupForm({ onSubmit }: SetupFormProps) {
  const { cv, setCv, preferences, updatePrefs, addRole, removeRole, addLocation, removeLocation, isValid, getFormData } = useSetupForm()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid) onSubmit(getFormData())
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
      <div className="mb-8">
        <h1 className="text-2xl font-mono font-semibold text-white tracking-tight mb-1">Configure Hunt</h1>
        <p className="text-sm font-mono text-white/40">Upload your CV and set preferences. The agent handles the rest.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-xl border border-white/8 bg-white/3 p-6 space-y-6">
          <CVUploader file={cv} onFile={setCv} />
          <div className="h-px bg-white/6" />
          <PreferencesForm preferences={preferences} addRole={addRole} removeRole={removeRole} addLocation={addLocation} removeLocation={removeLocation} updatePrefs={updatePrefs} />
        </div>
        <button type="submit" disabled={!isValid}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm font-semibold tracking-wide transition-all bg-emerald-500 text-black hover:bg-emerald-400 active:bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed">
          <Zap className="w-4 h-4" />
          Start Hunt
        </button>
      </form>
    </motion.div>
  )
}