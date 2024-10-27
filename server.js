const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

// 设置应用的端口
const PORT_CHAT = 3333;
const PORT_MARK = 3399;
const PORT_WEB = 3366;

// 创建三个 Express 应用
const appChat = express();
const appMark = express();
const appWeb = express();

// ======== Chat 应用 ========
const serverChat = http.createServer(appChat);
const io = socketIo(serverChat);

appChat.use(express.static(path.join(__dirname, 'chat', 'public')));

io.on('connection', (socket) => {
    console.log('A user connected to Chat');
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

serverChat.listen(PORT_CHAT, '0.0.0.0', () => {
    console.log(`Chat server is running on http://0.0.0.0:${PORT_CHAT}`);
});

// ======== Mark 应用 ========
appMark.use(express.static(path.join(__dirname, 'mark', 'public')));

appMark.get('/bookmarks', (req, res) => {
    const filePath = path.join(__dirname, 'mark', '233.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading bookmark file:', err);
            res.status(500).send('Error reading bookmark file.');
        } else {
            res.send(data);
        }
    });
});

appMark.listen(PORT_MARK, () => {
    console.log(`Mark server is running on http://localhost:${PORT_MARK}`);
});

// ======== Web 应用 ========
appWeb.use(express.static(path.join(__dirname, 'web', 'public')));

appWeb.listen(PORT_WEB, () => {
    console.log(`Web server is running on http://localhost:${PORT_WEB}`);
});