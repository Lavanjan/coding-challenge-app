import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { fetchChallenges } from "../api/challengesApi";
import { ChallengesResponse } from "../types";

export const useChallenges = (filters: {
  page?: number;
  limit?: number;
  language?: number;
  difficulty?: string;
}) => {
  return useQuery<ChallengesResponse, AxiosError>({
    queryKey: ["challenges", filters],
    queryFn: () => fetchChallenges(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
