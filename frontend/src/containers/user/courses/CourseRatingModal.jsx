

import React, { useState } from 'react';
import Modal from 'react-modal';
import StarRating from './StarRating'; // Replace with your actual StarRating component

const CourseRatingModal = ({ isOpen, onClose, onSubmit }) => {
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleSubmit = () => {
    // Call the onSubmit callback with the selected user rating
    onSubmit(userRating);
  };

  return (
    <div
    className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px', // Adjust width as needed
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 9999, // Ensure it's above other elements
    }}
  >
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Course Rating Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div>
        <h2>Rate This Course</h2>
        <StarRating rating={userRating} onRatingChange={handleRatingChange} />
        <button onClick={handleSubmit}>Submit Rating</button>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
    </div>
  );
};

export default CourseRatingModal;
