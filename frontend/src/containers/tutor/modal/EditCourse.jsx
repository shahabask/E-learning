import { useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function EditCourse({
    isOpen,
    onRequestClose,
    onEditCourse,
    courseData,
  }) {
    const [course, setCourse] = useState(courseData.course);
    const [description, setDescription] = useState(courseData.description);
    
    // ...
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Edit Course Modal"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          {/* Display Category and SubCategory */}
          <div>
            <label>Category: {courseData.categoryName}</label>
            <label>SubCategory: {courseData.subCategory}</label>
          </div>
          {/* Editable Fields */}
          <input
            type="text"
            placeholder="Edit Course Name"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <input
            type="text"
            placeholder="Edit Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {/* Buttons for Save and Cancel */}
          <button onClick={() => onEditCourse(course, description)}>Save</button>
          <button onClick={onRequestClose}>Cancel</button>
        </div>
      </Modal>
    );
  }
  