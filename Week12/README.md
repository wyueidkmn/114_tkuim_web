# Week12 報名系統 (Registration System)

這是一個簡單的前後端分離報名系統，包含使用者登入/註冊功能以及報名資料的管理。

## 專案結構

- `client/`: 前端程式碼 (HTML, CSS, Vanilla JS)
- `server/`: 後端 API 伺服器 (Node.js, Express)
- `docker/`: Docker 相關配置 (如 MongoDB)

## 功能特色

- **使用者認證**: 支援使用者註冊與登入 (JWT Authentication)
- **報名管理**: 
  - 檢視報名資料 (一般使用者僅見自己，管理員可見全部)
  - 新增報名資料
  - 刪除報名資料 (權限控制)
- **技術棧**:
  - Backend: Node.js, Express, MongoDB, Mongoose (MongoDB Driver)
  - Frontend: Vanilla JS, Fetch API
  - Database: MongoDB

## 安裝與執行

### 環境需求

- Node.js (v16+)
- MongoDB (可使用 Docker 啟動)

### 1. 啟動資料庫

如果你有安裝 Docker，可以使用專案中的 Docker Compose 或直接啟動 MongoDB：

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 2. 後端設置 (Server)

進入 `server` 目錄並安裝依賴：

```bash
cd server
npm install
```

設定環境變數：
請確保 `server` 目錄下有 `.env` 檔案，內容如下：

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/week11
ALLOWED_ORIGIN=http://127.0.0.1:5500
JWT_SECRET=your_jwt_secret_key
```
> 注意：`ALLOWED_ORIGIN` 請設定為你前端運行的位址 (例如 Live Server 預設是 `http://127.0.0.1:5500` 或 `http://localhost:5500`)。

啟動伺服器：

```bash
npm run dev
# 或
npm start
```
伺服器將運行於 `http://localhost:3001`。

### 3. 前端運行 (Client)

前端為純靜態檔案，可以直接透過瀏覽器開啟 `client/index.html`，但建議使用 VS Code 的 **Live Server** 擴充套件來運行，以確保 Fetch API 運作正常且避免 CORS 問題 (需配合後端 `.env` 設定)。

1. 在 VS Code 中打開 `client` 資料夾。
2. 在 `index.html` 上按右鍵選擇 "Open with Live Server"。

## API 文件

### Auth (認證)
*目前後端 `app.js` 需確認已掛載 `/auth`路由*

- **POST** `/auth/signup`: 使用者註冊
- **POST** `/auth/login`: 使用者登入

### Signup (報名資料)
*需攜帶 Bearer Token*

- **GET** `/api/signup`: 取得報名列表
- **POST** `/api/signup`: 新增報名
- **DELETE** `/api/signup/:id`: 刪除報名
