import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTable, Column } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { IUser } from './Types'
import './table.css'
import { Container } from '@mui/system'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UserModal from './UserModal'


export default function UsersTable() {
    const [modalData, setmodalData] = useState({id: -1,
        first_name: "",
        last_name: "",
        role: "",})
    const editModalRef = useRef({id: -1,
    first_name: "",
    last_name: "",
    role: "",});
    
    const COLUMNS = [
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

      const columns = useMemo<Column<IUser>[]>(() => COLUMNS, [])
    const data = useMemo<IUser[]>(() => MOCK_DATA, [])

    const tableInstance = useTable(
        {
            columns, 
            data
        }
        )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    useEffect(() => {
        editModalRef.current = modalData;
      }, [modalData]);

    function EditUser(row?: any) {
        console.log("EditUser: " + JSON.stringify(row.original));
        if(row.original !== undefined) {
            setmodalData(row.original);
            console.log("EditUserInsideIf: " + JSON.stringify(row.original));
            return <UserModal id={row.original.id} first_name={row.original.first_name} last_name={row.original.last_name} role={row.original.role} ></UserModal>
        }
        return <p></p>
      }

      function LookForClicks() {
        return <UserModal id={modalData.id} first_name={modalData.first_name} last_name={modalData.last_name} role={modalData.role}></UserModal>;
      }

  return ( 
    <>
    <Container>
        <table {...getTableProps()} >
        <thead>
            {
                headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))
                        }
                    </tr>
                ))
            }
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map(row => {
                    prepareRow(row)
                    return(
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })
            }
        </tbody>
        </table>
    </Container>
    { modalData.id !== -1 ? <LookForClicks></LookForClicks> : <p></p>}
    </>
  )
}
