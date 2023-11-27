import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';

const assignments = [
  { id: 1, name: 'Assignment 1', details: 'Details for Assignment 1' ,endDate:'01-01-2024'},
  { id: 2, name: 'Assignment 2', details: 'Details for Assignment 2' ,endDate:'02-01-2024'},
  // Add more assignments as needed
];

function Assignment() {
  const [selectedAssignment, setSelectedAssignment] = useState(assignments[0]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAssignmentChange = (event) => {
    const assignmentId = parseInt(event.target.value, 10);
    const selected = assignments.find((assignment) => assignment.id === assignmentId);
    setSelectedAssignment(selected);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async() => {
    // Add your submission logic here, e.g., send the file to a server

    if (selectedFile) {

     const response=await axiosInstance.post('/submitAssignment',{...selectedAssignment,selectedFile}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(`Submitting ${selectedAssignment.name}: ${selectedFile.name}`);
      // Add your logic to handle the file submission for the selected assignment
    } else {
      console.error('No file selected for submission');
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-8 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-6">Assignment Submission</h2>
      {assignments.length > 0 ? (
       <div className='flex'>
        <div>
       <div className="mb-6">
         <label htmlFor="assignmentSelect" className="block text-sm font-medium text-gray-600 mb-2">
           Select Assignment:
         </label>
         <select
           id="assignmentSelect"
           onChange={handleAssignmentChange}
           value={selectedAssignment.id}
           className="w-full md:w-96 p-2 border rounded-md"
         >
           {assignments.map((assignment) => (
             <option key={assignment.id} value={assignment.id}>
               {assignment.name}
             </option>
           ))}
         </select>
       </div>
    
       <div className="mb-6">
         <label htmlFor="fileInput" className="block text-sm font-medium text-gray-600 mb-2">
           Select PDF File:
         </label>
         <input
           type="file"
           id="fileInput"
           accept=".pdf"
           onChange={handleFileChange}
           className="w-full md:w-96 p-2 border rounded-md"
         />
       </div>
      
     
       
       <button
         onClick={handleSubmit}
         className="w-full md:w-48 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300 ease-in-out"
       >
         Submit Assignment
       </button>
       </div>
       <div className='flex'>
  <div className="mb-6 ml-12 pl-5">
    {selectedAssignment.endDate && (
      <p className="text-xl text-gray-700 mb-10 px-5 font-semibold">
        Assignment End Date: <span className='text-gray-700 font-bold'>{selectedAssignment.endDate}</span>
      </p>
    )}
  </div>
</div>

     </div>
     
      
      ) : (
        <p className="text-gray-600">No assignments available for submission.</p>
      )}
    </div>
  );
}

export default Assignment;
