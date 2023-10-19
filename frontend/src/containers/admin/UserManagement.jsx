import { DataGrid } from '@mui/x-data-grid';
import { FaUnlock, FaLock } from 'react-icons/fa'
import './UserManagement.css'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/adminAxios';

import DetailsModal from './DetailsModal';


export default function UserManagement() {

  
  // const [buttonClicked,setButtonClicked] = useState(false)
  const columns = [
    { field: '_id', headerName: 'ID', width: 20 },
    { field: 'email', headerName: 'Email', width: 130},
    { field: 'firstName', headerName: 'First name', width: 90 },
    { field: 'secondName', headerName: 'Last name', width: 90 },
    { field: 'subscribtion', headerName: 'Subscribtion', width: 130 },
    { field: 'phoneNo', headerName: 'Phone No', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'isBlocked', headerName: 'Active', width: 130 ,renderCell: (params) => (
      <div className={`pill ${params.row.isBlocked ? 'inactive' : 'active'}`}>
      {params.row.isBlocked ? 'Inactive' : 'Active'}
    </div>
    ),},
    {
      field: 'action',
      headerName: 'Action',
      width: 100,  
      renderCell: (params) => {  return(
        
        <button className={`custom-button${params.row.isBlocked ?'-inactive':'-active' }`} onClick={(e) => handleBlockClick(e,params.row._id,params.row.isBlocked)}>
          {params.row.isBlocked ?<FaLock size={18} /> :  <FaUnlock size={18} /> }
        </button>
      )},
    },
    
   
    {
      field: 'details',
      headerName: 'Details',
      width: 100,
      renderCell: (params) => (
        <button className="button-pill" onClick={(e) => handleDetailsClick(e,params.row)}>
          View
        </button>
      ),
    },
    
   
  
  
  ];
  const [openModals, setOpenModals] = useState({});
  const [modalDetails, setModalDetails] = useState('');
  const [blocked, setBlocked] = useState(false)
  const handleBlockClick = async (e,userId,isBlocked) => {
    e.stopPropagation();
    try {
      isBlocked = !isBlocked;
      setBlocked(!blocked)

      const response = await axiosInstance.put(`/blockUnblockUser`,{userId,isBlocked});
      // fetchData();
   
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };
  useEffect(() => {


    fetchData();
    // setBlocked(!blocked)
  }, [blocked])
  const handleDetailsClick = (e, row) => {
    e.stopPropagation();
    const userId = row._id;
    setModalDetails(row.details);
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [userId]: true,
    }));
  };

  const closeDetailsModal = (userId) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [userId]: false, // Close the modal for the specific user
    }));
  };

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('/loadUsers');
        setRows([...res.data.users]);
        console.log(res.data.users)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
    const [rows,setRows]=useState([])
  

  return (
    <>
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

    {rows.map((row) => (
  <DetailsModal
    key={row._id}
    isOpen={openModals[row._id] || false}
    onClose={() => closeDetailsModal(row._id)}
    details={row.details}  // Pass the user-specific details
  />
))}
  </>
  );
}