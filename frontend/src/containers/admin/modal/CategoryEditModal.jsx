import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimes, FaImage, FaTrash } from "react-icons/fa";

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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (categoryData[0]) {
      setCategoryName(categoryData[0].categoryName);
      setSubCategories(categoryData[0].subCategories);
      setSelectedImage(modifiedImagePath)
     
    }
  }, [categoryData]);

  const handleEditCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName, subCategories,selectedImage);
    setFormError(errors);
    const imageFileName = selectedImage instanceof File ? selectedImage: selectedImage.replace("http://localhost:5000/images/", "")
    if (Object.keys(errors).length === 0) {
      try {
        const updatedCategoryData = {
          _id: categoryData[0]._id,
          categoryName,
          subCategories,
          image:imageFileName,
        };
        const response = await onEditCategory(updatedCategoryData);

        if (response === null) {
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

  const validate = (categoryName, subCategories,image) => {
    const errors = {};

    if (!categoryName) {
      errors.categoryName = "Category name is required";
    } else if (categoryName.length < 3) {
      errors.categoryName = "Enter at least 3 characters";
    }
    if (subCategories.length === 0) {
      errors.subCategories = "At least add one subCategory";
    }
    if(!image){
      errors.image='Image is required'
    }
    return errors;
  };
  const imagePath = categoryData[0]?.image
  // const correctPath=`${imagePath.replace(/^backend\/public\//, '')}`

    const modifiedImagePath = imagePath
    ? `http://localhost:5000/${imagePath.replace(/\\/g, '/').replace(/^backend\/public\//, '')}`
    : '';
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

        {/* Image input with an icon */}
        <div className="image-input">
          {selectedImage ? (
            <div className="image-preview-container">
              {imagePath ? ( // Display category image if available
        <img src={modifiedImagePath} alt="Category Image" className="image-preview"/>
      ) : ( // Display the selected image if no category image is available
        <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="image-preview"/>
      )}
              <div className="remove-image" onClick={handleRemoveImage}>
                <FaTrash />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="categoryImage" className="image-label">
                <FaImage />
                <input
                  type="file"
                  id="categoryImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </>
          )}
        </div>

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
                <FaTrash />
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
