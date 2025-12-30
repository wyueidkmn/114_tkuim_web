# 📝 全端資料填寫網站開發清單 (Project To-Do)

本文件包含建立現代化資料填寫網站的所有步驟與完整程式碼。

## 專案技術棧
- **前端**: HTML5, Modern CSS (Glassmorphism), Vanilla JavaScript
- **後端**: Node.js (Express)
- **資料庫**: MongoDB
- **部署**: Docker & Docker Compose

---

## ✅ 步驟 1: 專案結構初始化

- [x] 建立專案資料夾與檔案結構
  - `public/index.html`
  - `public/style.css`
  - `public/script.js`
  - `server.js`
  - `Dockerfile`
  - `docker-compose.yml`
  - `package.json`

---

## 🎨 步驟 2: 前端開發 (Frontend)

### 📄 `public/index.html` - [x] 已建立
建立包含輸入表單的頁面結構。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高質感資料填寫系統</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="background-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    </div>

    <main class="glass-container">
        <header>
            <h1>✨ 用戶資料填寫</h1>
            <p>請輸入您的詳細資訊以完成註冊</p>
        </header>

        <form id="dataForm">
            <div class="input-group">
                <label for="username">姓名</label>
                <input type="text" id="username" name="username" placeholder="請輸入姓名" required>
            </div>

            <div class="input-group">
                <label for="email">電子郵件</label>
                <input type="email" id="email" name="email" placeholder="example@domain.com" required>
            </div>

            <div class="input-group">
                <label for="message">備註訊息</label>
                <textarea id="message" name="message" rows="4" placeholder="請輸入想要告訴我們的話..."></textarea>
            </div>

            <button type="submit" id="submitBtn">
                <span>送出資料</span>
                <div class="loader"></div>
            </button>
        </form>

        <div id="statusMessage" class="hidden"></div>
    </main>

    <script src="script.js"></script>
</body>
</html>
```

### 💅 `public/style.css` - [x] 已建立
使用 Glassmorphism (毛玻璃) 風格設計。

```css
:root {
    --primary-color: #6366f1;
    --text-color: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --input-bg: rgba(0, 0, 0, 0.2);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}

body {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0f172a;
    overflow: hidden;
    color: var(--text-color);
}

/* 動態背景 */
.background-blobs {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
}

.blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 10s infinite alternate;
}

.blob-1 { width: 400px; height: 400px; background: #4f46e5; top: -100px; left: -100px; }
.blob-2 { width: 300px; height: 300px; background: #ec4899; bottom: -50px; right: -50px; animation-delay: -5s; }
.blob-3 { width: 250px; height: 250px; background: #06b6d4; bottom: 20%; left: 20%; animation-duration: 15s; }

@keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30px, 50px) scale(1.1); }
}

/* 毛玻璃容器 */
.glass-container {
    position: relative;
    z-index: 10;
    width: 90%;
    max-width: 450px;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

header {
    text-align: center;
    margin-bottom: 30px;
}

header h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    font-weight: 600;
}

header p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
}

.input-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
}

input, textarea {
    width: 100%;
    padding: 12px 16px;
    background: var(--input-bg);
    border: 1px solid transparent;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
    outline: none;
}

input::placeholder, textarea::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

input:focus, textarea:focus {
    background: rgba(0, 0, 0, 0.4);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}

button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -10px rgba(99, 102, 241, 0.5);
}

button:active {
    transform: translateY(0);
}

.hidden { display: none; }

#statusMessage {
    margin-top: 20px;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    font-size: 0.9rem;
}

.success { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid #22c55e; }
.error { background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444; }
```

### ⚡ `public/script.js` - [x] 已建立
前端邏輯處理。

```javascript
document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('statusMessage');
    const originalBtnText = submitBtn.querySelector('span').innerText;
    
    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').innerText = '處理中...';
    statusMsg.className = 'hidden';

    // 收集資料
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            statusMsg.textContent = '🎉 資料提交成功！';
            statusMsg.className = 'success';
            document.getElementById('dataForm').reset();
        } else {
            throw new Error(result.message || '提交失敗');
        }
    } catch (error) {
        statusMsg.textContent = `❌ 錯誤: ${error.message}`;
        statusMsg.className = 'error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').innerText = originalBtnText;
    }
});
```

---

## 🚀 步驟 3: 後端與 Docker 設定 (Backend & Docker)

### 📦 `package.json` - [x] 已建立
專案設定檔。

```json
{
  "name": "docker-mongo-form",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.3",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5"
  }
}
```

### 🖥️ `server.js` - [x] 已建立
Express 伺服器與 MongoDB 連線。

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/userDB';

mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schema Definition
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Routes
app.post('/api/submit', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 🐳 `Dockerfile` - [x] 已建立
Node.js 應用程式容器化設定。

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### 🐙 `docker-compose.yml` - [x] 已建立
定義多容器應用程式 (Web + DB)。

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/userDB
    depends_on:
      - mongo
    networks:
      - app-network

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  mongo-data:
```

---

## ▶️ 如何執行 How to Run

1. **建立檔案**：確保上述所有檔案都已建立在正確的位置。 - [x] **已完成**
2. **啟動 Docker**：在終端機 (Terminal) 中執行：
   ```bash
   docker-compose up --build
   ```
3. **測試網站**：
   - 開啟瀏覽器輸入 `http://localhost:3000`
   - 填寫表單並送出，資料將會儲存到 MongoDB 中。
