

import React from 'react';

function AssignmentNavbar({ onNavItemClick }) {
  return (
    <nav className="bg-gray-100 p-4" style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <button
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('Scheduled Assignments')}
              >
                <span className="mr-2">
                  {/* Add your icon or any other visual indicator here */}
                  {/* Example with an icon from FontAwesome */}
                  <i className="fas fa-calendar-alt"></i>
                </span>
                Scheduled Assignments
              </button>
            </li>
            <li>
              <button
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('History')}
              >
                <span className="mr-2">
                  {/* Add your icon or any other visual indicator here */}
                  {/* Example with an icon from FontAwesome */}
                  <i className="fas fa-history"></i>
                </span>
                History
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AssignmentNavbar;
