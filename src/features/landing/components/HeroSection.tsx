import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { STATS } from "../data/content";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Badge */}
      <div className="relative mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
        <Zap className="w-3 h-3 text-emerald-400" />
        <span className="text-xs font-mono text-emerald-400 tracking-wider">
          Autonomous AI Job Agent
        </span>
      </div>

      {/* Headline */}
      <h1 className="relative text-center font-mono font-bold tracking-tight text-white max-w-3xl mb-6">
        <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
          Stop Applying.
        </span>
        <span className="block text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-emerald-400">
          Start Getting Hired.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="relative text-center font-mono text-sm sm:text-base text-white/40 max-w-xl mb-10 leading-relaxed">
        AutoHunt scrapes hundreds of job boards, scores every listing against
        your CV, writes cover letters, and applies — all while you sleep.
      </p>

      {/* CTAs */}
      <div className="relative flex flex-col sm:flex-row gap-3 mb-20">
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
        >
          Launch Agent <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="#how-it-works"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold text-white/70 border border-white/10 bg-white/3 hover:bg-white/6 hover:text-white transition-all"
        >
          See how it works
        </a>
      </div>

      {/* Hero image placeholder */}
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl border border-white/8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent z-10 pointer-events-none" />
        <img
          src="/hero_section.png"
          alt="AutoHunt AI agent dashboard"
          className="w-full aspect-[16/9] object-cover"
        />
      </div>

      {/* Stats bar */}
      <div className="relative w-full max-w-4xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 py-6 bg-[#080810]"
          >
            <span className="font-mono text-2xl font-bold text-emerald-400">
              {stat.value}
            </span>
            <span className="font-mono text-xs text-white/30 text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
