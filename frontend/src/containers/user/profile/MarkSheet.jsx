import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

function MarkSheet() {
 
   const  [quizzes,setQuizzes]=useState([])
  const quizResults = [
    { quizName: 'Quiz 1', numQuestions: 10, totalScore: 8 },
    { quizName: 'Quiz 2', numQuestions: 15, totalScore: 12 },
    { quizName: 'Quiz 3', numQuestions: 12, totalScore: 10 },
  ]

  // Calculate total average
  const totalAverage = (quizResults.reduce((acc, quiz) => acc + (quiz.totalScore / quiz.numQuestions), 0) / quizResults.length) * 100;

  useEffect(()=>{
    fetchMarkSheet()
  },[])
    const fetchMarkSheet=async()=>{
       try {
        const response=await axiosInstance.get('/loadMarkSheet')
       } catch (error) {
        console.log('error')
       }
    }
  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Quiz Marksheet</h1>

      {/* Table of Quiz Results */}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Quiz Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Number of Questions</th>
            <th className="py-2 px-4 border-b border-gray-300">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((quiz, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="py-2 px-4 border-b border-gray-300">{quiz.quizName}</td>
              <td className="py-2 px-4 border-b border-gray-300">{quiz.numQuestions}</td>
              <td className="py-2 px-4 border-b border-gray-300">{quiz.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Average */}
      <div className="mt-6">
        <p className="text-xl font-bold">Total Average: <span className="text-green-500">{totalAverage.toFixed(2)}%</span></p>
      </div>
    </div>
  );
}

export default MarkSheet;
