import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal, Tab, AppBar, Tabs, Box } from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext'; //i imported this to style the tab text color according to the theme
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast, Bounce } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import { auth } from '../firebaseConfig';

const AccountCircle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0); // to keep track of which tab is selected either login or signup
  const { theme } = useTheme();

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (e, v) => {
    setValue(v);
  };

  const googleProvider = new GoogleAuthProvider(); // we need to create an instance of GoogleAuthProvider class to use google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success('Google Authentication Successful', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        handleClose(); // to close the modal on successful google sign in
      })
      .catch((err) => {
        toast.error(errorMapping[err.code] || 'some Error Occured', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
      });
  };

  return (
    <div>
      <AccountCircleIcon onClick={handleModalOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '400px', textAlign: 'center' }}>
          <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
            <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
              <Tab label="Login" style={{ color: theme.textColor }} />
              <Tab label="Signup" style={{ color: theme.textColor }} />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm />}
          {value === 1 && <SignUpForm />}
          <Box>
            <span>OR</span>
            <GoogleButton
              style={{ width: '100%', marginTop: '12px' }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
