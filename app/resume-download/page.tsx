"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ResumeDownloadPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "請填寫完整資訊",
        description: "請填寫姓名和電子郵件地址",
        variant: "destructive",
      })
      return
    }

    // 驗證 email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "電子郵件格式錯誤",
        description: "請輸入有效的電子郵件地址",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // 動態載入 html2pdf.js
      const html2pdfModule = await import("html2pdf.js")
      const html2pdf = (html2pdfModule as any).default || html2pdfModule

      // 創建一個完全獨立的 iframe，使用 data URL 來避免繼承父頁面樣式
      const iframe = document.createElement("iframe")
      iframe.style.position = "fixed"
      iframe.style.right = "0"
      iframe.style.bottom = "0"
      iframe.style.width = "210mm" // A4 width
      iframe.style.height = "297mm" // A4 height
      iframe.style.border = "none"
      iframe.style.opacity = "0"
      iframe.style.pointerEvents = "none"
      document.body.appendChild(iframe)

      // 獲取履歷 HTML 內容
      const response = await fetch("/resume_en.html")
      let htmlContent = await response.text()

      // 確保 HTML 是完整的文檔，包含完整的 head 和 body
      if (!htmlContent.includes("<!DOCTYPE")) {
        htmlContent = `<!DOCTYPE html>${htmlContent}`
      }

      // 使用 srcdoc 來載入 HTML，這樣可以避免繼承父頁面的樣式
      iframe.srcdoc = htmlContent

      // 等待 iframe 載入完成
      await new Promise<void>((resolve) => {
        iframe.onload = () => resolve()
        // 如果已經載入，直接 resolve
        if (iframe.contentDocument?.readyState === "complete") {
          resolve()
        }
      })

      // 額外等待內容渲染
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 獲取 iframe 中的內容
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) {
        throw new Error("無法訪問 iframe 內容")
      }

      const element = iframeDoc.body

      // 配置 PDF 選項
      const opt = {
        margin: 0,
        filename: `Resume_${name.replace(/\s+/g, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          logging: false,
          windowWidth: element.scrollWidth || 794,
          windowHeight: element.scrollHeight || 1123,
          allowTaint: false,
          onclone: (clonedDoc: Document) => {
            // 移除所有可能包含 oklch 的樣式表
            const links = clonedDoc.querySelectorAll('link[rel="stylesheet"]')
            links.forEach((link) => {
              const href = link.getAttribute('href')
              if (href && (href.includes('globals.css') || href.includes('_next'))) {
                link.remove()
              }
            })
            
            // 移除所有 style 標籤中可能包含 oklch 的內容
            const styles = clonedDoc.querySelectorAll('style')
            styles.forEach((style) => {
              const content = style.textContent || ''
              if (content.includes('oklch')) {
                // 移除包含 oklch 的樣式規則
                style.textContent = content.replace(/[^{}]*oklch[^{}]*\{[^}]*\}/g, '')
              }
            })
            
            // 轉換所有內聯樣式中的 oklch
            const allElements = clonedDoc.querySelectorAll('*')
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement
              if (htmlEl.style.cssText && htmlEl.style.cssText.includes('oklch')) {
                // 移除包含 oklch 的樣式屬性
                const style = htmlEl.style.cssText
                htmlEl.style.cssText = style.replace(/[^;]*oklch[^;]*;?/g, '')
              }
            })
          }
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      }

      // 生成並下載 PDF
      await html2pdf().set(opt).from(element).save()

      // 清理 iframe
      document.body.removeChild(iframe)

      toast({
        title: "下載成功",
        description: "履歷已成功下載",
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "下載失敗",
        description: "生成 PDF 時發生錯誤，請稍後再試",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>下載英文履歷</CardTitle>
          <CardDescription>
            請填寫以下資訊以下載 PDF 格式的履歷
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名 *</Label>
            <Input
              id="name"
              type="text"
              placeholder="請輸入您的姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">電子郵件 *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? "正在生成 PDF..." : "下載 PDF 履歷"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            點擊下載按鈕後，PDF 檔案將自動下載到您的裝置
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

