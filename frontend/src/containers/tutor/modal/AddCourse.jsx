import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaImage, FaTimes, FaTrash } from 'react-icons/fa';
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
  const [selectedImage, setSelectedImage] = useState(null);
   
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
       console.log('printImg',selectedImage)
       formData.append('image',selectedImage)
       
      const response = await onAddCourse(formData);

      if (response === null) {
        setSelectedCategory('');
        setSelectedSubCategory('')
        setCourse('');
        setDescription('');
        setSelectedImage(null);
        onRequestClose();
      }
    } catch (error) {
      console.log('Consoled error of axios:', error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
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
        <div className="image-input">
  {selectedImage ? (
    <div className="image-preview-container">
      <img
        src={URL.createObjectURL(selectedImage)}
        alt="Selected Image"
        className="image-preview"
      />
      <div className="remove-image" onClick={handleRemoveImage}>
        <FaTrash />
      </div>
    </div>
  ) : (
    <>
      <label htmlFor="categoryImage" className="image-label">
        <FaImage />
        {/* The following input is hidden */}
        <input
          type="file"
          id="categoryImage"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />+ Add image
      </label>
    </>
  )}
</div>

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
