import axios from 'axios'
import { useQuery, UseQueryResult, useMutation, Mutation } from 'react-query'
import { customQueryResultType, IUser } from './Types'
import UsersTable from './UsersTable'

export const baseURL = "https://ambikabongirwar.github.io/UsersPage/src/Components/MOCK_DATA.json"

export const fetchUsers = ():Promise<customQueryResultType> => {
    return axios.get(baseURL)
}

const addUser = (user: IUser) => {
  return axios.post(baseURL + user)
}

const deleteUserData = (id: number) => {
  return axios.delete(`${baseURL}/${id}`)
}

const updateUserData = (data: IUser) => {
  return axios.put(`${baseURL}/${data.id}`, data)
}

export default function UserTableData() {
    const { error, status, data } = useQuery('users', fetchUsers) as UseQueryResult<customQueryResultType, Error>

    console.log(data)
  return (
    <div>
      {status === "error" && <div>{error.message} </div>}

               {status === "loading" && <div>Loading...</div>}

               {status === "success" && <UsersTable data={data.data}></UsersTable>}
    </div>
  )
}

export const useAddUser = () => {
  return useMutation(addUser)
}

export const useDeleteUser = () => {
  return useMutation(deleteUserData)
}

export const useUpdateUser = () => {
  return useMutation(updateUserData)
}
