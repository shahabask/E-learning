import { DataGrid } from '@mui/x-data-grid';

import './UserManagement.css'
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Email', width: 130},
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow',email:'arshad@gmail.com', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister',email:'muji@gmail.com', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister',email:'vishnu@gmail.com', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark',email:'sharbas@gmail.com', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen',email:'shabas@gmail.com', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre',email:'niraj@gmail.com', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford',email:'athul@gmail.com', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances',email:'rince@gmail.com', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie',email:'christo@gmail.com', firstName: 'Harvey', age: 65 },
];

export default function UserManagement() {
  return (
    <>
      <div className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}