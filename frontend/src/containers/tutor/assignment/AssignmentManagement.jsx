import { useState } from "react";
import AssignmentHistory from "./AssignmentHistory";
import AssignmentNavbar from "./AssignmentNavbar";
import ScheduledAssignments from "./ScheduledAssignment";


function AssignmentManagement() {
    const [selectedNavItem, setSelectedNavItem] = useState('Scheduled Assignments');
  
    const handleNavItemClick = (itemName) => {
      setSelectedNavItem(itemName);
    };
  
    return (
      <>
        <AssignmentNavbar onNavItemClick={handleNavItemClick} />
        <div className="" style={{ height: "100vh", backgroundColor: 'rgba(224, 176, 255, 0.2)'}}>
          {selectedNavItem === 'Scheduled Assignments' && <ScheduledAssignments />}
          {selectedNavItem === 'History' && <AssignmentHistory />}
        </div>
      </>
    );
  }

  export default AssignmentManagement