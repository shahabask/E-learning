

// AdminSidebar.js
import { useState } from 'react';

import '../../Components/Sidebar/AdminSidebar.css';


import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import AdminHeader from '../Header/AdminHeader';
import { useSelector } from 'react-redux';

function AdminSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };
  
   const {adminInfo}=useSelector((state)=>state.adminAuth)
 
  const handleLogout = () => {
    // Add logic for logging out
    console.log('Logout clicked');
  };
    
      return (
        <>
          <AdminHeader />
      {adminInfo &&  <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
            <div className="toggle-button" onClick={toggleIconsOnly}>
              {isIconsOnly ? '☰' : '✖'}
            </div>
            <ul>
              <li>
                <FaHome className="sidebar-icon" />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
              </li>
              <li>
                <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>User Management</span>
              </li>
              <li>
                <FaChalkboardTeacher className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Tutor Management</span>
              </li>
              <li>
                <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
              </li>
              <li>
                <FaMoneyBillAlt className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Subscription</span>
              </li>
    
              {/* New li tags with corresponding icons */}
              <li>
                <FaChartBar className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Sales Report</span>
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

export default AdminSidebar;