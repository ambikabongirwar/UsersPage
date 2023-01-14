import { IUser } from "./Types"
import {Column} from 'react-table'

function EditUser(row: any) {
    console.log(row.original)
}

export const COLUMNS = [
    {
        Header: "",
        id: "as",
        Cell: ({ row }: any) => (
          <button onClick={() => EditUser(row)}>
            Detailed View
          </button>
        )
      },
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
    } 
] as Column<IUser>[]