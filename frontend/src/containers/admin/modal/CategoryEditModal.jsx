import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
// import "./CategoryEditModal.css";

Modal.setAppElement("#root");

export default function CategoryEditModal({
  isOpen,
  onRequestClose,
  onEditCategory,
  categoryData, // Data of the category being edited
}) {
  const [formError, setFormError] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
 useEffect(()=>{
    console.log('categoryData',categoryData)
    if(categoryData[0]){
        setCategoryName(categoryData[0].categoryName)
    
        setSubCategories(categoryData[0].subCategories)
    }
    

 },[categoryData])
  
  const handleEditCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const updatedCategoryData = {
          _id:categoryData[0]._id,
          categoryName,
          subCategories,
        };
        const response = await onEditCategory(updatedCategoryData);

        if (response === null) {
          setFormError({});
          onRequestClose();
        }
      } catch (error) {
        console.log("Consoled error of axios:", error);
      }
    }
  };

  const handleAddCourseField = () => {
    setSubCategories([...subCategories, ""]);
  };

  const handleDeleteCourseField = (index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories.splice(index, 1);
    setSubCategories(updatedSubCategories);
  };

  const handleCourseChange = (index, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = value;
    setSubCategories(updatedSubCategories);
  };

  const validate = (categoryName,subCategories) => {
    const errors = {};

    if (!categoryName) {
      errors.categoryName = "Category name is required";
    } else if (categoryName.length < 3) {
      errors.categoryName = "Enter at least 3 characters";
    }
    if(subCategories.length==0){
        errors.subCategories='Atleast add one subCategory'
    }
    return errors;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Category Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes />
          </div>
        </div>
        <h2 style={{ marginTop: "20px", fontSize: 30 }}>Edit Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <span className="error-message">
          {formError?.categoryName ? formError.categoryName : ""}
        </span>
        <div>
          <h4>Subcategories</h4>
          {subCategories.map((subCategory, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Subcategory"
                value={subCategory}
                onChange={(e) => handleCourseChange(index, e.target.value)}
              />
              <span
                className="delete-icon"
                onClick={() => handleDeleteCourseField(index)}
              >
                <FaTimes />
              </span>
            </div>
          ))}
          <button onClick={handleAddCourseField} className="add-course-button">
            Add more
          </button>
        </div>
        <div className="buttonDiv">
          <button onClick={handleEditCategory} className="edit-button">
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
}
