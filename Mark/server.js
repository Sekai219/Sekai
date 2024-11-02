const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public')); // 静态文件服务

// 读取并发送书签文件
app.get('/bookmarks', (req, res) => {
  const filePath = path.join(__dirname, '233.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading bookmark file:', err);
      res.status(500).send('Error reading bookmark file.');
    } else {
      res.send(data); // 发送书签内容作为字符串
    }
  });
});

// 启动服务器
const PORT = process.env.PORT || 3399;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
