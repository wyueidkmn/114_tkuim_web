// server/app.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import signupRouter from "./routes/signup.js";
import authRouter from "./routes/auth.js";

const app = express();

// CORS 允許前端存取
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

// 路由設定
app.use("/auth", authRouter);
app.use("/api/signup", signupRouter);

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// 全域錯誤處理
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server Error" });
});

// 取得 port
const port = process.env.PORT || 3001;

// 連線 MongoDB 並啟動 server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect MongoDB", error);
    process.exit(1);
  });
