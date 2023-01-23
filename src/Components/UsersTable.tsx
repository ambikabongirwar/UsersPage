import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTable, Column, useSortBy, usePagination } from 'react-table'
import { IUser } from './Types'
import './table.css'
import { Container } from '@mui/system'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UserModal from './UserModal'
import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddUserModal from './AddUserModal'
import { useDeleteUser } from './UserTableData'

type Props = {
    data: IUser[];
}

export default function UsersTable(props: Props) {
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
              <button onClick={() => deleteUser(row)}>
                <DeleteOutlineIcon/>
              </button>
            )
          }
      ] as Column<IUser>[]

      const columns = useMemo<Column<IUser>[]>(() => COLUMNS, [])
    const userData = useMemo<IUser[]>(() => props.data, [])
    const [userModalClicked, setUserModalClicked] = useState(0)
    const {mutate: deleteUserData} = useDeleteUser()

      useEffect(() => {
        editModalRef.current = modalData;
      }, [modalData]);

    const tableInstance = useTable(
        {
            columns, 
            data: userData
        },
        useSortBy,
        usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        prepareRow,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        selectedFlatRows,
        state: { selectedRowIds, pageIndex, pageSize }
    } = tableInstance

    function EditUser(row?: any) {
        console.log("EditUser: " + JSON.stringify(row.original));
        if(row.original !== undefined) {
            setmodalData(row.original);
            console.log("EditUserInsideIf: " + JSON.stringify(row.original));
            return <UserModal title={"Edit User"} id={row.original.id} first_name={row.original.first_name} last_name={row.original.last_name} role={row.original.role} ></UserModal>
        }
        return <p></p>
      }

    function deleteUser(row?: any) {
        if(row.original !== undefined) {
            if (window.confirm("Do you want to delete " + row.original.first_name + " " + row.original.last_name) == true) {
                deleteUserData(row.original.id)
            }
        }
    }

  return ( 
    <>
    <Container>
        <div className="header">Users <span><Button sx={{mx: 20 }} variant="contained" onClick={() => {setUserModalClicked(1)}}>Add User</Button></span></div>
        <table {...getTableProps()} >
        <thead>
            {
                headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? <ArrowDropUpIcon/> : <ArrowDropUpIcon/> ) : ""}
                                    </span>
                                </th>
                            ))
                        }
                    </tr>
                ))
            }
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                page.map(row => {
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
        <div>
            <span>
                Page{" "}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>
                Page{" "}
            </span>
            {/*<span>
                | Go to page: {' '}
                <input type='number' defaultValue={pageIndex + 1} onChange={e => {const pageNumber = e.target.value ? Number(e.target.value) - 1: 0
                gotoPage(pageNumber)}} />
                </span>*/}
            <Button onClick = {() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
            <Button variant="contained" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
            <Button variant="contained" onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
            <Button onClick = {() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>
        </div>
    </Container>
    { modalData.id !== -1 ? <UserModal title={"Edit User"} id={modalData.id} first_name={modalData.first_name} last_name={modalData.last_name} email={userData[modalData.id - 1].email} status={userData[modalData.id - 1].status} role={modalData.role} lastLogin={userData[modalData.id - 1].lastLogin} modalData={modalData} setmodalData={setmodalData}></UserModal> : <p></p>}
    { userModalClicked === 1 ? <AddUserModal title={"Add User"} userModalClicked={userModalClicked} setUserModalClicked={setUserModalClicked} ></AddUserModal> : <p></p>}
    </>
  )
}
