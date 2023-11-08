

// AdminSidebar.js
import { useState } from 'react';

import '../../Components/Sidebar/AdminSidebar.css';
import { NavLink } from 'react-router-dom'

import { FaHome, FaUser, FaChalkboardTeacher, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope,  FaSignOutAlt } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md'

import AdminHeader from '../Header/AdminHeader';
import { useDispatch, useSelector } from 'react-redux';
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
            <NavLink to='/admin' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>    <li>
              <FaHome className="sidebar-icon" />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
              </li> </NavLink> 
              <NavLink to='/admin/userManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>   <li>
               <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>User Management</span>
              </li> </NavLink>  
              <NavLink to='/admin/tutorManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>  <li>
               <FaChalkboardTeacher className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Tutor Management</span>
              </li></NavLink>
              <NavLink to='/admin/courseManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> <li>
                
                <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Courses</span>
              </li> </NavLink> 
              <NavLink to='/admin/categoryManagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
  <li>
    <MdCategory className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
    <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Category Management</span>
  </li>
</NavLink>
              <NavLink to='/admin/subscription' className="active-link" style={{ textDecoration: 'none', color: 'black' }}> <li>
                 <FaMoneyBillAlt className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Subscription</span> 
              </li></NavLink> 
    
              {/* New li tags with corresponding icons */}
              <NavLink to='/admin' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>   <li>
                <FaChartBar className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Sales Report</span> 
              </li></NavLink> 
              <NavLink to='/admin' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>   <li>
                <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
                <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
              </li></NavLink> 
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