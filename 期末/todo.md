# 🍱 淡江美食網 (Tamkang Food Network)

本專案為淡江大學周邊美食導覽與評論平台，目前前端採用 Bootstrap 5 進行響應式設計，並支援深色模式與本地資料暫存。

## 🛠️ 技術架構 (Technology Stack)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5
- **Backend**: Node.js, Express (已完成串接)
- **Database**: MongoDB (已完成串接)
- **Container**: Docker

---

## ✅ 前端完成項目 (Frontend Implemented)

### 🎨 介面設計 (UI/UX)
- [x] **響應式導覽列 (Navbar)**: 透過 JS (`#navbar-data`) 動態生成選單。
- [x] **餐廳名片展示**: 
  - 依照類別 (臺式/義式/日式/港式/美式) 分區展示。
  - 使用 Card 元件呈現餐廳圖片、名稱、電話與 Google Maps 連結。
- [x] **深色模式 (Dark Mode)**: 
  - 支援一鍵切換深/淺色主題。
  - 自動記憶使用者偏好 (LocalStorage)。
  - 針對表單、Modal 與卡片進行深色樣式優化。
- [x] **視覺美化 (Visual Polish)**:
  - 字型優化 (Google Fonts: Noto Sans TC, Poppins)。
  - 增加進場動畫與按鈕互動特效。
  - 優化 Card 與 Form 的陰影與圓角設計。

### 📝 互動表單 (Interactive Form)
- [x] **評論表單**:
  - 包含暱稱、餐廳選擇、星級評分、文字評論。
  - **即時驗證**: 必填欄位檢查、錯誤訊息提示 (`invalid-feedback`)。
- [x] **星級評分系統**:
  - 支援三大面向評分 (服務/衛生/滿意度)。
  - 互動式星星點選與 hover 效果。
- [x] **資料暫存 (LocalStorage)**:
  - 自動保存未送出的表單內容 (暱稱/餐廳/評論)。
  - 重新整理網頁後資料不遺失。

---

## ✅ 後端/整合項目 (Backend / Integration Completed)

### 🔗 前後端串接 (Backend Integration)
- [x] **餐廳資料庫化**: 
  - API `GET /api/restaurants`: 從 MongoDB 獲取餐廳列表。
  - **Auto-Seed**: 若資料庫為空，自動將預設資料寫入 DB。
- [x] **評論資料送出**:
  - API `POST /api/comments`: 將前端表單資料存入 MongoDB。
  - 包含完整欄位 (暱稱, 餐廳, 三項評分, 評論內容)。
- [x] **後端路由調整**:
  - 建立 Mongoose Models (`Restaurant`, `Comment`)。
  - 實作對應的 Express Routes。

### 🐳 系統部署
- [x] **Dockerfile**: Node.js 環境設定 (已存在)。
- [x] **docker-compose.yml**: Mongo + Web Server (已存在)。
