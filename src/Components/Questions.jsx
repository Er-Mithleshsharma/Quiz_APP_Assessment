import React, { useState } from 'react';
import { setResults } from "../utils/resultsclice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'; // Import Bounce transition
import 'react-toastify/dist/ReactToastify.css'; 

const Questions = ({ quizData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResultButton, setShowResultButton] = useState(false);
  const [submittedQuestions, setSubmittedQuestions] = useState(new Array(quizData.length).fill(false));

  const handleRadioChange = (optionKey, ans) => {
    if (!submittedQuestions[currentQuestionIndex]) {
      setSelectedAnswers((prevSelectedAnswers) => {
        const updatedAnswers = [...prevSelectedAnswers];
        updatedAnswers[currentQuestionIndex] = { optionKey, ans };
        return updatedAnswers;
      });
    }
  };

  const getSelectedAnswer = () => {
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    return selectedAnswer ? selectedAnswer.optionKey : '';
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } 
    if(currentQuestionIndex == quizData.length-2)
    {
      setShowResultButton(true)
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };
  const notify = () => toast.success('Correct Answer', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });
    const notify1 = ()=> toast.error('Wrong Answer', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  const handleSubmit = () => {
    if(!selectedAnswers[currentQuestionIndex])
    {
      return;
    }
    if (!submittedQuestions[currentQuestionIndex]) {
      setSubmittedQuestions((prevSubmittedQuestions) => {
        const updatedSubmittedQuestions = [...prevSubmittedQuestions];
        updatedSubmittedQuestions[currentQuestionIndex] = true;
         console.log(selectedAnswers[currentQuestionIndex])
        if( selectedAnswers[currentQuestionIndex].optionKey == selectedAnswers[currentQuestionIndex].ans){
          
         notify()
        }
        else 
        notify1()
    
        return updatedSubmittedQuestions;
      });
    }
  };

  const saveResults = () => {
    dispatch(setResults(selectedAnswers));
    navigate("/result");
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <>
    <div className="flex justify-center items-center bg-black h-screen md:h-auto">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg h-full md:h-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 shadow-sm pb-2">{`Q${currentQuestionIndex + 1} ${currentQuestion.q} : `}</h2>
          <p className="text-gray-700 mb-4 font-semibold text-xl ">{currentQuestion.word}</p>
          <ul>
            {Object.keys(currentQuestion.options).map((optionKey) => {
              const option = currentQuestion.options[optionKey];
              const ans = currentQuestion.ans;
              return (
                <li key={optionKey} className="mb-2 flex-1">
                  <label className="inline-flex items-center bg-gray-100 w-full p-2 rounded-lg text-lg">
                    <input 
                      type="radio"
                      name={`question_${currentQuestionIndex}`}
                      value={optionKey}
                      checked={getSelectedAnswer() === optionKey}
                      onChange={() => handleRadioChange(optionKey, ans)}
                      className="form-radio h-4 w-4 text-indigo-600"
                      disabled={submittedQuestions[currentQuestionIndex]}
                    />
                    <span className="ml-2 text-gray-700">{option.word}</span>
                  </label>
                </li>
              );
            })}
          </ul>

        </div>

        <div className="flex justify-between">
          <button 
            className="px-6 py-2 bg-orange-400 rounded-lg" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button> 
           <button 
            className="px-6 py-2 bg-orange-400 rounded-lg" 
            onClick={handleSubmit}
            disabled={submittedQuestions[currentQuestionIndex]}
          >
            Submit
          </button>
          <button 
            className="px-6 py-2 bg-orange-400 rounded-lg" 
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === quizData.length - 1}
          >
            Next
          </button>
        
        </div>

        < div className="mt-14 text-right">
        { showResultButton && < button className="px-6 py-2 bg-orange-400 rounded-lg" onClick={saveResults}>
          Get Results
        </button>}
        </div>
      </div>
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
    </>
  );
};

export default Questions;
