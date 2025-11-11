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
    media?: Array<{
      type: "video"
      src: string
      title?: string
    }>
    links?: Array<{
      label: string
      url: string
    }>
  }>
}

export const resumeData: ResumeSection[] = [
  {
    id: "intro",
    title: "王廷浩 Barry",
    subtitle: "Web3 / AI 全端工程師｜專案經理",
    description:
      "・最大優勢：「快速學習、解決問題」\n・10+ 年跨產業經驗，近兩年深耕 Web3、AI 與資料工程\n・擅長規劃並實現MVP（Minimum Viable Product）「梳理資料來源 → 後端服務 → 結合 AI → 前端使用者體驗」 的整體技術版圖\n・熟悉 Solidity、Move、Python、FastAPI、Node.js、Next.js、AWS、GCP、Docker 等技術棧，能獨立完成模組化後端、資料庫串接、良好使用者體驗前端與雲端部署",
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
          "・規劃與建立 AlphaGroupAgent AI自動化整理研究資料。\n・主導 AlphaDAO 量化交易團隊。\n・打造 Flashnet 高效網格自動交易系統，串接 Gate.io API 與安全風控機制。\n・建置 DamenKYT 反洗錢平，錢包風險查詢、金流追蹤、自動整合報告協助報案。",
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
    subtitle: "AI × Web3 × Blockchain",
    description: "整合 AI 推論、區塊鏈互動與全端架構的多項專案，展現跨領域整合與落地能力。",
    position: [-15, 2.8, 2],
    items: [
      {
        title: "AlphaGroupAgent｜AI 自動化研究助手（2025）",
        description:
          "規劃與建立 AlphaGroupAgent，串聯多來源研究資料並以向量檢索與提示工程，結合 AI 自動整理研究資料、自動更新即時資訊，協助投研團隊快速掌握重點與最新動態。",
        tags: ["FastAPI", "Next.js", "Supabase", "AI", "量化策略研究"],
        links: [
          {
            label: "產品頁面",
            url: "https://agent.damentec.com/",
          },
        ],
      },
      {
        title: "Flashnet｜網格自動交易系統（2025）",
        description:
          "打造 Flashnet 網格自動交易系統，整合 Gate.io API 提供自動化網格交易功能，加入安全風控機制，達成自動化策略執行與高效率資金配置。資金利用率比交易所提供的網格交易高出十倍。",
        tags: ["Node.js", "Trading", "Web3", "Blockchain", "Security"],
        links: [
          {
            label: "專案使用教學頁面",
            url: "https://agent.damentec.com/flashnet/tutorial",
          },
        ],
        media: [
          {
            type: "video",
            src: "/videos/flashnet-demo.mp4",
            title: "Flashnet 系統功能 Demo",
          },
        ],
      },
      {
        title: "DamenKYT｜Web3反詐騙平台（2024）",
        description:
          "建置 DamenKYT 反詐騙平台，如同Web3版本的「Whoscall」，整合案件申報、錢包風險評估、金流追蹤等，實現群眾報案、追蹤被竊資金與加速報案流程。",
        tags: ["FastAPI", "Web3", "Risk Management"],
        links: [
          {
            label: "產品頁面",
            url: "https://kyt.damentec.com/",
          },
        ],
        media: [
          {
            type: "video",
            src: "/videos/damenkyt-system-demo.mov",
            title: "DamenKYT 系統功能 Demo",
          },
        ],
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
        description: "Email：wahao888@gmail.com\n所在地：台灣 台北市",
      },
      {
        title: "線上足跡",
        description: "GitHub：wahao888 / barrywangblockmen \n個人網站：tinghao-wang.github.io",
      },
    ],
  },
]
