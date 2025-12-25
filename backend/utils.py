import pdfplumber
import io
import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

BAILIAN_API_KEY = os.getenv("BAILIAN_API_KEY")
BAILIAN_APP_ID = os.getenv("BAILIAN_APP_ID")

# Initialize OpenAI client for Bailian (DashScope)
client = OpenAI(
    api_key=BAILIAN_API_KEY,
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF file bytes."""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            text = ""
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
            return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def analyze_resume_with_bailian(text: str) -> dict:
    """Analyze resume text using Bailian (Qwen) API."""
    if not text:
        raise ValueError("Empty resume text")

    prompt = f"""
    你是一位资深AI招聘经理，专注于招聘AI应用开发工程师、RAG开发工程师和LLM Agent开发工程师。
    请分析以下简历内容，并按照要求返回JSON格式的分析结果。

    简历内容：
    {text}

    分析要求：
    1. 识别简历中是否包含 RAG/Agent/AI 工程相关关键词（如 LangChain, LlamaIndex, FAISS, Pinecone, FastAPI, Embedding模型, Agent框架等）。
    2. 判断项目是否体现系统设计、评估指标、迭代优化。
    3. 检查是否有量化成果（如准确率提升、延迟降低等）。
    4. 给出4-5条具体、可操作的修改建议。

    请严格返回合法的JSON格式，不包含Markdown格式标记，包含以下字段：
    - name: 候选人姓名（如果找不到则返回"Unknown"）
    - email: 候选人邮箱（如果找不到则返回"Unknown"）
    - ai_skills: 字符串数组，检测到的AI相关技能
    - role_match_score: 整数 (0-100)，岗位匹配度
    - project_depth_score: 整数 (1-5)，项目深度，简历书写评分
    - suggestions: 字符串数组，4-5条具体修改建议
    """

    try:
        completion = client.chat.completions.create(
            model="qwen-plus",
            messages=[
                {"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        content = completion.choices[0].message.content
        return json.loads(content)
    except Exception as e:
        print(f"Error calling Bailian API: {e}")
        # Return a mock error response or raise
        return {
            "name": "Error",
            "email": "Error",
            "ai_skills": [],
            "role_match_score": 0,
            "project_depth_score": 0,
            "suggestions": ["AI分析服务暂时不可用，请检查API Key配置或网络连接。"]
        }
