import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChallengesResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useChallenges = (filters: {
  page?: number;
  limit?: number;
  language?: number;
  difficulty?: string;
}) => {
  return useQuery<ChallengesResponse, AxiosError>({
    queryKey: ["challenges", filters],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/dev/challenges`, {
        params: filters,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
