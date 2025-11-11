"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LANGUAGE_LABELS, type Language, useLanguage } from "@/lib/i18n"

const LANGUAGE_OPTIONS: Language[] = ["zh", "en"]

interface LanguageSwitchProps {
  className?: string
}

export function LanguageSwitch({ className }: LanguageSwitchProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <div className={cn("fixed top-4 right-4 z-30", className)}>
      <div className="flex items-center gap-1 rounded-full border border-primary/30 bg-background/70 px-1 py-1 shadow-lg backdrop-blur-md">
        {LANGUAGE_OPTIONS.map((option) => {
          const isActive = option === language
          return (
            <Button
              key={option}
              size="sm"
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "h-7 rounded-full px-3 text-xs font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
              onClick={() => setLanguage(option)}
            >
              {LANGUAGE_LABELS[option]}
            </Button>
          )
        })}
      </div>
    </div>
  )
}


