import { DataGrid } from '@mui/x-data-grid';
import {  FaEdit, FaBan, FaLock, FaUnlock } from 'react-icons/fa'
import './UserManagement.css'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';

import CategoryAddModal from './modal/CategoryAddModal';
import { toast } from 'react-toastify';
import CategoryEditModal from './modal/CategoryEditModal';


export default function CategoryManagement() {

    const ImageCellRenderer = ({ value }) => (
        <img src={value} alt="Category Image" style={{ width: '100%', height: 'auto' }} />
      );

  const columns = [
    {field: 'Index',headerName: 'Index',width: 20,},
    { field: 'categoryName', headerName: 'Category', width: 130},
    { field: 'image', headerName: 'Image', width: 130, renderCell: ImageCellRenderer },
    {field: 'subCategories', headerName: 'SubCategories', width: 130},
    {
      field: 'edit',
      headerName: 'Edit',
      width: 130,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button-active' }`} onClick={(e) => openEditModal(e,params.row.categoryName)}>
          {<FaEdit size={18} />}
        </button>
      )},
    },
    { field: 'active', headerName: 'Status', width: 130 ,renderCell: (params) => (
      <div className={`pill ${params.row.active ? 'active' :'inactive'}`}>
      {params.row.active ? 'Active' : 'Inactive'}
    </div>
    ),},
    {
      field: 'action',
      headerName: 'Action',
      width: 130,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button${params.row.active ?'-active' :'-inactive'}`} onClick={(e) => handleBlockClick(e,params.row._id,params.row.active)}>
          {params.row.active ?<FaLock size={18} /> : <FaUnlock size={18}  />  }
        </button>
      )},
    },
   

    
   
  
  
  ];
 const [edited,setEdited]=useState(false)
 const [added,setAdded]=useState(false)
 const [isEditModalOpen, setEditModalOpen] = useState(false);
 const [categoryData, setCategoryData] = useState({});
  const [blocked,setBlocked]=useState(false)
 const handleBlockClick=async(e,categoryId,isBlocked)=>{
   try {
    e.stopPropagation();
     isBlocked=!isBlocked
    
    const res=await axiosInstance.patch('/blockUnblockCategory',{categoryId,isBlocked}) 
    setBlocked(!blocked)
    if(res.data=='successfull'){
      toast.success('status updated')
    }
  } catch (error) {
    console.log(error)
  }
 }
  const openEditModal = async (e,categoryName) => {
    e.stopPropagation();
    setEditModalOpen(true)
   const editCategoryData=rows.filter((category)=>{
    if(category.categoryName==categoryName){
      
      return category
    }
    
   })
   setCategoryData(editCategoryData)
   console.log('categoryData',categoryData)
  };
 const  handEditCategory=async (formData) => {
 
  try {
        
    const response=await axiosInstance.post('/editCategory',formData)
    if(response.data=='edited successfully'){
      toast.success('category edited successfully')
      setEdited(!edited) 
      return null;
      
    }
    

} catch (error) {
 console.error('Error editing user:', error);
}
 }
  useEffect(() => {


    fetchData();
    // setBlocked(!blocked)
  }, [edited,added,blocked])


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
            index: index + 1,
          }));
          console.log('res',res.data)
          setRows([...categoryWithIndex]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    const [rows,setRows]=useState([])
  

    const [isAddModalOpen, setAddModalOpen] = useState(false);
   

      

    
    return (
      <div className="container">
      
        <div className="add-button-container" >
        <button onClick={() => setAddModalOpen(true)} className="add-button text-white ">
         +
        </button></div>
        <div className="data-grid-container">
        <DataGrid rows={rows} columns={columns} getRowId={(row) => row._id} pageSizeOptions={[5, 10]} checkboxSelection />
        <CategoryAddModal isOpen={isAddModalOpen} onRequestClose={() => setAddModalOpen(false)} onAddCategory={handleAddCategory} />
        <CategoryEditModal isOpen={isEditModalOpen} onRequestClose={() => setEditModalOpen(false)} onEditCategory={handEditCategory} categoryData={categoryData}/>
      </div>
      </div>
    );
}