import { DataGrid } from '@mui/x-data-grid';
import { FaEdit } from 'react-icons/fa';

import { toast} from 'react-toastify';
function CourseManagement() {
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



const handleEditClick=()=>{

}
 



  return (
    
    <>
     <div className="container">

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

      
    </>
  )
}

export default CourseManagement