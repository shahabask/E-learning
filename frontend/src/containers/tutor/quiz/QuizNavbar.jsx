import React from 'react';

function QuizNavbar({ onNavItemClick }) {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-black"
                onClick={() => onNavItemClick('Scheduled Quizzes')}
              >
                Scheduled Quizzes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black"
                onClick={() => onNavItemClick('Question Bank')}
              >
                Question Bank
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black"
                onClick={() => onNavItemClick('History')}
              >
                History
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default QuizNavbar;
