import React, { useState }from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal, Tab, AppBar, Tabs} from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
const AccountCircle = () => {
  const[open, setOpen] = useState(false);
  const[value, setValue] = useState(0); // to keep track of which tab is selected either login or signup

  const handleModalOpen =() => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleValueChange = (e, v) => {
    setValue (v);
  }


      return(
        <div>
          <AccountCircleIcon onClick={handleModalOpen}/>
          <Modal
             open = {open}
             onClose = {handleClose}
             style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
             }}
             
          >
            <div style = {{width: '400px'}}>
              <AppBar position="static" style = {{backgroundColor: 'transparent'}}>
            <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm />}
          {value === 1 && <SignUpForm />}
            </div>
          </Modal>
        </div>
        )
      }
export default AccountCircle;



