import { TESTIMONIALS } from "../data/content";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">
            Real results
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white leading-tight">
            Hunters who let
            <br />
            <span className="text-white/30">the agent do the work.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="group rounded-2xl border border-white/8 bg-white/2 p-6 hover:border-emerald-500/20 hover:bg-emerald-500/3 transition-all"
            >
              {/* Quote */}
              <p className="font-mono text-sm text-white/70 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden flex-shrink-0">
                  <img
                    src={t.avatarSrc}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-white">
                    {t.name}
                  </p>
                  <p className="font-mono text-xs text-white/30">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
