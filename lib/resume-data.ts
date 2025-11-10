export interface ResumeSection {
  id: string
  title: string
  subtitle?: string
  description: string
  position: [number, number, number]
  image?: string
  items?: Array<{
    title?: string
    subtitle?: string
    description: string
    tags?: string[]
  }>
}

export const resumeData: ResumeSection[] = [
  {
    id: "intro",
    title: "王廷浩 Barry",
    subtitle: "Web3 / AI 全端工程師｜專案經理",
    description:
      "・最大優勢：「快速學習、解決問題」\n・10+ 年跨產業經驗，近兩年深耕 Web3、AI 與資料工程\n・擅長規劃「梳理資料來源 → 後端服務 → 結合 AI → 前端使用者體驗」 的整體技術版圖\n・熟悉 Solidity、Move、Python、FastAPI、Node.js、Next.js 等技術棧，能獨立完成模組化後端、質感前端與雲端部署",
    position: [-14, 10, 1],
    image: "/profile.jpg",
    items: [
      {
        description: "格言：Make meaning.",
      },
    ],
  },
  {
    id: "education",
    title: "教育背景",
    subtitle: "國立臺灣大學｜農業化學系 學士",
    description: "2008.09－2012.06｜扎實的生物、化學、資料分析與實驗設計訓練，培養跨領域思維與研究能力。",
    position: [-17, 7, 1.8],
    items: [
      {
        title: "跨域學習與轉職基礎",
        description: "從農業化學延伸至資料分析與軟體開發，為後續投入 AI、Web3 奠定邏輯思維與實驗精神。",
      },
      {
        title: "自我驅動學習",
        description: "長期自學程式設計與系統思維，結合科學背景打造多個技術及產品專案。",
      },
    ],
  },
  {
    id: "career",
    title: "專業經驗",
    subtitle: "Web3 / AI 全端工程師｜產品技術整合者",
    description:
      "擁有 10+ 年跨域背景，近兩年聚焦 Web3、AI、量化交易與自動化工具，擅長從願景、架構到落地推動產品。結合後端、前端、DevOps 與 PM 能力，帶領團隊快速驗證並交付成果。",
    position: [-12, 6, 2],
    items: [
      {
        title: "大門科技顧問有限公司｜Web3/AI 全端工程師（2024.09－至今）",
        description:
          "・規劃 AlphaGroupAgent 智能投研平台全鏈路，自動化整理研究資料。\n・打造 Flashnet 自動交易系統，串接 Gate.io API 與安全機制。\n・建置 DamenKYT 反洗錢平台並整合多鏈風險模型。\n・主導 AlphaDAO 的 AI 工具流程與交易團隊。",
        tags: ["FastAPI", "Node.js", "Next.js", "Supabase", "Web3", "AI"],
      },
      {
        title: "多維空間有限公司｜軟體工程師（2024.01－2024.04）",
        description:
          "・導入 GitHub Flow 與 CI/CD，自動化部署 .NET/Flask 專案。\n・整合政府單一登入 OAuth/OIDC。\n・在水保系統專案中強化安全機制與稽核管理。",
        tags: [".NET", "Flask", "CI/CD", "OAuth", "Security"],
      },
      {
        title: "方克一有限公司｜創辦人暨總監（2013.07－2023.02）",
        description:
          "・創辦品牌Funky Chocolate並帶領營運 9 年。\n・獲得政府研發補助逾 540 萬元。\n・熟悉產品開發、供應鏈、行銷與跨部門協作，培養產品思維與專案管理能力。",
        tags: ["Entrepreneurship", "Product Strategy", "Team Leadership"],
      },
    ],
  },
  {
    id: "projects",
    title: "精選專案",
    subtitle: "AI × Web3 × Data Driven",
    description: "整合 AI 推論、區塊鏈互動與全端架構的多項專案，展現跨領域整合與落地能力。",
    position: [-15, 2.8, 2],
    items: [
      {
        title: "Papago｜AI 自動旅遊行程規劃（2023）",
        description: "整合 OpenAI API、地圖與旅遊資料，生成多語多日行程並支援花費估算，一鍵輸出 PDF。",
        tags: ["OpenAI", "Python", "React"],
      },
      {
        title: "Web3 群眾募資平台（2023）",
        description: "使用 Solidity、Vite、React、Tailwind 構築，部署於 Fantom 測試鏈，支援 MetaMask 互動與資金管理。",
        tags: ["Solidity", "ethers.js", "Tailwind"],
      },
      {
        title: "Professor-X｜影音整理助教（2024）",
        description: "Flask + yt-dlp + OpenAI API + MongoDB 實作影音轉文字與重點摘要，部署於 AWS Lightsail，串接 OAuth 與綠界支付功能。",
        tags: ["Flask", "OpenAI", "MongoDB"],
      },
      {
        title: "PlantGuard｜影像辨識植物病害（2024）",
        description: "使用 OpenCV、TensorFlow 訓練 CNN 模型，提供 16 類病害即時判斷，資料增強後準確率突破 80%。",
        tags: ["TensorFlow", "OpenCV", "FastAPI"],
      },
    ],
  },
  {
    id: "skills",
    title: "核心技能",
    subtitle: "Web3、AI、全端、DevOps",
    description: "掌握鏈上互動、AI 推論、後端 API 與前端體驗整合，能快速從需求轉化為產品。",
    position: [-17, 3, 1.1],
    items: [
      {
        title: "Web3 與區塊鏈",
        description: "以太坊生態系Solidity、SUI生態系Move、Gate.io API、Lighter API、MetaMask 整合",
      },
      {
        title: "後端與資料服務",
        description: "FastAPI、Python、Node.js、Express、Supabase/PostgreSQL、MongoDB、SQL、異步任務",
      },
      {
        title: "UI 與 UX",
        description: "Next.js (App Router)、React、TypeScript、Tailwind CSS、Shadcn UI、React Query、Bootstrap",
      },
      {
        title: "AI 與自動化",
        description: "AI 模型 API 整合、向量資料庫、Perplexity API、NLP 摘要、結構化萃取、OpenCV/TensorFlow",
      },
      {
        title: "DevOps 與維運",
        description: "GitHub Actions、Docker、AWS EC2、Nginx、PM2、自動化佈署腳本、監控與健康檢查、CI/CD 流程",
      },
    ],
  },
  {
    id: "contact",
    title: "聯絡方式",
    subtitle: "Coding the Future",
    description:
      "期待與你一起打造結合 AI、Web3 與資料驅動的創新產品。歡迎聯繫我，聊聊如何把想法變成有深度的體驗。",
    position: [-14, 1, 1.1],
    items: [
      {
        title: "直接聯繫",
        description: "Email：wahao888@gmail.com\n所在地：台北市",
      },
      {
        title: "線上足跡",
        description: "GitHub：wahao888 / barrywangblockmen \n個人網站：tinghao-wang.github.io",
      },
    ],
  },
]
