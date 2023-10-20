import { DataGrid } from '@mui/x-data-grid';
import {  FaEdit, FaBan, FaLock, FaUnlock } from 'react-icons/fa'
import './UserManagement.css'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';

import CategoryAddModal from './modal/CategoryAddModal';
import { toast } from 'react-toastify';


export default function CategoryManagement() {

    const ImageCellRenderer = ({ value }) => (
        <img src={value} alt="Category Image" style={{ width: '100%', height: 'auto' }} />
      );

  const columns = [
    {field: 'index',headerName: 'Index',width: 20,},
    { field: 'categoryName', headerName: 'Category', width: 130},
    { field: 'image', headerName: 'Image', width: 130, renderCell: ImageCellRenderer },
    
    {
      field: 'update',
      headerName: 'Update',
      width: 130,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button-active' }`} onClick={(e) => handleEditClick(e,params.row._id)}>
          {<FaEdit size={18} />}
        </button>
      )},
    },
    { field: 'isBlocked', headerName: 'Active', width: 130 ,renderCell: (params) => (
      <div className={`pill ${params.row.isBlocked ? 'inactive' : 'active'}`}>
      {params.row.isBlocked ? 'Inactive' : 'Active'}
    </div>
    ),},
    {
      field: 'action',
      headerName: 'Action',
      width: 130,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button${params.row.isBlocked ?'-inactive':'-active' }`} onClick={(e) => handleBlockClick(e,params.row._id,params.row.isBlocked)}>
          {params.row.isBlocked ?<FaLock size={18} /> :  <FaUnlock size={18} /> }
        </button>
      )},
    },
   
    // {
    //   field: 'details',
    //   headerName: 'Details',
    //   width: 100,
    //   renderCell: (params) => (
    //     <button className="button-pill" onClick={(e) => handleDetailsClick(e,params.row)}>
    //       View
    //     </button>
    //   ),
    // },
    
   
  
  
  ];
 const [edited,setEdited]=useState(false)
 const [added,setAdded]=useState(false)


 const handleBlockClick=async(e,categoryId)=>{
   try {
    console.log(e,categoryId)
    const res=await axiosInstance.post('/blockCategory') 
    
  } catch (error) {
    console.log(error)
  }
 }
  const handleEditClick = async (e, categoryId) => {
    
    try {
          
         const response=await axiosInstance.post('/editCategory',{categoryId})
          setEdited(!edited) 
  
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };
  useEffect(() => {


    fetchData();
    // setBlocked(!blocked)
  }, [edited,added])
//   const handleDetailsClick = (e, row) => {
//     e.stopPropagation();
//     const userId = row._id;
//     setModalDetails(row.details);
//     setOpenModals((prevOpenModals) => ({
//       ...prevOpenModals,
//       [userId]: true,
//     }));
//   };

const handleAddCategory = async (formData) => {
  try {
    const response = await axiosInstance.post('/addCategory', formData);
    if (response.data === 'category added successfully') {
      toast.success('category added successfully')
      setAdded(!added)
      return null;
    }
    toast.error(response.data)
    return response.data; // You can return any message from the server
  } catch (error) {
    toast.error(error?.response?.data||error.error)
    
    return 'An error occurred during category addition'; // Handle server error
  }
};
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/loadCategory');
        const categoryWithIndex = res.data.category.map((category, index) => ({
            ...category,
            Index: index + 1,
          }));
          setRows([...categoryWithIndex]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    const [rows,setRows]=useState([])
  

    const [isAddModalOpen, setAddModalOpen] = useState(false);
   

      
//         e.preventDefault();
//        SetFormError(validate(categoryName,image)) 
//       console.log('Adding category:', categoryName);
//       console.log('Image:', image);
//    const checkError=validate(categoryName,image)
//  try {
//   if(Object.keys(checkError).length==0){
//     const formData = new FormData();
//             formData.append("categoryName", categoryName);
//             formData.append("image", image);
//             setAddModalOpen(false);
//     const res=await axiosInstance.post('/addCategory',formData)
   
//    return null
//   }else{
//      return formError
//   }
//  } catch (error) {
//     console.log('consoled error of axios',error)
//  }
   
      // Close the modal after adding the category
    //  
    // };
    
    return (
      <div className="data-grid-container">
        <button onClick={() => setAddModalOpen(true)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2">
          Add Category
        </button>
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id} pageSizeOptions={[5, 10]} checkboxSelection />
        <CategoryAddModal isOpen={isAddModalOpen} onRequestClose={() => setAddModalOpen(false)} onAddCategory={handleAddCategory} />
      </div>
    );
}