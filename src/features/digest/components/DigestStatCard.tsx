interface DigestStatCardProps {
  label: string
  value: number | string
  highlight?: boolean
}

export function DigestStatCard({ label, value, highlight }: DigestStatCardProps) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-emerald-500/20 bg-emerald-500/5" : "border-white/8 bg-white/3"}`}>
      <div className={`text-2xl font-mono font-bold mb-1 ${highlight ? "text-emerald-400" : "text-white"}`}>
        {value}
      </div>
      <div className="text-xs font-mono text-white/40 uppercase tracking-wider">{label}</div>
    </div>
  )
}