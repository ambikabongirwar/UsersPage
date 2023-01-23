import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { IUser } from './Types'
import UsersTable from './UsersTable'

type customQueryResultType = {
    data: IUser[];
    status: number;
    statusText: string;
    headers: any;
    config: string;
}

const fetchUsers = ():Promise<customQueryResultType> => {
    return axios.get('http://localhost:4000/users')
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
