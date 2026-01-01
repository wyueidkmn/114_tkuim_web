# 期末專案待辦事項 (To-Do List)

## 專案設定 (Project Setup)
- [ ] 初始化 Git 儲存庫
- [ ] 建立專案結構 (client, server, docker)
- [ ] 設定 Docker Compose (MongoDB)
- [ ] 撰寫 README.md

## 後端開發 (Backend - Node.js + Express)
- [ ] 初始化 `package.json` 並安裝套件 (express, mongoose, dotenv, cors, jsonwebtoken, bcryptjs)
- [ ] 設定 MongoDB 資料庫連線
- [ ] 建立 Mongoose Schema
  - [ ] 使用者 (User) 模型
  - [ ] 報名資料 (Signup) 模型
- [ ] 實作認證路由 (`/auth`)
  - [ ] POST /auth/signup (註冊使用者)
  - [ ] POST /auth/login (登入並取得 JWT)
- [ ] 實作 API 路由 (`/api/signup`)
  - [ ] GET /api/signup (取得報名列表 - 權限區分)
  - [ ] POST /api/signup (新增報名)
  - [ ] DELETE /api/signup/:id (刪除報名)
- [ ] 實作 JWT 驗證 Middleware

## 前端開發 (Frontend - Vanilla JS + HTML/CSS)
- [ ] 網頁切版與檔案建立 (Web Pages & Files)
  - [ ] 建立 `client/index.html` (單頁式應用程式 SPA)
  - [ ] 建立 `client/style.css` (全站樣式)
  - [ ] 建立 `client/script.js` (前端邏輯 - 控制頁面切換)
- [ ] HTML 結構設計
  - [ ] 設計導航列 (Navbar) - 包含登入/登出連結
  - [ ] 設計登入與註冊表單 (Form Inputs & Buttons)
  - [ ] 設計報名資料表格 (Data Table)
- [ ] CSS 樣式美化
  - [ ] 設定全站字體與配色
  - [ ] 設計響應式佈局 (RWD) 使用 Flexbox/Grid
  - [ ] 美化按鈕與互動效果 (Hover states)
- [ ] JavaScript 邏輯實作 (SPA Logic)
  - [ ] 實作頁面切換功能 (Login / Signup / Dashboard views)
  - [ ] 控制 DOM 元素顯示與隱藏
- [ ] 串接後端 API
  - [ ] 處理使用者登入與 Token 儲存
  - [ ] 顯示報名資料列表
  - [ ] 實作新增報名表單
  - [ ] 實作刪除功能
- [ ] 處理錯誤訊息與使用者回饋

## 測試與部署 (Verification & Deployment)
- [ ] 使用 Postman 測試所有 API
- [ ] 檢查前端與後端整合測試
- [ ] 確認 RWD (響應式網頁) 效果
- [ ] 程式碼優化與註解
