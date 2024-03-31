import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setUserName } from '../utils/userslice'; // Import the action creator

import { Link } from 'react-router-dom'

export default function Main() {
     const dispatch = useDispatch();
    const inputRef = useRef(null)

    function startQuiz(){
        if(inputRef.current?.value){
            dispatch(setUserName(inputRef.current?.value));
        }
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl bg-black w-full text-center  md:h-24 pt-4 text-orange-400 font-sans font-bold'>Essay Checker.ai Quiz Assessment</h1>

        <ol className='w-full text-center pt-10'>
            <li className='text-2xl pt-4 font-semibold'>You will be asked 10 Questions </li>
            <li className='text-2xl pt-4 font-semibold'>1 point is awarded for the correct answer.</li>
            <li className='text-2xl pt-4 font-semibold'>Each question has Four options. You can choose only one option.</li>
            <li className='text-2xl pt-4 font-semibold'>The result will be declared at the end of the quiz.</li>
        </ol>

        <form id="form" className='pt-10 pb-10'>
            <input 
            className="w-full px-4 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            ref={inputRef}  type="text" placeholder='Username*' />
        </form>

        <div className='start bg-orange-400 py-2 px-6 font-bold '>
            <Link className='btn' to={'quiz'} onClick={startQuiz}>Start Quiz</Link>
        </div>

    </div>
  )
}