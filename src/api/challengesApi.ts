import { apiClient } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchChallenges = async (filters: {
  page?: number;
  limit?: number;
  language?: number;
  difficulty?: string;
}) => {
  const response = await apiClient.get(`${API_BASE_URL}/dev/challenges`, {
    params: filters,
  });
  return response.data;
};

export const fetchChallengeDetails = async (id: string) => {
  const response = await apiClient.get(`${API_BASE_URL}/dev/challenges`, {
    params: { id },
  });
  return response.data.data[0];
};
