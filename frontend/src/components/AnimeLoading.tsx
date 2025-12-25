import React from 'react';
import runningGif from '../assets/running.gif';

const AnimeLoading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {/* Anime Speed Lines Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent animate-pulse"></div>
      </div>

      {/* Running Character Animation */}
      <div className="relative z-10">
        <img 
          src={runningGif}
          alt="Loading..." 
          className="h-32 w-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* Scrolling Ground */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mb-6 relative overflow-hidden border-2 border-pink-200">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-[shimmer_1s_infinite] -translate-x-full"></div>
      </div>

      <div className="text-center z-10">
        <h3 className="text-xl font-bold text-pink-500 animate-bounce drop-shadow-md">
          简历分析中...
        </h3>
        <p className="text-sm text-gray-500 font-medium">
          正在分析您的简历...
        </p>
      </div>
    </div>
  );
};

export default AnimeLoading;
