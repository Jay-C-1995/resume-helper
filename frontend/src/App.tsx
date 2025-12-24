import { useState } from 'react';
import { Bot } from 'lucide-react';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import ThemeToggle from './components/ThemeToggle';
import { analyzeResume, AnalysisResult } from './api';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeResume(file);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('分析失败，请稍后重试或检查后端服务。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI 简历分析助手(黑马专用)</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                面向 AI 工程师岗位的深度简历优化工具
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {!result ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  让 AI 帮你打造完美简历
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  上传 PDF 简历，获取针对 AI 应用开发、RAG、Agent 等岗位的专业评估与优化建议。
                </p>
              </div>
              
              <UploadZone onFileUpload={handleFileUpload} isLoading={isLoading} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">智能关键词检测</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">识别 RAG、Agent、LangChain 等核心技术栈</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">项目深度评估</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">分析系统设计、量化指标与技术难点</p>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">专业修改建议</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">提供资深面试官视角的具体优化方案</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setResult(null)}
                className="mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                ← 上传新简历
              </button>
              <ResultCard result={result} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
