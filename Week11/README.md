# Week 11 報名系統 API

## 1.環境需求

Node.js: v16 或以上版本

Docker Desktop: 用於執行 MongoDB 資料庫

## 2. 環境變數設定 (.env)

在 `server/` 資料夾下建立 `.env` 檔案：
PORT=3001
MONGODB_URI=mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11
ALLOWED_ORIGIN=http://localhost:5173

## 3. Mongo Shell 測試指令範例

你可以進入 Docker 容器內，直接操作資料庫來驗證 skip/limit 是否生效。


## 4. 啟動指令

步驟1:進入 docker 資料夾並啟動：
docker-compose up -d mongodb
步驟2:進入 server 資料夾:
npm install
步驟3:啟動伺服器:
npm run dev

## 5. 測試方法

使用 VS Code REST Client
開啟 tests/api.http 檔案

## 測試截圖

<img src="./png/123.png" width="600" alt="API 測試結果">