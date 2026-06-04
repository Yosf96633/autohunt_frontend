import Link from "next/link"
import { ArrowRight, Crosshair } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] bg-emerald-500/8 rounded-full blur-[80px]" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 mb-8">
          <Crosshair className="w-7 h-7 text-emerald-400" />
        </div>

        <h2 className="font-mono text-3xl sm:text-5xl font-bold text-white leading-tight mb-6">
          Your next job is
          <br />
          <span className="text-emerald-400">already being applied to.</span>
        </h2>

        <p className="font-mono text-sm text-white/40 leading-relaxed mb-10 max-w-md mx-auto">
          Upload your CV. Set your preferences. Let AutoHunt do the rest.
          Setup takes under 5 minutes.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-mono text-sm font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
        >
          Start Your Hunt <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}