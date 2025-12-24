import { CheckCircle2, Award, Zap, BookOpen } from 'lucide-react';
import { AnalysisResult } from '../api';

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{result.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{result.email}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">岗位匹配度</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {result.role_match_score}<span className="text-sm text-gray-400">/100</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Zap className="w-5 h-5 text-yellow-500" />
          检测到的 AI 技能
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.ai_skills.length > 0 ? (
            result.ai_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">未检测到相关技能</span>
          )}
        </div>
      </div>

      {/* Project Depth */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <Award className="w-5 h-5 text-purple-500" />
          项目深度评分
        </h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`w-8 h-2 rounded-full transition-colors ${
                star <= result.project_depth_score
                  ? 'bg-purple-500'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600 dark:text-gray-300 font-medium">
            {result.project_depth_score} 星
          </span>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3">
          <BookOpen className="w-5 h-5 text-green-500" />
          优化建议
        </h3>
        <ul className="space-y-3">
          {result.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-200">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
