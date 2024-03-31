import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setQuizData } from './quizSlice';
export const useFetchData = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.essaychecker.ai/quiz/trial/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
        });
        const responseData = await response.json();
        setData(responseData);
        dispatch(setQuizData(responseData?.data));
      } catch (error) {
    
      }
    };

    fetchData();
  }, []);
};
