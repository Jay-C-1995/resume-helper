# AI Resume Analyzer

AI 简历分析与优化项目，帮助求职者优化投递 AI 岗位的简历。

## 快速开始 (Windows)

### 方法一：使用 Docker (推荐)

如果您已安装 Docker Desktop：

1. **配置环境变量**
   进入 `backend` 目录，复制 `.env.example` 为 `.env`：
   ```powershell
   cd backend
   copy .env.example .env
   ```
   编辑 `.env` 文件，填入您的阿里云百炼 API Key 和 App ID。

2. **启动服务**
   在项目根目录下运行：
   ```powershell
   docker-compose up --build
   ```

3. **访问应用**
   - 前端：http://localhost:3000
   - 后端文档：http://localhost:8000/docs

### 方法二：本地手动启动

如果您没有安装 Docker，可以分别启动后端和前端。

#### 1. 启动后端 (Backend)

确保已安装 Python 3.11+。

```powershell
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
.\venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
copy .env.example .env
# 注意：请编辑 .env 文件填入 BAILIAN_API_KEY

# 启动服务
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 2. 启动前端 (Frontend)

确保已安装 Node.js 18+。

```powershell
# 打开新的终端窗口，进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 即可使用。
