

// AdminSidebar.js
import { useState } from 'react';

import '../../Components/Sidebar/AdminSidebar.css';


import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import AdminHeader from '../Header/AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminLogout } from '../../slices/adminSlice/adminAuthSlice';


function AdminSidebar({ toggleSidebar }) {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
    toggleSidebar("admin");
  };
  
   const {adminInfo}=useSelector((state)=>state.adminAuth)
    
   const dispatch=useDispatch()
   
  const handleLogout = () => {
   dispatch(adminLogout())
  };
    
      return (
        <>
          <AdminHeader/>
      {adminInfo &&  <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''}`}>
            <div className="toggle-button" onClick={toggleIconsOnly}>
              {isIconsOnly ? '☰' : '✖'}
            </div>
            <ul>
            <Link to='/admin/home' style={{textDecoration:'none' ,color:'black'}}>    <li>
              <FaHome className="sidebar-icon" />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
              </li> </Link> 
              <Link to='/admin/home/userManagement' style={{textDecoration:'none' ,color:'black'}}>   <li>
               <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>User Management</span>
              </li> </Link>  
              <Link to='/admin/home/tutorManagement' style={{textDecoration:'none' ,color:'black'}}>  <li>
               <FaChalkboardTeacher className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Tutor Management</span>
              </li></Link>
              <Link to='/admin/home' style={{textDecoration:'none' ,color:'black'}}>  <li>
                <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
              </li> </Link> 
              <Link to='/admin/home' style={{textDecoration:'none' ,color:'black'}}> <li>
                 <FaMoneyBillAlt className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Subscription</span> 
              </li></Link> 
    
              {/* New li tags with corresponding icons */}
              <Link to='/admin/home' style={{textDecoration:'none' ,color:'black'}}>   <li>
                <FaChartBar className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Sales Report</span> 
              </li></Link> 
              <Link to='/admin/home' style={{textDecoration:'none' ,color:'black'}}>   <li>
                <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
              </li></Link> 
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