import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchData } from '../utils/useFetchData';
import Questions from './Questions';
function App() {
    
  // Select quizData from the Redux store state
  useFetchData()
  const quizData = useSelector((state) => state.quiz.quizData);
  if(!quizData) return<div className=''></div>
 return (
    <div className='bg-black h-screen'>
         <h1 className='text-5xl bg-black w-full text-center h-28 md:h-24 pt-4 text-orange-400 font-sans font-bold'>EssayChecker Quiz</h1>
      {quizData ? (
        <Questions quizData={Object.values(quizData)} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}


export default App;
