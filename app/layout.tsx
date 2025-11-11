import type React from "react"
import type { Metadata } from "next"
import { Inter, Source_Code_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Source_Code_Pro({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "TingHao Wang",
  description: "An immersive 3D portfolio experience showcasing skills and projects",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.png",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
