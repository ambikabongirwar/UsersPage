import axios from 'axios'
import { useQuery, UseQueryResult, useMutation } from 'react-query'
import { customQueryResultType, IUser } from './Types'
import UsersTable from './UsersTable'

export const fetchUsers = ():Promise<customQueryResultType> => {
    return axios.get('http://localhost:4000/users')
}

const addUser = (user: IUser) => {
  return axios.post('http://localhost:4000/users', user)
}

export default function UserTableData() {
    const { error, status, data } = useQuery('users', fetchUsers, {cacheTime: 20,}) as UseQueryResult<customQueryResultType, Error>

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
