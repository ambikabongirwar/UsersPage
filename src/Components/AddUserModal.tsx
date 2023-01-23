import React, { Dispatch, SetStateAction } from 'react'
import { useQuery, UseQueryResult } from 'react-query';
import { customQueryResultType } from './Types';
import UserModal from './UserModal'
import { fetchUsers } from './UserTableData';

type Props = {
  title: string;
  userModalClicked?: number;
  setUserModalClicked?: Dispatch<SetStateAction<number>>;
}

export default function AddUserModal(props: Props) {
  const { error, status, data } = useQuery('users', fetchUsers, {cacheTime: 20,}) as UseQueryResult<customQueryResultType, Error>

  function getUserTableSize() {
    if (data !== undefined)
      return data.data[data.data.length - 1].id;
    return 0;
  }

  return (
    <div>
      <UserModal title={"Add User"} id={getUserTableSize() + 1} first_name={""} last_name={""} role={""} userModalClicked={props.userModalClicked} setUserModalClicked={props.setUserModalClicked}></UserModal>
    </div>
  )
}
