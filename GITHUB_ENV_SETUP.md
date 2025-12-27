# GitHub Pages 環境變數設置指南

> 最後更新：2025-12-27

## 步驟 1：在 GitHub Repository 中添加 Secrets

1. 前往您的 GitHub Repository：`https://github.com/Tinghao-Wang/Tinghao-Wang.github.io`

2. 點擊 **Settings**（設定）

3. 在左側選單中找到 **Secrets and variables** > **Actions**

4. 點擊 **New repository secret**（新增儲存庫密碼）

5. 添加以下三個 Secrets：

   **Secret 1:**
   - Name: `EMAILJS_SERVICE_ID`
   - Value: `service_2gd39nv`
   - 點擊 **Add secret**

   **Secret 2:**
   - Name: `EMAILJS_TEMPLATE_ID`
   - Value: `template_efi3b6g`
   - 點擊 **Add secret**

   **Secret 3:**
   - Name: `EMAILJS_PUBLIC_KEY`
   - Value: `SSdEX1th7VSjuD6uA`
   - 點擊 **Add secret**

## 步驟 2：確認 GitHub Actions 工作流已更新

GitHub Actions 工作流文件（`.github/workflows/deploy.yml`）已經更新，會在構建時使用這些 Secrets 作為環境變數。

## 步驟 3：觸發重新部署

有兩種方式：

### 方式 1：自動觸發（推薦）
- 推送任何變更到 `main` 分支，GitHub Actions 會自動運行並部署

### 方式 2：手動觸發
1. 前往 **Actions** 標籤
2. 選擇 **Deploy to GitHub Pages** 工作流
3. 點擊 **Run workflow**
4. 選擇 `main` 分支
5. 點擊 **Run workflow**

## 步驟 4：驗證部署

1. 等待 GitHub Actions 完成（通常需要 1-2 分鐘）
2. 訪問您的網站：`https://tinghao-wang.github.io`
3. 測試下載功能
4. 檢查是否收到郵件通知

## 重要提醒

- ✅ Secrets 是加密的，只有 GitHub Actions 可以訪問
- ✅ `.env.local` 文件不會被推送到 GitHub（已在 .gitignore 中）
- ✅ 環境變數只在構建時使用，不會暴露在最終的靜態文件中
- ⚠️ Public Key 是公開的，可以安全地放在前端代碼中

## 疑難排解

如果部署後郵件功能不工作：

1. 檢查 GitHub Actions 的構建日誌：
   - 前往 **Actions** 標籤
   - 點擊最新的工作流運行
   - 檢查是否有錯誤

2. 確認 Secrets 已正確設置：
   - 前往 **Settings** > **Secrets and variables** > **Actions**
   - 確認三個 Secrets 都存在

3. 檢查瀏覽器控制台：
   - 打開網站並測試下載功能
   - 打開開發者工具（F12）
   - 查看 Console 是否有錯誤訊息

