// const express = require('express') 引入 Express 套件：這是 Node.js 很流行的 web 框架，幫助你快速建 API 或網站。
// const http = require('http'); 這是 Node.js 內建的 HTTP 模組，我們用它來建立真正的伺服器（因為 Socket.IO 必須接在「原生 http server」上才能正常運作）。
// const {Server} = require('socket.io') 從 socket.io 套件中，取出 Server 類別，這個類別是用來建立「WebSocket 伺服器」的。
// const cors=require('cors') 引入 CORS 套件，它允許來自不同來源的前端（例如 Vite 的 localhost:5173）連線你的伺服器。
import express from 'express'
import http from 'http' 
import { Server } from 'socket.io'
import cors from 'cors'
const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
    cors:{
        origin:'http://localhost:5173',
        methods:['GET', 'POST']
    }
})

io.on('connection', (socket)=>{
    console.log('🟢 使用者已連線:', socket.id)

    socket.on('chat', (msg)=>{
        console.log('收到訊息', 'msg')
        io.emit('chat', msg)
    })

    socket.on('dc', ()=>{
        console.log('🔴 使用者離線:', socket.id)
    })
})

server.listen(3001, ()=>{
    console.log("socket啟動")
})