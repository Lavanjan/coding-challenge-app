import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
  completed: number[];
  timeSpent: Record<number, number>;
}

const initialState: QuestionsState = {
  completed: [],
  timeSpent: {},
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    completeQuestion: (state, action: PayloadAction<number>) => {
      if (!state.completed.includes(action.payload)) {
        state.completed.push(action.payload);
      }
    },
    updateTimeSpent: (
      state,
      action: PayloadAction<{ questionId: number; time: number }>
    ) => {
      state.timeSpent[action.payload.questionId] =
        (state.timeSpent[action.payload.questionId] || 0) + action.payload.time;
    },
  },
});

export const { completeQuestion, updateTimeSpent } = questionsSlice.actions;
export default questionsSlice.reducer;
