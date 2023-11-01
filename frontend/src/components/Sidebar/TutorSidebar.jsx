import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import { RiLiveLine } from 'react-icons/ri';
import { GrSchedulePlay } from 'react-icons/gr';

import  { useState } from 'react';
import '../../Components/Sidebar/TutorSidebar.css';
import TutorHeader from '../Header/TutorHeader';
import { useDispatch, useSelector } from 'react-redux';
import { TutorLogout } from '../../slices/tutorSlice/tutorAuthSlice';
import { NavLink } from 'react-router-dom';



function TutorSidebar({ toggleSidebar }) {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
    toggleSidebar("tutor");
  };
  const dispatch=useDispatch()
  const {tutorInfo}=useSelector((state)=>state.tutorAuth)
  const handleLogout = () => {
    dispatch(TutorLogout())
   };
  
  return (
    <>
     <TutorHeader />
    {tutorInfo && <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? '☰' : '✖'}
        </div>
        <ul>
        <NavLink to='/tutor' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> <li>
            <FaHome className="sidebar-icon" />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
          </li></NavLink> 
          <NavLink to='/tutor/liveClasses' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> <li>
            <RiLiveLine className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Live class</span>
          </li></NavLink> 
          <NavLink to='/tutor/schedule' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  <li>
            <GrSchedulePlay className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Shedules</span>
          </li></NavLink> 
          <NavLink to='/tutor/courseManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  <li>
            <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Course Management</span>
          </li></NavLink> 
          {/* <NavLink to='/tutor/message' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  <li>
            <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
          </li></NavLink>  */}
          <NavLink to='/tutor/profile' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
  <li>
    <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
    <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Profile</span>
  </li>
</NavLink>
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