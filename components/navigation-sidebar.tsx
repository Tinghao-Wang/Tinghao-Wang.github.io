"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { resumeData } from "@/lib/resume-data"

interface NavigationSidebarProps {
  currentSection: number
  onSectionChange: (index: number) => void
}

export function NavigationSidebar({ currentSection, onSectionChange }: NavigationSidebarProps) {
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event

    if (Math.abs(deltaY) < 20) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (deltaY > 0 && currentSection < resumeData.length - 1) {
      onSectionChange(currentSection + 1)
    } else if (deltaY < 0 && currentSection > 0) {
      onSectionChange(currentSection - 1)
    }
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-20 ml-4 hidden lg:block" onWheel={handleWheel}>
      <nav className="inline-flex flex-col glass-card bg-card/30 backdrop-blur-md border border-primary/20 rounded-lg p-1.5 space-y-1">
        {resumeData.map((section, index) => (
          <Button
            key={section.id}
            variant={currentSection === index ? "default" : "ghost"}
            size="sm"
            onClick={() => onSectionChange(index)}
            className={`justify-start text-left transition-all h-7 px-2 ${
              currentSection === index
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentSection === index ? "bg-primary-foreground scale-125" : "bg-muted-foreground/50"
                }`}
              />
              <span className="text-xs font-medium">{section.title}</span>
            </div>
          </Button>
        ))}
      </nav>
    </div>
  )
}
