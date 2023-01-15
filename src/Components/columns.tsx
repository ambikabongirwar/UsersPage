import { IUser } from "./Types"
import {Column} from 'react-table'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const COLUMNS = [
  {
      Header: "ID",
      accessor: "id"
  },
  {
      Header: "First Name",
      accessor: "first_name"
  },
  {
      Header: "Last Name",
      accessor: "last_name"
  },
  {
      Header: "Email",
      accessor: "email"
  },
  {
      Header: "Status",
      accessor: "status"
  },
  {
      Header: "Role",
      accessor: "role"
  },
  {
      Header: "Login",
      accessor: "lastLogin"
  },
  {
      Header: "",
      id: "edit",
      Cell: ({ row }: any) => (
        <button onClick={() => EditUser(row)}>
          <ModeEditOutlineOutlinedIcon sx={{ fontSize: 25 }}/>
        </button>
      )
    },
    {
      Header: "",
      id: "delete",
      Cell: ({ row }: any) => (
        <button onClick={() => EditUser(row)}>
          <DeleteOutlineIcon/>
        </button>
      )
    }
] as Column<IUser>[]

function EditUser(row: any) {
  console.log(row.original);
  
}
