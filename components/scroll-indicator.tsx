import { ChevronDown } from "lucide-react"

export function ScrollIndicator({ show }: { show: boolean }) {
  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-2 glass-card bg-card/30 backdrop-blur-md border border-primary/20 rounded-full px-4 py-3">
        <span className="text-xs text-muted-foreground font-medium">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
      </div>
    </div>
  )
}
