import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchChallenges = async (filters: {
  page?: number;
  limit?: number;
  language?: number;
  difficulty?: string;
}) => {
  const response = await axios.get(`${API_BASE_URL}/dev/challenges`, {
    params: filters,
  });
  return response.data;
};

export const fetchChallengeDetails = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/dev/challenges`, {
    params: { id },
  });
  return response.data.data[0];
};
