"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Crosshair, Menu, X } from "lucide-react"

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080810]/90 backdrop-blur-xl border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="font-mono text-sm font-semibold tracking-widest text-white uppercase">
            AutoHunt
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it Works", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-xs font-mono text-white/50 hover:text-white transition-colors tracking-wider uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg font-mono text-xs font-semibold tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            Start Hunting →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen((p) => !p)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#080810]/95 backdrop-blur-xl border-t border-white/6 px-6 py-6 flex flex-col gap-4">
          {["Features", "How it Works", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              className="text-sm font-mono text-white/60 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mt-2 w-full text-center px-4 py-2.5 rounded-lg font-mono text-sm font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors"
          >
            Start Hunting →
          </Link>
        </div>
      )}
    </nav>
  )
}