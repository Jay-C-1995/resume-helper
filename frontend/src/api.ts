import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

export interface AnalysisResult {
  name: string;
  email: string;
  ai_skills: string[];
  role_match_score: number;
  project_depth_score: number;
  suggestions: string[];
}

export interface ApiResponse {
  success: boolean;
  data: AnalysisResult;
}

export const analyzeResume = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<ApiResponse>(`${API_URL}/api/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
