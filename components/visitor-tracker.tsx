"use client"

import { useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"

interface VisitorInfo {
  ip: string
  city: string
  region: string
  country: string
  countryCode: string
  timezone: string
  userAgent: string
  language: string
  referrer: string
  timestamp: string
}

// 機器人 User-Agent 關鍵字列表
const BOT_KEYWORDS = [
  "bot",
  "crawler",
  "spider",
  "scraper",
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "slackbot",
  "vkShare",
  "W3C_Validator",
  "whatsapp",
  "flipboard",
  "tumblr",
  "bitlybot",
  "skypeuripreview",
  "nuzzel",
  "discordbot",
  "qwantify",
  "pinterestbot",
  "bitrix link preview",
  "xing-contenttabreceiver",
  "chrome-lighthouse",
  "google page speed",
  "gtmetrix",
  "pingdom",
  "uptime",
  "monitor",
  "curl",
  "wget",
  "python",
  "java",
  "node",
  "axios",
  "postman",
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_KEYWORDS.some((keyword) => ua.includes(keyword.toLowerCase()))
}

async function getVisitorInfo(): Promise<VisitorInfo | null> {
  try {
    // 獲取 User-Agent
    const userAgent = navigator.userAgent

    // 如果是機器人，直接返回 null
    if (isBot(userAgent)) {
      return null
    }

    // 獲取 IP 和地理位置資訊（使用免費的 ipapi.co API）
    const ipResponse = await fetch("https://ipapi.co/json/")
    const ipData = await ipResponse.json()

    // 如果 API 返回錯誤，嘗試備用 API
    if (ipData.error) {
      const backupResponse = await fetch("https://ip-api.com/json/")
      const backupData = await backupResponse.json()
      
      if (backupData.status === "success") {
        return {
          ip: backupData.query || "Unknown",
          city: backupData.city || "Unknown",
          region: backupData.regionName || "Unknown",
          country: backupData.country || "Unknown",
          countryCode: backupData.countryCode || "Unknown",
          timezone: backupData.timezone || "Unknown",
          userAgent,
          language: navigator.language || "Unknown",
          referrer: document.referrer || "Direct",
          timestamp: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }),
        }
      }
      return null
    }

    return {
      ip: ipData.ip || "Unknown",
      city: ipData.city || "Unknown",
      region: ipData.region || "Unknown",
      country: ipData.country_name || "Unknown",
      countryCode: ipData.country_code || "Unknown",
      timezone: ipData.timezone || "Unknown",
      userAgent,
      language: navigator.language || "Unknown",
      referrer: document.referrer || "Direct",
      timestamp: new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" }),
    }
  } catch (error) {
    console.error("Failed to get visitor info:", error)
    return null
  }
}

async function sendVisitorNotification(visitorInfo: VisitorInfo) {
  try {
    const emailjsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    // 優先使用專門的訪問通知 Template
    const visitorTemplateId = process.env.NEXT_PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID
    const downloadTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const emailjsTemplateId = visitorTemplateId || downloadTemplateId
    const emailjsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    // 如果沒有設置訪問通知 Template，使用履歷下載的 Template
    if (!visitorTemplateId && downloadTemplateId) {
      console.warn("VisitorTracker: Using download template as fallback. Please set NEXT_PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID")
    }

    if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
      return
    }

    // 初始化 EmailJS（如果還沒初始化）
    emailjs.init(emailjsPublicKey)

    // 構建郵件參數，確保包含所有必要的欄位
    const templateParams = {
      to_name: "Barry",
      from_name: "網站訪問者",
      from_email: "visitor@tinghao-wang.github.io",
      subject: "網站訪問通知",
      message: `有人訪問了您的網站！

訪問時間：${visitorInfo.timestamp}
IP 地址：${visitorInfo.ip}
城市：${visitorInfo.city}
地區：${visitorInfo.region}
國家：${visitorInfo.country} (${visitorInfo.countryCode})
時區：${visitorInfo.timezone}
語言：${visitorInfo.language}
來源：${visitorInfo.referrer}
User-Agent：${visitorInfo.userAgent}`,
      // 單獨的欄位，方便 Template 使用
      visitor_ip: visitorInfo.ip,
      visitor_city: visitorInfo.city,
      visitor_region: visitorInfo.region,
      visitor_country: visitorInfo.country,
      visitor_country_code: visitorInfo.countryCode,
      visitor_timezone: visitorInfo.timezone,
      visitor_time: visitorInfo.timestamp,
      visitor_language: visitorInfo.language,
      visitor_referrer: visitorInfo.referrer,
      visitor_user_agent: visitorInfo.userAgent,
      // 標記這是訪問通知，不是下載通知
      notification_type: "visitor",
      language: "網站訪問",
    }

    await emailjs.send(
      emailjsServiceId,
      emailjsTemplateId,
      templateParams,
      emailjsPublicKey
    )
  } catch (error) {
    console.error("Failed to send visitor notification:", error)
  }
}

export function VisitorTracker() {
  const hasTrackedRef = useRef(false)
  const trackingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 檢查是否已經追蹤過（使用 sessionStorage，避免同一個會話重複通知）
    const lastTracked = sessionStorage.getItem("last_visitor_track")
    const now = Date.now()

    // 如果 5 分鐘內已經追蹤過，跳過
    if (lastTracked && now - parseInt(lastTracked) < 5 * 60 * 1000) {
      return
    }

    // 延遲 3 秒後再追蹤，確保是真實用戶（機器人通常不會停留）
    trackingTimeoutRef.current = setTimeout(async () => {
      if (hasTrackedRef.current) {
        return
      }
      hasTrackedRef.current = true

      const visitorInfo = await getVisitorInfo()
      
      if (visitorInfo) {
        // 記錄追蹤時間
        sessionStorage.setItem("last_visitor_track", now.toString())
        
        // 發送通知
        await sendVisitorNotification(visitorInfo)
      }
    }, 3000)

    return () => {
      if (trackingTimeoutRef.current) {
        clearTimeout(trackingTimeoutRef.current)
      }
    }
  }, [])

  // 這個組件不渲染任何內容
  return null
}

