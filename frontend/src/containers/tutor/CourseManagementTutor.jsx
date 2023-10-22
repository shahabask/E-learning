import { DataGrid } from '@mui/x-data-grid';
import { FaEdit } from 'react-icons/fa';
import './CourseManagementTutor.css'
import { axiosInstance } from '../utils/adminAxios';
import { useEffect, useState } from 'react';
import AddCourse from './modal/AddCourse'
import { toast} from 'react-toastify';
function CourseManagementTutor() {
  const columns = [
    {field: '_id',headerName: 'Course Id',width: 60,},
    { field: 'course', headerName: 'Course', width: 130},
    { field: 'categoryName', headerName: 'Category', width: 130},
    { field: 'tutor', headerName: 'Tutor', width: 130},
    {field: 'edit',
      headerName: 'Edit',
      width: 130,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button-active' }`} onClick={(e) => handleEditClick(e,params.row._id)}>
          {<FaEdit size={18} />}
        </button>
      )},}
  ]
const rows=[]
const [isModalOpen, setModalOpen] = useState(false);
const [categories,setCategories]=useState('')
const [subCategories,setSubCategories]=useState('')
  
const openModal = () => {
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

const handleAddCourse = async (formData) => {
  try {
    const response = await axiosInstance.post('/addCourse', formData);
     
  } catch (error) {
    console.log(error)
  }
};

const handleEditClick=()=>{

}
useEffect(()=>{
 fetchCourseData()
},[])

const fetchCourseData=async()=>{
  try{
    const  courseData= await axiosInstance.get('/courseData')
    console.log(courseData.data.categories,courseData.data.categories.subCategories) 
    setCategories(courseData.data.categories)
    setSubCategories()
   
  }catch(error){
    toast.error(error.error)
  }
  }


  return (
    
    <>
     <div className="container">
    <div className="add-button-container" >
      <button className="add-button" onClick={openModal}>+</button>
    </div>
     <div className="data-grid-container">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
 
  </div>
  </div>
  <AddCourse isOpen={isModalOpen}
      onRequestClose={closeModal}
      onAddCourse={handleAddCourse} categories={categories} subCategories={subCategories}/>
      
    </>
  )
}

export default CourseManagementTutor