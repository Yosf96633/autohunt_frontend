import { FEATURES } from "../data/content"

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">
            What it does
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white leading-tight">
            Everything a recruiter does.
            <br />
            <span className="text-white/30">In minutes, not months.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group bg-[#080810] p-6 hover:bg-white/2 transition-colors"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-mono text-sm font-semibold text-white mb-2">{f.title}</h3>
              <p className="font-mono text-xs text-white/40 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}