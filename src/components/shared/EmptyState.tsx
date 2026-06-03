import { Inbox } from "lucide-react"

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-white/30">
      <Inbox className="w-8 h-8" />
      <p className="text-sm font-mono">{message}</p>
    </div>
  )
}