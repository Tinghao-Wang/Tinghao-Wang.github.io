"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { resumeData } from "@/lib/resume-data"
import { useState } from "react"

interface MobileMenuProps {
  currentSection: number
  onSectionChange: (index: number) => void
}

export function MobileMenu({ currentSection, onSectionChange }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSectionChange = (index: number) => {
    onSectionChange(index)
    setIsOpen(false)
  }

  return (
    <>
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-30 lg:hidden glass-card bg-primary/90 backdrop-blur-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      <div
        className={`fixed inset-0 z-20 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md" />
        <nav className="relative h-full flex flex-col items-center justify-center gap-4 p-8">
          {resumeData.map((section, index) => (
            <Button
              key={section.id}
              variant={currentSection === index ? "default" : "outline"}
              size="lg"
              onClick={() => handleSectionChange(index)}
              className="w-full max-w-xs"
            >
              {section.title}
            </Button>
          ))}
        </nav>
      </div>
    </>
  )
}
