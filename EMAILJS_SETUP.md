# EmailJS 設置指南

## 步驟 1：註冊 EmailJS 帳號

1. 前往 [https://www.emailjs.com/](https://www.emailjs.com/)
2. 註冊一個免費帳號（免費方案每月可發送 200 封郵件）

## 步驟 2：設置 Email Service

1. 登入 EmailJS Dashboard
2. 前往 **Email Services** 頁面
3. 點擊 **Add New Service**
4. 選擇您的郵件服務提供商（Gmail、Outlook 等）
5. 按照指示連接您的郵件帳號
6. 記下 **Service ID**

## 步驟 3：創建 Email Template

### Template 1：履歷下載通知

1. 前往 **Email Templates** 頁面
2. 點擊 **Create New Template**
3. 使用以下範本：

**Subject（主旨）：**
```
履歷下載通知 - {{from_name}}
```

**Content（內容）：**
```
您好 {{to_name}}，

有人下載了您的履歷：

姓名：{{from_name}}
電子郵件：{{from_email}}
語言版本：{{language}}
下載時間：{{download_time}}

---
此郵件由 tinghao-wang.github.io 自動發送
```

4. 點擊 **Save** 並記下 **Template ID**（例如：`template_efi3b6g`）

### Template 2：網站訪問通知（可選，但推薦）

1. 再次點擊 **Create New Template**
2. 使用以下範本：

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
時區：{{timezone}}
語言：{{language}}
來源：{{referrer}}

---
此郵件由 tinghao-wang.github.io 自動發送
```

3. 點擊 **Save** 並記下 **Template ID**

**注意**：如果不創建訪問通知 Template，系統會使用履歷下載的 Template。

## 步驟 4：獲取 Public Key

1. 前往 **Account** > **General** > **API Keys**
2. 複製 **Public Key**

## 步驟 5：設置環境變數

### 本地開發

1. 複製 `.env.local.example` 為 `.env.local`
2. 填入您的 EmailJS 資訊：

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### GitHub Pages 部署

由於這是靜態網站，您需要在 GitHub Actions 或直接在代碼中設置環境變數。

**選項 1：使用 GitHub Actions（推薦）**

在 `.github/workflows/deploy.yml` 中添加：

```yaml
env:
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
```

然後在 GitHub Repository Settings > Secrets 中添加這些 secrets。

**選項 2：直接在代碼中設置（不推薦，但簡單）**

修改 `components/resume-download-dialog.tsx`，將環境變數替換為實際值：

```typescript
const emailjsServiceId = "your_service_id"
const emailjsTemplateId = "your_template_id"
const emailjsPublicKey = "your_public_key"
```

⚠️ **注意**：Public Key 是公開的，可以放在前端代碼中，但 Service ID 和 Template ID 建議使用環境變數。

## 步驟 6：測試

1. 啟動開發伺服器：`npm run dev`
2. 訪問網站並測試下載功能
3. 檢查您的郵件收件箱，應該會收到通知郵件

## 疑難排解

- 如果沒有收到郵件，檢查瀏覽器控制台是否有錯誤
- 確認 EmailJS Dashboard 中的服務和模板設置正確
- 檢查郵件是否被歸類為垃圾郵件

