import React from 'react';

function QuizHistory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">History</h2>
      <div className="flex space-x-4">
        <div className="bg-white rounded-xl overflow-hidden shadow-md w-1/3">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Quiz History 1</div>
            <p className="text-gray-600 text-sm mb-2">Score: 90%</p>
            <p className="text-gray-600 text-sm mb-2">Date: January 1, 2023</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Review Quiz</button>
          </div>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-md w-1/3">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Quiz History 2</div>
            <p className="text-gray-600 text-sm mb-2">Score: 90%</p>
            <p className="text-gray-600 text-sm mb-2">Date: January 1, 2023</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Review Quiz</button>
          </div>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-md w-1/3">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Quiz History 2</div>
            <p className="text-gray-600 text-sm mb-2">Score: 90%</p>
            <p className="text-gray-600 text-sm mb-2">Date: January 1, 2023</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Review Quiz</button>
          </div>
        </div>
      </div>
      {/* Add more cards for other quiz histories */}
    </div>
  );
}

export default QuizHistory;
