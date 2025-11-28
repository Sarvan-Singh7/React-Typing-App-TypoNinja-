import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal, Tab, AppBar, Tabs, Box, Button } from '@mui/material';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useTheme } from '../Context/ThemeContext'; //i imported this to style the tab text color according to the theme
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { toast, Bounce } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
import { auth } from '../firebaseConfig';
import UserPage from '../Pages/UserPage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';   //hook to navigate programmatically

const AccountCircle = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0); // to keep track of which tab is selected either login or signup
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);   //[firebase hook] to check if user is logged in or not destructure as array as useAuthState returns an array
  const handleModalOpen = () => {
    if (user) {   //if user is already logged in then do not open modal on clicking account icon
      navigate('/user');  //navigate to user page
    }
    else { setOpen(true); }

  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (e, v) => {
    setValue(v);
  };
  const logout = () => {                     //logout function to logout user
    auth.signOut().then((res) => {
      toast.success('Logged Out', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }).catch((err) => {
      toast.error('Not able to Logout', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    })
  }

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
      <AccountCircleIcon style={{ cursor: 'pointer' }}
        onClick={handleModalOpen} />
      {(user) && <LogoutIcon onClick={logout} style={{ cursor: 'pointer' }} />}  {/* if user is logged in then show logout icon  otherwise show account circle icon only*/}

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        slotProps={{
          backdrop: {
            style: {
              backdropFilter: 'blur(5px)',
            },
          },
        }}
      >
        <div style={{ width: 'clamp(300px, 90%, 400px)', textAlign: 'center' }}>
          <AppBar position="static" style={{ backgroundColor: 'transparent' }}>
            <Tabs value={value} onChange={handleValueChange} variant="fullWidth">
              <Tab label="Login" style={{ color: theme.textColor }} />
              <Tab label="Signup" style={{ color: theme.textColor }} />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignUpForm handleClose={handleClose} />}
          <Box>
            <span>OR</span>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              style={{
                width: '100%',
                marginTop: '12px',
                backgroundColor: theme.textColor,
                color: theme.background,
                textTransform: 'none',
                fontSize: '1rem',
                padding: '10px 0',
                fontWeight: 'bold',
                border: `1px solid ${theme.textColor}`
              }}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
