"use client"

import { useState, useEffect } from "react"
import { Scene } from "@/components/scene"
import { InfoCard } from "@/components/info-card"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { MobileMenu } from "@/components/mobile-menu"
import { resumeData } from "@/lib/resume-data"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)

  // Camera positions for each section
  const cameraPositions: Array<[number, number, number]> = [
    [-10, 10, 20], // Intro - front overview
    [-20, 8, 12], // Education - tree branch platform
    [-10, 7, 14], // Career - central cliff
    [-18, 6, 11], // Projects - wooden house platform
    [-17, 0, 3], // Skills - crystal platform
    [-14, 0, 3], // Contact - bottom grotto
  ]

  // Orb positions matching the platform positions
  const orbPositions: Array<[number, number, number]> = resumeData.map((section) => section.position)

  // Handle scroll-based section changes
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) {
        return
      }

      setCurrentSection((prev) => {
        const maxIndex = resumeData.length - 1
        let nextIndex = prev

        if (e.deltaY > 0) {
          nextIndex = Math.min(prev + 1, maxIndex)
        } else if (e.deltaY < 0) {
          nextIndex = Math.max(prev - 1, 0)
        }

        if (nextIndex !== prev) {
          setShowScrollIndicator(false)
        }

        return nextIndex
      })
    }

      window.addEventListener("wheel", handleScroll, { passive: false })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [currentSection])

  // Hide scroll indicator after first interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Scene currentSection={currentSection} cameraPositions={cameraPositions} orbPositions={orbPositions} />
      </div>

      {/* Navigation Sidebar - Desktop */}
      <NavigationSidebar currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Mobile Menu */}
      <MobileMenu currentSection={currentSection} onSectionChange={setCurrentSection} />

      {/* Info Card - Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-10 mr-8 max-w-md w-full hidden md:block">
        <InfoCard section={resumeData[currentSection]} isVisible={true} />
      </div>

      {/* Info Card - Mobile (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-10 p-4 md:hidden">
        <InfoCard section={resumeData[currentSection]} isVisible={true} />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator show={showScrollIndicator && currentSection === 0} />

      {/* Progress Indicator */}
      <div className="fixed bottom-8 right-8 z-20 hidden lg:flex items-center gap-2">
        {resumeData.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSection ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </main>
  )
}
