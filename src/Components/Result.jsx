import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate()
    const results = useSelector(state => state.results.results);
    const name = useSelector(state => state.user.userName)
    let score = null;
    if(!results) return
    const ans = results.filter((opt,index)=>{
        if(opt!=null)
       return opt.optionKey==opt.ans
    })
  return (
    <div>
        <h1 className='text-5xl bg-black w-full text-center h-28 md:h-24 pt-4 text-orange-400 font-sans font-bold'>EssayChecker Quiz</h1>
    <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg mx-auto">
        <h1 className='text-xl font-bold'>{name} Your Result is :</h1>
        <h1 className='font-bold text-center text-5xl'>{`${ans.length}/10`}</h1>
       
       
    </div>
    </div>
  )
}

export default Result