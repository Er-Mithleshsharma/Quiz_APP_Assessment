import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice';
import resultsReducer from './resultsclice'
import userReducer from './userslice';
const appstore = configureStore({
  reducer: {
    quiz: quizReducer,
    results: resultsReducer,
    user: userReducer,
  },
});

export default appstore;
