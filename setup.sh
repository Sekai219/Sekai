#!/bin/bash

# 定义变量
IMAGE_NAME="sekai"
CONTAINER_NAME="sekai"

# 创建 Dockerfile
cat > Dockerfile <<EOL
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
EOL

# 创建 .dockerignore
cat > .dockerignore <<EOL
node_modules
npm-debug.log
EOL

# 构建 Docker 镜像
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# 检查是否有运行的旧容器并删除
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing existing container..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# 运行 Docker 容器
echo "Running Docker container..."
docker run -d \
    -p 3333:3333 \
    -p 3399:3399 \
    -p 3366:3366 \
    --name $CONTAINER_NAME \
    $IMAGE_NAME

echo "Application is running on the following ports:"
echo "- Chat: http://localhost:3333"
echo "- Mark: http://localhost:3399"
echo "- Web: http://localhost:3366"