import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState :
  {
    quizData: null,
  },
  reducers: {

    setQuizData(state, action) {
      state.loading = false;
      state.quizData = action.payload;
    },
  },
});

export const { setQuizData } = quizSlice.actions;
export default quizSlice.reducer;
