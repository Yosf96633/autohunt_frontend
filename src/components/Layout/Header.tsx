import React from "react"
import Link from "next/link"
import { Crosshair, History } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-white/8 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center gap-3">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-emerald-500/20 border border-emerald-500/30">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <span className="font-mono text-sm font-semibold tracking-widest text-white/90 uppercase">
          AutoHunt
        </span>
        <span className="ml-auto flex items-center gap-4">
          <Link
            href="/threads"
            className="flex items-center gap-1.5 font-mono text-xs text-white/30 hover:text-white/70 transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            History
          </Link>
          <span className="font-mono text-xs text-white/20 tracking-wider">AI Job Agent</span>
        </span>
      </div>
    </header>
  )
}