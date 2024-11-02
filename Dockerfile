# 使用轻量级的 Node.js 镜像
FROM node:16-alpine

# 创建并设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装生产环境依赖
RUN npm install --production

# 将项目文件复制到容器中
COPY . .

# 暴露多个端口
EXPOSE 3333 3399 3366

# 启动服务器
CMD ["node", "server.js"]
