import { CheckCircle2, Award, Zap, BookOpen } from 'lucide-react';
import { AnalysisResult } from '../api';

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="anime-card p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white/90 backdrop-blur-sm border-2 border-emerald-100/50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{result.name}</h2>
          <p className="text-gray-500">{result.email}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">简历评分（仅供参考）</div>
          <div className="text-4xl font-black text-emerald-500 drop-shadow-sm">
            {result.role_match_score}<span className="text-sm text-gray-400 font-normal">/100</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3">
          <Zap className="w-5 h-5 text-yellow-400 fill-current" />
          掌握的技术栈
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.ai_skills.length > 0 ? (
            result.ai_skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-sm font-medium shadow-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">未检测到魔力反应... (´;ω;`)</span>
          )}
        </div>
      </div>

      {/* Project Depth */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3">
          <Award className="w-5 h-5 text-purple-400 fill-current" />
          简历评级
        </h3>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`w-8 h-3 rounded-full transition-all duration-300 ${
                star <= result.project_depth_score
                  ? 'bg-amber-400 shadow-[0_2px_0_#D97706]'
                  : 'bg-gray-100'
              }`}
            />
          ))}
          <span className="ml-3 text-gray-600 font-medium">
            {result.project_depth_score} 星
          </span>
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-3">
          <BookOpen className="w-5 h-5 text-emerald-500 fill-current" />
          优化建议
        </h3>
        <ul className="space-y-4">
          {result.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3 p-4 bg-slate-50 border border-emerald-100 rounded-xl hover:shadow-md transition-shadow hover:border-emerald-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {suggestion}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
