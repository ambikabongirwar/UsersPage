import React, { useEffect, useState } from 'react';
import {QueryClientProvider, QueryClient, useQueryClient, useQuery} from 'react-query'
import './App.css';
import UsersTable from './Components/UsersTable';
import {ReactQueryDevtools} from 'react-query/devtools';
import * as api from './Components/usersApi';

function App() {
  /*
  const queryClient = useQueryClient();

  const [tableData, setTableData] = useState(null);

  const { data, isLoading } = useQuery('users', api.getUsers);

  useEffect(() => {
    setTableData(data?.data);
  }, [])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }
  */
  return (
    <QueryClientProvider client={new QueryClient()}>
        <div className="App">
        <UsersTable></UsersTable>
        <br/>
        </div>
        <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
