import axios, { AxiosError } from "axios";
import { Challenge } from "../types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useChallengeDetails = (id: string) => {
  return useQuery<Challenge, AxiosError>({
    queryKey: ["challenge", id],
    queryFn: async () => {
      const response = await axios.get(
        `${API_BASE_URL}/dev/challenges?id=${id}`
      );
      console.log({ response });

      return response.data.data[0];
    },
    enabled: !!id,
  });
};
