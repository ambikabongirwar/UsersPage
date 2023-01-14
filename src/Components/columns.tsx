import { IUser } from "./Types"
import {Column} from 'react-table'

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
    } 
] as Column<IUser>[]