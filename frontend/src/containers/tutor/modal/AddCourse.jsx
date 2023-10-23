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
 
 
}) {
  // const [formError, setFormError] = useState({});
  const [categoryName, setCategoryName] = useState([]);
 const [subCategories,setSubCategories]=useState([])
  const [course, setCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory,setSelectedSubCategory]=useState('')
  const [description,setDescription]=useState('')
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryError,setSubCategoryError]=useState('')
  const [courseError, setCourseError] = useState('');
  const [descriptionError,setDescriptionError]=useState('')
  
   
useEffect(()=>{
  
    const categoryNames = categories.map((category) => category.categoryName);
    setCategoryName(categoryNames);
    //  console.log('categoryNamesModal',categoryName)
 

},[categories])
  
useEffect(()=>{
  if(selectedCategory){
   setSubCategories( categories
  .filter((category) => category.categoryName === selectedCategory)
  .map((category) => category.subCategories)); 
    
  }
},[selectedCategory])

  

  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setCategoryError('');
    setSubCategoryError('');
    setCourseError('');
    setDescriptionError('')

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
 
  if(!description){
    setDescriptionError('Description is required')
    return;
  }
    // If all selections are valid, proceed to add the course
    try {
      const formData = new FormData();
      formData.append('course', course);
      formData.append('subCategory',selectedSubCategory)
      formData.append('category', selectedCategory);
       formData.append('description',description)

      const response = await onAddCourse(formData);

      if (response === null) {
        setSelectedCategory('');
        setSelectedSubCategory('')
        setCourse('');
        setDescription('');
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
          {categoryName && categoryName.map((categoryName,index) => (
            <option key={index} value={categoryName}>
              {categoryName}
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
       
        <input
  type="text"
  placeholder="Enter Course Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
        <span style={{ color: 'red' }} className="error-message">{descriptionError}</span>
      <button onClick={handleAddCourse} className="add-button-modal">
        Add
      </button>
    </div>
  </Modal>
);

}
