import React, { Dispatch, SetStateAction } from 'react'
import UserModal from './UserModal'

type Props = {
  userModalClicked?: number;
  setUserModalClicked?: Dispatch<SetStateAction<number>>;
}

export default function AddUserModal(props: Props) {
  return (
    <div>
      <UserModal id={1} first_name={""} last_name={""} role={""} userModalClicked={props.userModalClicked} setUserModalClicked={props.setUserModalClicked}></UserModal>
    </div>
  )
}
