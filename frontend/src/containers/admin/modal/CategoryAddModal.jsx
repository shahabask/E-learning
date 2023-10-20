import { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaImage } from 'react-icons/fa';
// import toast from 'react-toastify'
// import './CategoryAdd.css';
import './CategoryAdd.css'

Modal.setAppElement('#root');

export default function CategoryAddModal({
  isOpen,
  onRequestClose,
  onAddCategory,
  
  
}) {

  const [formError, setFormError] = useState({})
  // const [image,setImage]=useState(null)
  const [categoryName,setCategoryName]=useState('')
  // const handleImageUpload = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const errors = validate(categoryName);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        // formData.append("image", image);
        
//  console.log('img',formData.get("image"))
        const response = await onAddCategory(formData);

        if (response === null) {
          setCategoryName('');
          // setImage(null);
          setFormError({});
          onRequestClose();
          
        }
      } catch (error) {
        console.log('Consoled error of axios:', error);
      }
    }
  };

  const validate = (categoryName) =>{
    const errors={}
   
    if(!categoryName)  {
     errors.categoryName='category name is required'
    }else if(categoryName.length<3){
      errors.categoryName='Enter alteast 3 character'
    }
    // if(!image){
    //   errors.image='image is required'
    
    // }
    return errors
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
        <h2 style={{ marginTop: '20px', fontSize: 30 }}>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <span style={{ color: 'red' }}>{formError?.categoryName ? formError.categoryName : ''}</span>
        {/* <div className="file-input">
          <label htmlFor="file-upload" className="choose-file-button">
            <FaImage style={{ marginRight: '10px', height: '100px', width: '100px', color: '#808080' }} />
          </label>
          <input type="file"
           name="image" id="file-upload" accept="image/*" onChange={handleImageUpload} />
        </div>
        <span style={{ color: 'red' }}>{formError?.image ? formError.image : ''}</span> */}
        <button onClick={handleAddCategory} className="add-button">
          Add
        </button>
      </div>
    </Modal>
  );
}




