import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Challenge } from "../types";
import { fetchChallengeDetails } from "../api/challengesApi";

export const useChallengeDetails = (id: string) => {
  return useQuery<Challenge, AxiosError>({
    queryKey: ["challenge", id],
    queryFn: () => fetchChallengeDetails(id),
    enabled: !!id,
  });
};
