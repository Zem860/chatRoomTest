import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// ✅ 設定 CORS，允許你的前端網址請求
app.use(cors({
  origin: ['https://zem860.github.io', 'http://localhost:5173'],
  methods: ['GET', 'POST']
}));

// ✅ 初始化 Socket.IO 並允許跨來源請求
const io = new Server(server, {
  cors: {
    origin: ['https://zem860.github.io', 'http://localhost:5173'],
    methods: ['GET', 'POST']
  }
});

// ✅ 測試首頁路由（可以打開網址看到）
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// ✅ 處理聊天室連線邏輯
io.on('connection', (socket) => {
  console.log('🟢 使用者已連線:', socket.id);

  socket.on('chat', (msg) => {
    console.log('📨 收到訊息:', msg);
    io.emit('chat', msg); // 廣播給所有人
  });

  socket.on('disconnect', () => {
    console.log('🔴 使用者離線:', socket.id);
  });
});

// ✅ 使用 Render 指定的埠口，預設為 3001
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
