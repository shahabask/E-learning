import React, { useEffect, useState } from 'react';
import { FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import { axiosInstance } from '../../utils/tutorAxios';
import { toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars';
const ScheduledAssignments = () => {
 
  const scheduledAssignments1=[{
    name:'assignment 1',
    constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    endDate:'1-10-2023',
    subject:'physics'
  },
//   {
//     name:'assignment 1',
//     constraints:'this is assignment 1 this is assignment 1 this is assignment 1 this is assignment 1 this is assignment 1',
//     endDate:'1-10-2023',
//     subject:'physics'
//   },
  {
    name:'assignment 1',
    constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    endDate:'1-10-2023',
    subject:'physics'
  },
  {
    name:'assignment 1',
    constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    endDate:'1-10-2023',
    subject:'physics'
  },
  {
    name:'assignment 1',
    constraints:['this is assignment 1','this is assignment 1','this is assignment 1'],
    endDate:'1-10-2023',
    subject:'physics'
  }
]
  const [scheduledAssignments,setScheduledAssignments]=useState([])
   const [deleted,setDeleted]=useState(false)

  useEffect(()=>{
     fetchAssignments
  },[deleted])
  const fetchAssignments=async()=>{
    try {
      const status='started'
      const response =await axiosInstance.get(`/loadAssignments/${status}`)

      setScheduledAssignments(response.data.assignments)

    } catch (error) {
      console.log('error')
    }
  }
  const handleDeleteAssignmentClick=async(id)=>{
      try {
        
        const response =await axiosInstance.delete(`/deleteAssignment/${id}`)
       toast.success('successfully deleted') 
        setDeleted(!deleted)
      } catch (error) {
        toast.error('error in deletion')
      }
      
  }
  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
          onClick={() => console.log('Add Assignment')} // Replace with your logic
        >
          <FaPlus className="mr-2" />
          
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 px-5 text-center">Scheduled Assignments</h2>

      <div className="flex flex-wrap justify-center gap-4 px-5">
        {scheduledAssignments1?.map((scheduledAssignment, index) => (
          <div
            className="bg-purple-200 rounded-md overflow-hidden shadow-md w-64 max-w-xs cursor-pointer transition-transform duration-300 hover:scale-105"
            key={index}
          >
            <Scrollbars style={{ height: 220 }}>
              <div className="px-6 py-4 h-auto">
                <div className="font-bold text-xl mb-2">{scheduledAssignment?.name}</div>
                <p className="text-gray-600 text-sm mb-2">
                Constraints:
                <ul className="list-disc ml-6">
                  {scheduledAssignment?.constraints.map((constraint, constraintIndex) => (
                    <li key={constraintIndex}>{constraint}</li>
                  ))}
                </ul>
              </p>
                    <p className="text-gray-600 text-sm mb-2">Subject: {scheduledAssignment?.subject}</p>

                <p className="text-gray-600 text-sm mb-2">End Date: {scheduledAssignment?.endDate}</p>
              </div>
            </Scrollbars>
            <div className="flex justify-end px-6 pb-4">
              <button
                className="bg-red-400 text-white px-2 py-1 rounded-full flex items-center hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteAssignmentClick(scheduledAssignment?._id)}
              >
                <FaTrash className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledAssignments;
