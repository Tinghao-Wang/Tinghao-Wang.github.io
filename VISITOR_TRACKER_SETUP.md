# 訪問追蹤功能設置指南

## 功能說明

當有人訪問您的網站時，系統會自動：
1. 檢測訪問者資訊（IP、城市、國家等）
2. 過濾掉機器人和爬蟲
3. 發送郵件通知到您的信箱

## 機器人過濾機制

系統會自動過濾以下類型的訪問者：
- 搜尋引擎爬蟲（Googlebot、Bingbot 等）
- 社交媒體爬蟲（Facebook、Twitter、LinkedIn 等）
- 監控工具（Pingdom、Uptime 等）
- 開發工具（curl、wget、Postman 等）
- 其他常見的機器人 User-Agent

## 防重複機制

- 使用 `sessionStorage` 記錄追蹤時間
- 同一個會話中 5 分鐘內不會重複發送通知
- 延遲 3 秒後才追蹤，確保是真實用戶（機器人通常不會停留）

## EmailJS Template 設置（可選）

如果您想為訪問通知創建專門的 Email Template：

1. 前往 EmailJS Dashboard > Email Templates
2. 點擊 **Create New Template**
3. 使用以下範本：

**Subject（主旨）：**
```
網站訪問通知 - {{visitor_country}}
```

**Content（內容）：**
```
您好 {{to_name}}，

有人訪問了您的網站：

訪問時間：{{visitor_time}}
IP 地址：{{visitor_ip}}
城市：{{visitor_city}}
國家：{{visitor_country}}

---
此郵件由 tinghao-wang.github.io 自動發送
```

4. 記下 **Template ID**
5. 在 `.env.local` 中添加：
   ```env
   NEXT_PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID=your_visitor_template_id
   ```

**注意**：如果不設置 `NEXT_PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID`，系統會使用履歷下載的 Template。

## 環境變數設置

### 本地開發

在 `.env.local` 中添加（可選）：
```env
NEXT_PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID=your_visitor_template_id
```

### GitHub Pages

在 GitHub Repository Settings > Secrets 中添加（可選）：
- Name: `EMAILJS_VISITOR_TEMPLATE_ID`
- Value: `your_visitor_template_id`

然後更新 `.github/workflows/deploy.yml`，在 build 步驟中添加：
```yaml
NEXT_PUBLIC_EMAILJS_VISITOR_TEMPLATE_ID: ${{ secrets.EMAILJS_VISITOR_TEMPLATE_ID }}
```

## 測試

1. 訪問網站：`http://localhost:3001`
2. 等待 3 秒
3. 檢查您的郵件收件箱
4. 應該會收到訪問通知郵件

## 疑難排解

- **沒有收到郵件**：
  - 檢查瀏覽器控制台（F12）是否有錯誤
  - 確認 EmailJS 配置正確
  - 檢查是否被識別為機器人（查看 Console 日誌）

- **收到太多郵件**：
  - 調整 `sessionStorage` 的時間間隔（目前是 5 分鐘）
  - 修改 `visitor-tracker.tsx` 中的延遲時間（目前是 3 秒）

- **IP 資訊不準確**：
  - 免費的 IP 地理位置 API 可能不夠精確
  - 可以考慮使用付費的 API 服務

