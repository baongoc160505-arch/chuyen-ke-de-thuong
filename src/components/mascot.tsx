import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function GhostMascot({ mood = "shy", className }: { mood?: "shy" | "search" | "happy"; className?: string }) {
  return (
    <div className={cn("ghost-mascot", className)} aria-hidden="true">
      <div className="ghost-body">
        <span className="ghost-eye ghost-eye-left" />
        <span className="ghost-eye ghost-eye-right" />
        <span className={cn("ghost-mouth", mood === "happy" && "ghost-mouth-happy")} />
        <span className="ghost-cheek ghost-cheek-left" />
        <span className="ghost-cheek ghost-cheek-right" />
      </div>
      {mood === "search" && <Search className="ghost-prop" strokeWidth={2.4} />}
    </div>
  );
}
