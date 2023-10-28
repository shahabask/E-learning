import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes, FaImage, FaTrash } from "react-icons/fa"; // Import the trash icon
import "./CategoryAdd.css";

Modal.setAppElement("#root");

export default function CategoryAddModal({
  isOpen,
  onRequestClose,
  onAddCategory,
}) {
  const [formError, setFormError] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const categoryData = {
          categoryName,
          subCategories,
          image: selectedImage,
        };
        const response = await onAddCategory(categoryData);

        if (response === null) {
          setCategoryName("");
          setSubCategories([""]);
          setFormError({});
          setSelectedImage(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const validate = (categoryName) => {
    const errors = {};

    if (!categoryName) {
      errors.categoryName = "Category name is required";
    } else if (categoryName.length < 3) {
      errors.categoryName = "Enter at least 3 characters";
    }

    return errors;
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
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes />
          </div>
        </div>
        <h2 style={{ marginTop: "20px", fontSize: 30 }}>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <span className="error-message">
          {formError?.categoryName ? formError.categoryName : ""}
        </span>

        {/* Image input with an icon */}
      
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


        {/* Section for adding subCategories */}
        <div>
          <h4>Subcategories</h4>
          {subCategories.map((course, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Subcategory"
                value={course}
                onChange={(e) => handleCourseChange(index, e.target.value)}
              />
              <span
                className="delete-icon"
                onClick={() => handleDeleteCourseField(index)}
              >
                <FaTrash />
              </span>
            </div>
          ))}
          <button onClick={handleAddCourseField} className="add-course-button">
            Add more
          </button>
        </div>

        <div className="buttonDiv">
          <button onClick={handleAddCategory} className="add-button">
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}
