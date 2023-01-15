import React, { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
}

export default function UserModal(props: Props) {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  }

  const onConfirmEdit = () => {
    
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="First Name"
            type="string"
            fullWidth
            variant="standard"
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
            defaultValue = {props.role}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirmEdit}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}