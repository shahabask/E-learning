import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const VerifyAssignment = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [assignmentType, setAssignmentType] = useState(null);
  const [selectedAssignmentTitle, setSelectedAssignmentTitle] = useState('');
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0); // Add a key for dynamic remounting

  const students = ['Student1', 'Student2', 'Student3'];
  const assignmentTypes = ['Corrected', 'Not Corrected'];
  const assignments = [
    { id: 1, title: 'Assignment 1', pdfUrl: '/path/to/pdf1.pdf', isCorrected: true, score: 80, outOf: 100, student: { name: 'Student1', rollNumber: '123' } },
    { id: 2, title: 'Assignment 2', pdfUrl: '/path/to/pdf2.pdf', isCorrected: false, score: null, outOf: 100, student: { name: 'Student2', rollNumber: '456' } },
  ];

  const selectedAssignment = assignments.find(a => a.title === selectedAssignmentTitle);

  const handleScoreChange = (value) => {
    setScore((prevScore) => Math.max(0, Math.min(prevScore + value, selectedAssignment?.outOf || 100)));
  };

  const handleRefresh = () => {
    setSelectedStudent(null);
    setAssignmentType(null);
    setSelectedAssignmentTitle('');
    setScore(0);
    setKey((prevKey) => prevKey + 1); // Increment the key for remounting
  };

  return (
    <div key={key} className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Verify Assignment</h2>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <label htmlFor="studentDropdown" className="text-lg">Select Student:</label>
          <select
            id="studentDropdown"
            onChange={(e) => setSelectedStudent(e.target.value)}
            value={selectedStudent}
            className="border p-2 rounded-md"
          >
            <option value="" disabled>Select Student</option>
            {students.map((student) => (
              <option key={student} value={student}>{student}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <label htmlFor="assignmentTypeDropdown" className="text-lg">Select Assignment Type:</label>
          <select
            id="assignmentTypeDropdown"
            onChange={(e) => setAssignmentType(e.target.value)}
            value={assignmentType}
            className="border p-2 rounded-md"
          >
            <option value="" disabled>Select Assignment Type</option>
            {assignmentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {selectedStudent && assignmentType && (
          <div className="flex space-x-4">
            <label htmlFor="assignmentTitleDropdown" className="text-lg">Select Assignment Title:</label>
            <select
              id="assignmentTitleDropdown"
              onChange={(e) => setSelectedAssignmentTitle(e.target.value)}
              value={selectedAssignmentTitle}
              className="border p-2 rounded-md"
            >
              <option value="" disabled>Select Assignment Title</option>
              {assignments
                .filter(a => a.student.name === selectedStudent && (assignmentType === 'Corrected' ? a.isCorrected : !a.isCorrected))
                .map((assignment) => (
                  <option key={assignment.title} value={assignment.title}>{assignment.title}</option>
                ))}
            </select>
          </div>
        )}
      </div>

      {selectedAssignment && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">{selectedAssignment.title}</h3>

          <p>Submitted by: {selectedAssignment.student.name} ({selectedAssignment.student.rollNumber})</p>

          {selectedAssignment.isCorrected ? (
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-32 h-16">
                <div className="absolute top-0 w-full h-1/2 bg-green-500 flex justify-center items-end">
                  <div className="text-white">{selectedAssignment.score}</div>
                </div>
                <div className="absolute bottom-0 w-full h-1/2 bg-gray-300 flex justify-center items-start">
                  <div className="text-gray-500">{selectedAssignment.outOf}</div>
                </div>
              </div>

              <div className="mt-8 bg-white p-4 rounded-md shadow-md">
                {/* Improved PDF display */}
                <iframe title="PDF Viewer" src={selectedAssignment.pdfUrl} width="100%" height="500px"></iframe>
              </div>
            </div>
          ) : (
            <div className="mt-8 bg-white p-4 rounded-md shadow-md">
              {/* Display PDF */}
              <iframe title="PDF Viewer" src={selectedAssignment.pdfUrl} width="100%" height="500px"></iframe>

              <div className="flex flex-col space-y-4 mt-4">
                <label htmlFor="scoreField" className="text-lg">Score:</label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleScoreChange(-1)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    <FaMinus />
                  </button>
                  <span id="scoreField" className="border p-2 rounded-md">{score}</span>
                  <button
                    onClick={() => handleScoreChange(1)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-4 mt-4">
                <label htmlFor="manualScoreField" className="text-lg">Manual Score:</label>
                <input
                  type="number"
                  id="manualScoreField"
                  value={score}
                  onChange={(e) => setScore(Math.max(0, Math.min(parseInt(e.target.value) || 0, selectedAssignment.outOf || 100)))}
                  className="border p-2 rounded-md"
                />
              </div>

              <div className="mt-4">
                <button
                  onClick={() => console.log('Submit Mark')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit Mark
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyAssignment;
