"use client"

import type { ReactNode } from "react"
import { LanguageProvider } from "@/lib/i18n"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <Toaster />
    </LanguageProvider>
  )
}


