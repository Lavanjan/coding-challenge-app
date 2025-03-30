export interface Challenge {
  id: number;
  challenge: string;
  language: {
    id: number;
    name: string;
  };
  level: "EASY" | "MEDIUM" | "HARD";
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface ChallengesResponse {
  status: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  data: Challenge[];
}

export interface ChallengeCardProps {
  id: number;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  language: string;
}
