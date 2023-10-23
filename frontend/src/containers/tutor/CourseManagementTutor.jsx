import { DataGrid } from '@mui/x-data-grid';
import { FaEdit } from 'react-icons/fa';
import './CourseManagementTutor.css'
import { axiosInstance } from '../utils/adminAxios';
import { axiosInstance as tutorAxiosInstance } from '../utils/tutorAxios.js';
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
const [categories,setCategories]=useState([])
const [isCourseAdded,setIsCourseAdded]=useState(false)
  
const openModal = () => {
  setModalOpen(true);
  setIsCourseAdded(false)
};

const closeModal = () => {
  setModalOpen(false);
};

const handleAddCourse = async (formData) => {
  try {
    const response = await tutorAxiosInstance.post('/addCourse', formData);
     toast.success(response.data)
     setModalOpen(false)
     setIsCourseAdded(true)
  } catch (error) {
    toast.error(error?.response?.data||error.error)
    console.log(error)
  }
};

const fetchCourses=async()=>{
  const courses=await tutorAxiosInstance.get('/loadCourses')
    
}
useEffect(()=>{
  fetchCourses()
},[isCourseAdded])
useEffect(()=>{
 fetchModalCourseData()

},[])

const fetchModalCourseData=async()=>{
  try{
    const  courseData= await tutorAxiosInstance.get('/courseData')
    setCategories([...courseData.data])

    
    
   
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
      onAddCourse={handleAddCourse} categories={categories} />
      
    </>
  )
}

export default CourseManagementTutor