# 部署指南

## 1. 准备工作

确保您的服务器（如阿里云、腾讯云）满足以下条件：
- 操作系统：Ubuntu 20.04/22.04 或 CentOS 7+
- 内存：至少 2GB（推荐 4GB）
- 已安装 Docker 和 Docker Compose

### 安装 Docker (如果尚未安装)

```bash
# Ubuntu
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# 重新登录以生效
```

## 2. 上传代码

将项目文件上传到服务器。您可以使用 `scp` 或 `git`。

**方法一：使用 SCP (推荐)**
在您本地电脑的终端执行（假设服务器IP是 1.2.3.4）：

```powershell
# 将当前目录下的所有文件上传到服务器的 ~/ai-resume-analyzer 目录
scp -r . root@1.2.3.4:~/ai-resume-analyzer
```

## 3. 服务器配置与启动

SSH 登录到您的服务器：

```bash
ssh root@1.2.3.4
cd ~/ai-resume-analyzer
```

### 3.1 配置环境变量

创建生产环境的配置文件：

```bash
cd backend
cp .env.example .env
nano .env
```
**重要**：编辑 `.env` 文件，填入您的阿里云百炼 API Key。

### 3.2 启动服务

使用生产环境的 Docker 配置文件启动：

```bash
# 回到项目根目录
cd ..
docker compose -f docker-compose.prod.yml up -d --build
```

## 4. 验证与访问

- **访问地址**：`http://您的服务器IP`
- **API地址**：`http://您的服务器IP/api/analyze`

## 5. 常见问题

### 端口无法访问
如果无法访问，请检查服务器的安全组（防火墙）设置，确保开放了 **80** 端口。

### 修改代码后更新
如果您更新了代码，需要重新部署：
```bash
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```
