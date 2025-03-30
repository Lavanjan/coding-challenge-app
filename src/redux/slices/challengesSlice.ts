/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChallengeState {
  challenges: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChallengeState = {
  challenges: [],
  isLoading: false,
  error: null,
};

const challengesSlice = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    setChallenges(state: ChallengeState, action: PayloadAction<any[]>) {
      state.challenges = action.payload;
    },
    setLoading(state: ChallengeState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state: ChallengeState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setChallenges, setLoading, setError } = challengesSlice.actions;
export default challengesSlice.reducer;
