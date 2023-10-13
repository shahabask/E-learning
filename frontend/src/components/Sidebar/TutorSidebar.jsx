import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';
import { GrSchedulePlay } from 'react-icons/gr';

import  { useState } from 'react';
import '../../Components/Sidebar/TutorSidebar.css';
import TutorHeader from '../Header/TutorHeader';
import { useSelector } from 'react-redux';



function TutorSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };
  
  const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  const handleLogout = () => {
    // Add logic for logging out
    console.log('Logout clicked');
  };
  
  return (
    <>
     <TutorHeader />
    {tutorInfo && <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? '☰' : '✖'}
        </div>
        <ul>
          <li>
            <FaHome className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
          </li>
          <li>
            <RiLiveLine className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Live class</span>
          </li>
          <li>
            <GrSchedulePlay className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Shedules</span>
          </li>
          <li>
            <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
          </li>
          <li>
            <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
          </li>
          <li className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Logout</span>
          </li>
        </ul>
      </aside> } 
    </>
  );
}

export default TutorSidebar