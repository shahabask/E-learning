import { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

import "./CategoryAdd.css";

Modal.setAppElement("#root");

export default function CategoryAddModal({
  isOpen,
  onRequestClose,
  onAddCategory,
}) {
  const [formError, setFormError] = useState({});
  // const [image,setImage]=useState(null)
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const categoryData = {
          categoryName,
          subCategories,
        };
        const response = await onAddCategory(categoryData);

        if (response === null) {
          setCategoryName("");
          setSubCategories([""]);
          setFormError({});
          onRequestClose();
        }
      } catch (error) {
        console.log("Consoled error of axios:", error);
      }
    }
  };

  const handleAddCourseField = () => {
    setSubCategories([...subCategories, ""]); // Add a new empty course field
  };
  const handleDeleteCourseField = (index) => {
    const updatedsubCategories = [...subCategories];
    updatedsubCategories.splice(index, 1); // Remove the course at the specified index
    setSubCategories(updatedsubCategories);
  };
  const handleCourseChange = (index, value) => {
    const updatedsubCategories = [...subCategories];
    updatedsubCategories[index] = value;
    setSubCategories(updatedsubCategories);
  };
  const validate = (categoryName) => {
    const errors = {};

    if (!categoryName) {
      errors.categoryName = "category name is required";
    } else if (categoryName.length < 3) {
      errors.categoryName = "Enter alteast 3 character";
    }
    // if(!image){
    //   errors.image='image is required'

    // }
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
                <FaTimes />
              </span>
            </div>
          ))}
          <button onClick={handleAddCourseField} className="add-course-button">
            Add more 
          </button>
        </div>
        {/* End of subCategories section */}
        <div className="buttonDiv">
          <button onClick={handleAddCategory} className="add-button">
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}
