import { Crosshair } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-white/6 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Crosshair className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="font-mono text-xs font-semibold tracking-widest text-white/50 uppercase">
            AutoHunt
          </span>
        </div>

        <p className="font-mono text-xs text-white/20">
          © {new Date().getFullYear()} AutoHunt. Autonomous job hunting agent.
        </p>

        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}