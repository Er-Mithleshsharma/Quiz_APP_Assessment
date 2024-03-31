

import React, { useState } from 'react';
import { setResults } from "../utils/resultsclice"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Questions = ({ quizData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // State to store the selected answer for each question
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  // Function to handle radio button change
  const handleRadioChange = (questionIndex, optionKey, ans) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      const updatedAnswers = [...prevSelectedAnswers];
      updatedAnswers[questionIndex] = { optionKey, ans };
      return updatedAnswers;
    });
  };
  
  // Function to get the selected answer for a question
  const getSelectedAnswer = (questionIndex) => {
    const selectedAnswer = selectedAnswers[questionIndex];
    return selectedAnswer ? selectedAnswer.optionKey : ''; // Return the selected optionKey
  };

  function saveresults()
  {
    dispatch(setResults(selectedAnswers));
    navigate("/result")
  }
  return  (
    <div className="flex justify-center items-center bg-black">
    <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
      {quizData.map((questionData, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 shadow-sm pb-2">{`Q${index + 1} ${questionData.q} : `}</h2>
          <p className="text-gray-700 mb-4 font-semibold text-xl ">{questionData.word}</p>
          <ul>
            {Object.keys(questionData.options).map((optionKey) => {
              const option = questionData.options[optionKey];
              const ans = questionData.ans;
              return (
                <li key={optionKey} className="mb-2 flex-1">
        <label className="inline-flex items-center bg-gray-100 w-full p-2 rounded-lg text-lg">
          <input 
            type="radio"
            name={`question_${index}`}
            value={optionKey}
            checked={getSelectedAnswer(index) === optionKey}
            onChange={() => handleRadioChange(index, optionKey, ans)}
            className="form-radio h-4 w-4 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">{option.word}</span>
        </label>
      </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className='text-center ' >
      <button className='px-6 py-2 bg-orange-400 rounded-lg ' onClick={saveresults}>Get Results</button>
      </div>
    
    </div>
  </div>
  );
};

export default Questions;
