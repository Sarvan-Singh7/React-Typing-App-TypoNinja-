import React, {useState}from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTheme } from '../Context/ThemeContext';
import {auth} from '../firebaseConfig';
import { toast, Bounce } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
const LoginForm = () => {

   const[email, setEmail] = useState('');
   const[password, setPassword] = React .useState('');
   const{theme} = useTheme();

   const handleSubmit = () => {
    if(!email || !password){
      toast.warning('Fill All Details', {
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
      return;
    }
    auth.signInWithEmailAndPassword(email, password).then((res) =>{
        toast.success('User Logged In Successfully', {
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
    }).catch((err) =>{
        toast.error(errorMapping[err.code] || 'some Error Occured', {
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
    });
   }

  return (
    <Box p={3}      //padding of 3 means 24px
      style={{ display: 'flex'
      , flexDirection: 'column',
       gap: '20px' }}>
      <TextField
          variant='outlined'
          label='Enter Email'
          type='email'
          onChange = {(e) => setEmail (e.target.value)}
          InputLabelProps ={{style: {color: theme.textColor}}}  //to change the label color according to theme
          InputProps ={{style: {color: theme.textColor}}} //to change the input text color according to theme
          ></TextField>

      <TextField
          variant='outlined'
          label='Enter Password'
          type='password'
          onChange = {(e) => setPassword (e.target.value)}
          InputLabelProps ={{style: {color: theme.textColor}}}  //to change the label color according to theme
          InputProps ={{style: {color: theme.textColor}}} //to change the input text color according to theme
          ></TextField>

      <Button
         variant='contained'
         size='large'
         style = {{backgroundColor: theme.textColor , color: theme.backgroundColor}}
         onClick = {handleSubmit}>Login</Button>
    </Box>
  )
}
export default LoginForm;