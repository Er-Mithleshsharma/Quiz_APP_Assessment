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
  const [enableNextButton, setEnableNextButton] = useState(false); // State to enable/disable Next button
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false); // State to track if submit button is clicked

  const handleAnswerSelection = (optionKey, ans) => {
    if (!submittedQuestions[currentQuestionIndex]) {
      setSelectedAnswers((prevSelectedAnswers) => {
        const updatedAnswers = [...prevSelectedAnswers];
        updatedAnswers[currentQuestionIndex] = { optionKey, ans };
        return updatedAnswers;
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setEnableNextButton(false); // Disable the "Next" button after moving to the next question
      setSubmitButtonClicked(false); // Reset the submit button clicked state for the next question
    } 
    if(currentQuestionIndex === quizData.length - 2) {
      setShowResultButton(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setEnableNextButton(false); // Disable the "Next" button after moving to the next question
      setSubmitButtonClicked(false); // Reset the submit button clicked state for the next question
    }
    if(currentQuestionIndex === quizData.length - 2) {
      setShowResultButton(true);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswers[currentQuestionIndex] || submittedQuestions[currentQuestionIndex] || submitButtonClicked) {
      return;
    }
    setSubmittedQuestions((prevSubmittedQuestions) => {
      const updatedSubmittedQuestions = [...prevSubmittedQuestions];
      updatedSubmittedQuestions[currentQuestionIndex] = true;
      setEnableNextButton(true); // Enable the "Next" button after submitting the answer
      setSubmitButtonClicked(true); // Set the submit button as clicked
      const isCorrect = selectedAnswers[currentQuestionIndex].optionKey === selectedAnswers[currentQuestionIndex].ans;
      const feedbackMessage = isCorrect ? 'Correct Answer' : 'Wrong Answer';
      toast[isCorrect ? 'success' : 'error'](feedbackMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: isCorrect ? "colored" : "light",
        transition: Bounce,
      });
      return updatedSubmittedQuestions;
    });
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
                const isSelected = selectedAnswers[currentQuestionIndex]?.optionKey === optionKey;
                return (
                  <li key={optionKey} className="mb-2 flex-1" onClick={() => handleAnswerSelection(optionKey, ans)}>
                    <div className={`inline-flex items-center bg-gray-100 w-full p-2 rounded-lg text-lg cursor-pointer ${isSelected ? 'bg-gray-300' : ''}`}>
                      <span className={`text-indigo-600 mr-2 ${isSelected ? 'text-gray-900' : ''}`}>{optionKey}</span>
                      <span>{option.word}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex justify-between">
            <button
              className="px-6 py-2 bg-orange-400 rounded-lg"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === -1}
            >
              Skip
            </button>
            <button
              className={`px-6 py-2 bg-orange-400 rounded-lg ${submitButtonClicked ? 'bg-gray-400' : ''}`}
              onClick={handleSubmit}
              disabled={submittedQuestions[currentQuestionIndex] || submitButtonClicked}
            >
              Submit
            </button> 
            <button
              className={`px-6 py-2 bg-orange-400 rounded-lg ${enableNextButton ? '' : 'bg-gray-400'}`}
              onClick={handleNextQuestion}
              disabled={!enableNextButton}
            >
              Next
            </button>
          </div>

          <div className="mt-14 text-right">
            {showResultButton && <button className="px-6 py-2 bg-orange-400 rounded-lg" onClick={saveResults}>
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
