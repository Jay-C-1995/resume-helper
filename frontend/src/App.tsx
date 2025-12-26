import { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import ThemeToggle from './components/ThemeToggle';
import AnimeLoading from './components/AnimeLoading';
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
    <div className="min-h-screen bg-white/60 dark:bg-gray-900/80 transition-colors duration-300 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl shadow-[4px_4px_0px_#FCD34D] border-2 border-emerald-100 transform hover:-translate-y-1 transition-transform">
              <Bot className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 drop-shadow-sm">
                AI 简历分析助手 <span className="text-xs bg-emerald-400 text-white px-2 py-1 rounded-full">黑马python专用</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                (｡•̀ᴗ-)✧ 努力让您的简历变得与众不同！
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {isLoading ? (
            <div className="anime-card p-12 flex justify-center bg-white/80 backdrop-blur-md">
              <AnimeLoading />
            </div>
          ) : !result ? (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2 drop-shadow-sm">
                  <Sparkles className="text-emerald-400" />
                  让AI帮你重铸简历
                  <Sparkles className="text-emerald-400" />
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-200 font-medium">
                  上传 PDF 简历，获取针对 AI 应用开发、RAG、Agent 等岗位的专业评估与优化建议。
                </p>
              </div>
              
              <div className="anime-card p-2 bg-white/70 backdrop-blur-md shadow-xl border-emerald-100/50 border">
                <UploadZone onFileUpload={handleFileUpload} isLoading={isLoading} />
              </div>
              
              {error && (
                <div className="mt-4 p-4 bg-red-100/90 border-2 border-red-200 text-red-700 rounded-xl text-center shadow-sm backdrop-blur-sm">
                  {error}
                </div>
              )}

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="anime-card p-6 bg-white/80 hover:-translate-y-1 transition-transform border-t-4 border-emerald-300">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">解析技能</h3>
                  <p className="text-sm text-gray-600">识别 RAG、Agent 、langChain等核心开发技能</p>
                </div>
                <div className="anime-card p-6 bg-white/80 hover:-translate-y-1 transition-transform border-t-4 border-amber-300">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">技能评估</h3>
                  <p className="text-sm text-gray-600">多维度评分与技术难点分析</p>
                </div>
                <div className="anime-card p-6 bg-white/80 hover:-translate-y-1 transition-transform border-t-4 border-pink-300">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">优化方案</h3>
                  <p className="text-sm text-gray-600">多维度视角的改良方案</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setResult(null)}
                className="mb-6 px-4 py-2 bg-white/90 text-emerald-500 border-2 border-emerald-400 rounded-full hover:bg-emerald-400 hover:text-white transition-colors flex items-center gap-2 font-bold shadow-sm backdrop-blur-sm"
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
