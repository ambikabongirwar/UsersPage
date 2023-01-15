import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { IUser } from './Types';
import * as api from './usersApi';

export default function Users({setUserId}: any) {
    const {data, isLoading, isError, error} = useQuery('users', api.getUsers);
  return (
    <div>
      <ul>{data?.map((user: IUser) => <li key={user.id}>{user.first_name}<button onClick={() => setUserId(user.id)}>View</button></li>)}</ul>
    </div>
  )
  /*
  if (isLoading) {
        return 'Loading users...';
    }
    if (isError) {
        return 'Something went wrong';
    }
  */
}
