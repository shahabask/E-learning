import { DataGrid } from '@mui/x-data-grid';
import { FaUnlock, FaLock, FaEdit } from 'react-icons/fa'
import './UserManagement.css'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';

import DetailsModal from './DetailsModal';


export default function CategoryManagement() {

  
  // const [buttonClicked,setButtonClicked] = useState(false)
  const columns = [
    {field: 'index',headerName: 'Index',width: 20,},
    { field: 'category', headerName: 'Category', width: 130},
   
    // { field: 'isBlocked', headerName: 'Active', width: 130 ,renderCell: (params) => (
    //   <div className={`pill ${params.row.isBlocked ? 'inactive' : 'active'}`}>
    //   {params.row.isBlocked ? 'Inactive' : 'Active'}
    // </div>
    // ),},
    {
      field: 'update',
      headerName: 'Update',
      width: 100,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button${params.row.isBlocked ?'-inactive':'-active' }`} onClick={(e) => handleEditClick(e,params.row._id)}>
          {<FaEdit size={18} />}
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
 
  const handleEditClick = async (e, categoryId) => {
    e.stopPropagation();
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
  }, [edited])
//   const handleDetailsClick = (e, row) => {
//     e.stopPropagation();
//     const userId = row._id;
//     setModalDetails(row.details);
//     setOpenModals((prevOpenModals) => ({
//       ...prevOpenModals,
//       [userId]: true,
//     }));
//   };


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
  

  return (
    <>

<div className="relative">
  <button
    className="absolute top-0 right-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2"
    onClick={() => {
      // Handle the "Add Category" button click here
      // You can open a modal or navigate to a page for adding a category
    }}
  >
    Add Category
  </button>
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
  );
}