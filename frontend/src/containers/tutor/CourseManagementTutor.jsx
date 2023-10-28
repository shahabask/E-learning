import { DataGrid } from '@mui/x-data-grid';
import { FaEdit } from 'react-icons/fa';
import './CourseManagementTutor.css'
import { axiosInstance } from '../utils/adminAxios';
import { axiosInstance as tutorAxiosInstance } from '../utils/tutorAxios.js';
import { useEffect, useState } from 'react';
import AddCourse from './modal/AddCourse'
import { toast} from 'react-toastify';
import EditCourse from './modal/EditCourse';
import axios from 'axios';
function CourseManagementTutor() {

  //image rendering function in table
  function ImageCellRenderer(params) {
    const { value } = params;
    
    if (value) {
    const imagePath = `${value.replace(/\\/g, '/')}`;

    const modifiedImagePath = imagePath
    ? `http://localhost:5000/${imagePath.replace(/^backend\/public\//, '')}`
    : '';


    return (  
      <div style={{borderRadius:'2px' ,width: '80px', height: '40px',alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <img
        src={modifiedImagePath}
          alt="Image" // Provide an alternative text for the image
          style={{ width: '80px', height: '40px' }} // Adjust the width and height as needed
        /></div>
      );
    }
    return <div>No Image</div>;
  }
  //columns for table
  const columns = [
    {field: '_id',headerName: 'Course Id',width: 160,},
    { field: 'course', headerName: 'Course', width: 150},
    { field: 'categoryName', headerName: 'Category', width: 130},
    {field:'description',headerName:'Description',width:150},
    { field: 'image', headerName: 'Image', width: 130, renderCell: ImageCellRenderer },
    {
      headerName: 'Videos',
      field: 'videos', // The field itself doesn't matter here
      width: 130,
      valueGetter: (params) => params.row.videos.length, // Get the length of the 'videos' array
    },
    {field: 'edit',
      headerName: 'Edit',
      width: 130,  
      disableSelectionOnClick: true,
      renderCell: (params) => {  return(
        
        <button className={`custom-button-active' }`} onClick={(e) => handleEditClick(e,params.row._id)}>
          {<FaEdit size={18} />}
        </button>
      )},}
  ]
  //state
  const [rows,setRows]=useState([])
const [isModalOpen, setModalOpen] = useState(false);
const [categories,setCategories]=useState([])
const [isCourseAdded,setIsCourseAdded]=useState(false)
 const [isEditModalOpen,setIsEditModalOpen] =useState(false)
 const [editCourseData,setEditCourseData]=useState('')
 const [edited,setEdited] =useState(false)

 // open modal for addModal
const openModal = () => {
  setModalOpen(true);
  setIsCourseAdded(false)
};
// close modal for addModal
const closeModal = () => {
  setModalOpen(false);
};

//function to add course to the server
const handleAddCourse = async (formData) => {
  try {
    const response = await tutorAxiosInstance.post('addCourse', formData,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },});
    
     toast.success(response.data)
     setModalOpen(false)
     setIsCourseAdded(true)
  } catch (error) {
    toast.error(error?.response?.data||error.error)
    console.log(error,'hope it is errro')
  }
};

//function to open modal for editing
const handleEditClick=(e,id)=>{
  e.stopPropagation();
  setIsEditModalOpen(true)
 const courseToEdit=rows.filter((course)=>{
  if(course._id==id){
      return course
  }
 })
console.log('edit',courseToEdit)
 setEditCourseData(courseToEdit)
}

//fetch courses to list in the table
useEffect(()=>{
  fetchCourses()
},[isCourseAdded,edited])
//fetchCourse function definition
const fetchCourses=async()=>{
  
  try {
    
 
  const courses=await tutorAxiosInstance.get('/loadCourses')
  setRows([...courses.data]);
  
} catch (error) {
  toast.error(error?.courses?.data||error.error)  
}
}

//fetchModalCourseData for

useEffect(()=>{
 fetchModalCourseData()

},[])
  const handleEditCourse=async(formData)=>{
    try {
      
    
    const response=await tutorAxiosInstance.patch('/editCourse',formData,{
      headers: {
        'Content-Type': 'multipart/form-data', 
      },})
      
    if(response.data=='edited successfully'){
      toast.success('course edited successfully')
      setEdited(!edited) 
      return null;
    } 
  } catch (error) {
      toast.error(error?.response?.data||error.error)
    }
    
  }


const fetchModalCourseData=async()=>{
  try{
    const  courseData= await tutorAxiosInstance.get('/courseData')
    setCategories([...courseData.data])

    
    
   
  }catch(error){
    toast.error(error.error)
  }
  }


  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Course Management</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          Add Course
        </button>
      </div>
      <div className="mt-4 bg-white rounded shadow-lg">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <AddCourse
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onAddCourse={handleAddCourse}
        categories={categories}
      />
      <EditCourse
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        onEditCourse={handleEditCourse}
        courseData={editCourseData}
      />
    </div>
  );
  
}

export default CourseManagementTutor