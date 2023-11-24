import React from 'react';
import 'tailwindcss/tailwind.css'; // Assuming you have Tailwind CSS configured
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome

function LiveNavbar({ onNavItemClick }) {
  return (
    <nav className="bg-gray-100 p-4" style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('Scheduled Live')}
              >
                <span className="mr-2">
                  <i className="fas fa-calendar-alt"></i>
                </span>
                Scheduled Live
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('Ongoing')}
              >
                <span className="mr-2">
                  <i className="fas fa-play"></i>
                </span>
                Ongoing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-800 hover:text-purple-600 font-medium flex items-center"
                onClick={() => onNavItemClick('History')}
              >
                <span className="mr-2">
                  <i className="fas fa-history"></i>
                </span>
                History
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LiveNavbar;
