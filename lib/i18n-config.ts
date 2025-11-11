export type Language = "zh" | "en"

export const DEFAULT_LANGUAGE: Language = "zh"

export const LANGUAGE_LABELS: Record<Language, string> = {
  zh: "中文",
  en: "English",
}

export const uiCopy: Record<
  Language,
  {
    scrollToExplore: string
    highlightPhrase: string
    mottoPrefix: string
    watchVideo: string
    watchVideoWithIndex: (index: number) => string
    defaultVideoTitle: string
    videoFallback: string
  }
> = {
  zh: {
    scrollToExplore: "向下滾動探索",
    highlightPhrase: "「快速學習、解決問題」",
    mottoPrefix: "格言",
    watchVideo: "觀看影片",
    watchVideoWithIndex: (index: number) => `觀看影片 ${index}`,
    defaultVideoTitle: "專案影片",
    videoFallback: "您的瀏覽器不支援 HTML5 影片。",
  },
  en: {
    scrollToExplore: "Scroll to explore",
    highlightPhrase: "“Fast learning and problem solving”",
    mottoPrefix: "Motto",
    watchVideo: "Watch video",
    watchVideoWithIndex: (index: number) => `Watch video ${index}`,
    defaultVideoTitle: "Project video",
    videoFallback: "Your browser does not support HTML5 video.",
  },
}


