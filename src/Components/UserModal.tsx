import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MOCK_DATA from './MOCK_DATA.json'
import { IUser } from './Types';
import { Typography } from '@mui/material';

type modalData = {
  id: number,
  first_name: string,
  last_name: string,
  role: string 
}

type Props = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  userModalClicked?: number;
  setUserModalClicked?: Dispatch<SetStateAction<number>>;
  modalData?: modalData;
  setmodalData?: Dispatch<SetStateAction<modalData>>;
}

export default function UserModal(props: Props) {
  const [open, setOpen] = useState(true)
  const [user, setuser] = useState({
    id: props.id,
    first_name: props.first_name,
    last_name: props.last_name,
    role: props.role,})
  const data = useMemo<IUser[]>(() => MOCK_DATA["users"], [])

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  }

  const onConfirmEdit = () => {
    console.log("OnConfimEdit: " + props.id + " " + props.first_name + " " + props.last_name + " " + props.role)
    console.log("Data Before: " + props.id + " " + data[props.id - 1].first_name + " " + data[props.id - 1].last_name + " " + data[props.id - 1].role)
    data[props.id  - 1].first_name = user.first_name;
    data[props.id - 1].last_name = user.last_name;
    data[props.id - 1].role = user.role;
    console.log("Data After: " + props.id + " " + data[props.id - 1].first_name + " " + data[props.id - 1].last_name + " " + data[props.id - 1].role)
    if(props.setUserModalClicked !== undefined)
        props.setUserModalClicked(0);
    if(props.setmodalData !== undefined)
        props.setmodalData({id: -1, first_name: "", last_name: "", role: ""})
    setOpen(false);
  };

  const onCancel = () => {
    if(props.setUserModalClicked !== undefined)
        props.setUserModalClicked(0);
    setOpen(false);
  }
  let name, value;

  function handleInputs(e: any) {
    name = e.target.id;
    value = e.target.value;
    setuser({...user, [name]:value})
    console.log(user)
  }

  return (
    <div>
      <form>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="id"
              label="Id"
              type="string"
              fullWidth
              variant="standard"
              value = {user.id}
              onChange={(e) => handleInputs(e)}
              defaultValue = {props.id}
            />
            <TextField
              autoFocus
              margin="dense"
              id="first_name"
              label="First Name"
              type="string"
              fullWidth
              variant="standard"
              value = {user.first_name}
              onChange={(e) => handleInputs(e)}
              defaultValue = {props.first_name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="last_name"
              label="Last Name"
              type="string"
              fullWidth
              variant="standard"
              value = {user.last_name}
              onChange={(e) => handleInputs(e)}
              defaultValue = {props.last_name}
            />
            <TextField
              autoFocus
              margin="dense"
              id="role"
              label="Role"
              type="string"
              fullWidth
              variant="standard"
              value = {user.role}
              onChange={(e) => handleInputs(e)}
              defaultValue = {props.role}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onConfirmEdit}>Confirm</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}