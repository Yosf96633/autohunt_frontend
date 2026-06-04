import { HOW_IT_WORKS } from "../data/content";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-lg">
          <p className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-3">
            The process
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white leading-tight">
            Four steps.
            <br />
            <span className="text-white/30">Zero effort from you.</span>
          </h2>
        </div>

        <div className="space-y-24">
          {HOW_IT_WORKS.map((step, i) => (
            <div
              key={step.step}
              className={`flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Text side */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-4xl font-bold text-emerald-500/20">
                    {step.step}
                  </span>
                  <div className="h-px flex-1 bg-emerald-500/10" />
                </div>
                <h3 className="font-mono text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="font-mono text-sm text-white/40 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>

              {/* Image side */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl border border-white/8 overflow-hidden">
                  <img
                    src={step.imageSrc}
                    alt={step.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
