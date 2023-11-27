import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

function MarkSheet() {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const quizResults = [
    { quizName: 'Quiz 1', numQuestions: 10, totalScore: 8 },
    { quizName: 'Quiz 2', numQuestions: 15, totalScore: 12 },
    { quizName: 'Quiz 3', numQuestions: 12, totalScore: 10 },
  ];

  const assignmentResults = [
    { assignmentName: 'Assignment 1', totalScore: 90 },
    { assignmentName: 'Assignment 2', totalScore: 85 },
    { assignmentName: 'Assignment 3', totalScore: 92 },
  ];

  // Calculate total average for quizzes
  const quizAverage =
    (quizResults.reduce((acc, quiz) => acc + (quiz.totalScore / quiz.numQuestions), 0) / quizResults.length) * 100;

  // Calculate total average for assignments
  const assignmentAverage = (assignmentResults.reduce((acc, assignment) => acc + assignment.totalScore, 0) / assignmentResults.length);

  // Calculate total average for both quizzes and assignments
  const totalAverage = ((quizAverage + assignmentAverage) / 2).toFixed(2);

  useEffect(() => {
    fetchMarkSheet();
  }, []);

  const fetchMarkSheet = async () => {
    try {
      // Fetch quiz and assignment data from the server using axios
      const quizResponse = await axiosInstance.get('/loadQuizResults');
      const assignmentResponse = await axiosInstance.get('/loadAssignmentResults');

      setQuizzes(quizResponse.data);
      setAssignments(assignmentResponse.data);
    } catch (error) {
      console.error('Error fetching mark sheet data:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Mark Sheet</h1>


  {/* Table of Assignment Results */}
  <table className="min-w-full bg-white mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4">Assignment Name</th>
            <th className="py-2 px-4">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {assignmentResults.map((assignment, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : ''}>
              <td className="py-2 px-4">{assignment.assignmentName}</td>
              <td className="py-2 px-4">{assignment.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Table of Quiz Results */}
      <table className="min-w-full bg-white  mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 ">Quiz Name</th>
            <th className="py-2 px-4">Number of Questions</th>
            <th className="py-2 px-4">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {quizResults.map((quiz, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-purple-100' : ''}>
              <td className="py-2 px-4">{quiz.quizName}</td>
              <td className="py-2 px-4">{quiz.numQuestions}</td>
              <td className="py-2 px-4">{quiz.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
 
      {/* Total Averages */}
      <div className="mt-6 flex mx-5 pl-5">
        <p className="text-xl font-bold pr-5">Quiz Average: <span className="text-green-500">{quizAverage.toFixed(2)}%</span></p>
        <p className="text-xl font-bold pr-5">Assignment Average: <span className="text-green-500">{assignmentAverage.toFixed(2)}%</span></p>
        <p className="text-xl font-bold">Total Average: <span className="text-green-500">{totalAverage}%</span></p>
      </div>
    </div>
  );
}

export default MarkSheet;
