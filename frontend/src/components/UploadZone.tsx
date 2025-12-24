import { Upload, FileText, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import clsx from 'clsx';

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export default function UploadZone({ onFileUpload, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={clsx(
        "border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer",
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500",
        isLoading && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
    >
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        id="file-upload"
        onChange={handleFileInput}
        disabled={isLoading}
      />
      <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
        {isLoading ? (
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        ) : (
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
        )}
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          {isLoading ? "正在分析简历..." : "点击或拖拽上传简历 PDF"}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          支持 .pdf 格式，最大 10MB
        </p>
      </label>
    </div>
  );
}
