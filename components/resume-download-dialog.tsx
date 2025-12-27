"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Download } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import emailjs from "@emailjs/browser"

interface ResumeDownloadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ResumeDownloadDialog({ open, onOpenChange }: ResumeDownloadDialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { language: currentLanguage } = useLanguage()
  const [language, setLanguage] = useState<"zh" | "en">(currentLanguage === "zh" ? "zh" : "en")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  // 初始化 EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

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
      // 根據選擇的語言下載對應的 PDF 檔案
      const pdfUrl = language === "zh" 
        ? "/%E7%8E%8B%E5%BB%B7%E6%B5%A9_%E5%B1%A5%E6%AD%B7.pdf"  // URL 編碼：王廷浩_履歷.pdf
        : "/TingHaoWang_Resume.pdf"
      
      // 創建一個臨時的連結來觸發下載
      const link = document.createElement("a")
      link.href = pdfUrl
      const downloadFileName = language === "zh"
        ? `履歷_${name.replace(/\s+/g, "_")}.pdf`
        : `Resume_${name.replace(/\s+/g, "_")}.pdf`
      link.download = downloadFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // 發送郵件通知（如果配置了 EmailJS）
      try {
        const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const emailjsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

        console.log("EmailJS Config:", {
          serviceId: emailjsServiceId ? "✓" : "✗",
          templateId: emailjsTemplateId ? "✓" : "✗",
          publicKey: emailjsPublicKey ? "✓" : "✗",
        })

        if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
          const result = await emailjs.send(
            emailjsServiceId,
            emailjsTemplateId,
            {
              to_name: "Barry",
              from_name: name,
              from_email: email,
              language: language === "zh" ? "繁體中文" : "English",
              download_time: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }),
              message: `有人下載了您的履歷\n\n姓名: ${name}\n電子郵件: ${email}\n語言版本: ${language === "zh" ? "繁體中文" : "English"}\n下載時間: ${new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" })}`,
            },
            emailjsPublicKey
          )
          console.log("Email sent successfully:", result)
        } else {
          console.warn("EmailJS configuration incomplete, skipping email notification")
        }
      } catch (emailError) {
        // 郵件發送失敗不影響下載，只記錄錯誤
        console.error("Email notification error:", emailError)
      }

      // 關閉對話框並重置表單
      onOpenChange(false)
      setName("")
      setEmail("")

      toast({
        title: "下載成功",
        description: "履歷已成功下載",
      })
    } catch (error) {
      console.error("PDF download error:", error)
      toast({
        title: "下載失敗",
        description: "下載 PDF 時發生錯誤，請稍後再試",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>下載履歷</DialogTitle>
          <DialogDescription>
            請填寫以下資訊以下載 PDF 格式的履歷
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="download-language">語言版本 *</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={language === "zh" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("zh")}
                className="flex-1"
              >
                繁體中文
              </Button>
              <Button
                type="button"
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setLanguage("en")}
                className="flex-1"
              >
                English
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="download-name">姓名 *</Label>
            <Input
              id="download-name"
              type="text"
              placeholder="請輸入您的姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="download-email">電子郵件 *</Label>
            <Input
              id="download-email"
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
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? "正在下載..." : "下載 PDF 履歷"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            點擊下載按鈕後，PDF 檔案將自動下載到您的裝置
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

