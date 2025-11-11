"use client"

import type { ReactNode, WheelEvent } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { ResumeSection } from "@/lib/resume-data"
import { PlayCircle } from "lucide-react"

interface InfoCardProps {
  section?: ResumeSection
  isVisible: boolean
}

export function InfoCard({ section, isVisible }: InfoCardProps) {
  if (!section) {
    return null
  }

  const highlightDescription = (text: string): ReactNode => {
    const target = "「快速學習、解決問題」"

    if (!text.includes(target)) {
      return text
    }

    const segments = text.split(target)

    return segments.reduce<ReactNode[]>((nodes, segment, index) => {
      if (index > 0) {
        nodes.push(
          <span key={`highlight-${index}`} className="text-amber-300 font-semibold">
            {target}
          </span>
        )
      }

      if (segment) {
        nodes.push(segment)
      }

      return nodes
    }, [])
  }

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const target = event.currentTarget
    const isScrollable = target.scrollHeight > target.clientHeight

    if (!isScrollable) {
      return
    }

    const { deltaY } = event
    const { scrollTop, clientHeight, scrollHeight } = target
    const atTop = scrollTop <= 0
    const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    if ((deltaY < 0 && atTop) || (deltaY > 0 && atBottom)) {
      return
    }

    event.stopPropagation()
  }

  return (
    <Card
      onWheel={handleWheel}
      className={`relative glass-card bg-card/40 border-primary/20 backdrop-blur-md transition-all duration-500 max-h-[70vh] md:max-h-[75vh] overflow-y-auto ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      {section.image && (
        <div className="absolute top-6 right-6 hidden md:block">
          <div className="w-28 h-28 rounded-full border-4 border-background shadow-lg overflow-hidden">
            <Image
              src={section.image}
              alt={`${section.title} avatar`}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      )}
      <div className={cn("p-6 space-y-4", section.image ? "md:pr-36" : "")}>
        <div>
          <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
          {section.subtitle && <p className="text-muted-foreground text-sm mt-1">{section.subtitle}</p>}
        </div>

        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
          {highlightDescription(section.description)}
        </p>

        {section.items && section.items.length > 0 && (
          <div className="space-y-4 mt-6">
            {section.items.map((item, index) => {
              const hasHeader = Boolean(item.title || item.subtitle)

              return (
                <div
                  key={index}
                  className="px-4 py-3 rounded-lg bg-secondary/30 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  {item.title && <h3 className="font-semibold text-foreground">{item.title}</h3>}
                  {item.subtitle && <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>}
                  <p
                    className={cn(
                      "text-sm text-foreground/80 leading-relaxed whitespace-pre-line",
                      hasHeader ? "mt-2" : ""
                    )}
                  >
                    {item.description}
                  </p>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {item.links && item.links.length > 0 && (
                    <div className="mt-3 rounded-md border border-primary/15 bg-background/60 p-3">
                      {item.links.map((link, linkIndex) => (
                        <div key={linkIndex} className={linkIndex > 0 ? "mt-2" : ""}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {link.label}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {item.media && item.media.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.media.map((mediaItem, mediaIndex) => {
                        if (mediaItem.type !== "video") {
                          return null
                        }

                        const buttonLabel =
                          item.media && item.media.length > 1
                            ? `觀看影片 ${mediaIndex + 1}`
                            : mediaItem.title ?? "觀看影片"

                        return (
                          <Dialog key={`${mediaItem.src}-${mediaIndex}`}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-2">
                                <PlayCircle className="h-4 w-4" />
                                {buttonLabel}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{mediaItem.title ?? item.title ?? "專案影片"}</DialogTitle>
                              </DialogHeader>
                              <div className="w-full">
                                <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                                  <video
                                    src={mediaItem.src}
                                    controls
                                    preload="metadata"
                                    className="h-full w-full"
                                  >
                                    您的瀏覽器不支援 HTML5 影片。
                                  </video>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
