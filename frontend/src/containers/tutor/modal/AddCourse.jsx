import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { axiosInstance } from '../../utils/adminAxios';

Modal.setAppElement('#root');

export default function AddCourse({
  isOpen,
  onRequestClose,
  onAddCourse,
  categories,
  subCategories,
 
}) {
  // const [formError, setFormError] = useState({});
//   const [categoryName, setCategoryName] = useState('');
  const [course, setCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory,setSelectedSubCategory]=useState('')
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryError,setSubCategoryError]=useState('')
  const [courseError, setCourseError] = useState('');

  
   

  


  

  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setCategoryError('');
    setSubCategoryError('');
    setCourseError('');

    // Validate selections
    if (!selectedCategory) {
      setCategoryError('Category is required');
      return;
    }
    if (!course) {
      setCourseError('Course is required');
      return;
    }
  if(!selectedSubCategory){
    setSubCategoryError('subCategory is required')
    return; 
  }

    // If all selections are valid, proceed to add the course
    try {
      const formData = new FormData();
      formData.append('course', course);
      formData.append('subCategory',selectedSubCategory)
      formData.append('category', selectedCategory);


      const response = await onAddCourse(formData);

      if (response === null) {
        setSelectedCategory('');
        setSelectedSubCategory('')
        setCourse('');
        onRequestClose();
      }
    } catch (error) {
      console.log('Consoled error of axios:', error);
    }
  };

 

 return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Add Category Modal"
    className="custom-modal"
    overlayClassName="custom-overlay"
  >
    <div className="modal-content">
      <div className="close-icon" onClick={onRequestClose}>
        <FaTimes />
      </div>
      <h2>Add Course</h2>
      <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <span style={{ color: 'red' }} className="error-message">{categoryError}</span>
        <select
          value={selectedSubCategory}
          onChange={(e) => setSelectedSubCategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {subCategories && subCategories.map((subCategory,index) => (
            <option key={index} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
        <span style={{ color: 'red' }} className="error-message">{subCategoryError}</span>
        <input
  type="text"
  placeholder="Enter Course Name"
  value={course}
  onChange={(e) => setCourse(e.target.value)}
/>
        <span style={{ color: 'red' }} className="error-message">{courseError}</span>
       
       
      <button onClick={handleAddCourse} className="add-button-modal">
        Add
      </button>
    </div>
  </Modal>
);

}
