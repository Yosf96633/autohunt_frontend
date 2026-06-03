"use client"
import { useState } from "react"
import { X, Plus } from "lucide-react"

interface RoleTagInputProps {
  label: string
  tags: string[]
  onAdd: (t: string) => void
  onRemove: (t: string) => void
  placeholder: string
}

export function RoleTagInput({ label, tags, onAdd, onRemove, placeholder }: RoleTagInputProps) {
  const [input, setInput] = useState("")

  const submit = () => {
    if (input.trim()) { onAdd(input.trim()); setInput("") }
  }

  return (
    <div>
      <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), submit())}
          placeholder={placeholder}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 font-mono"
        />
        <button type="button" onClick={submit}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/50 hover:text-white/80">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              {tag}
              <button type="button" onClick={() => onRemove(tag)} className="hover:text-emerald-200 transition-colors ml-0.5">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}