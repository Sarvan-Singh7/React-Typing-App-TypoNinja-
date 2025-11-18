import React, {useState}from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useTheme } from '../Context/ThemeContext';
import {auth} from '../firebaseConfig';
import { toast, Bounce } from 'react-toastify';
import errorMapping from '../Utils/errorMapping';
const SignUpForm = () => {

   const[email, setEmail] = useState('');
   const[password, setPassword] = useState('');
   const[confirmPassword, setConfirmPassword] = useState('');
   const{theme} = useTheme();   ///iske BINA THEME APPLY NAHIN HOGA AS WE HAVE TO CHANGE THE TEXT COLOR ACCORDING TO THE THEME

   const handleSubmit = () => {                             //form validation and firebase signup
    if(!email || !password || !confirmPassword){
      toast.warning('Please fill all the fields', {
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

    if(password !== confirmPassword){
      toast.error('Password and Confirm Password do not match', {
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

    auth.createUserWithEmailAndPassword(email, password).then((res) =>{   // we use promises here because it is an asynchronous task and it will take some time to communicate with firebase servers
       toast.success('User Registered Successfully', {
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
    }).catch((err) =>{    //in this err we will get firebase error code like auth/user-not-found etc
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
      // Signed in

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
      
      <TextField
          variant='outlined'
          label='Confirm Password'
          type='password'
          onChange = {(e) => setConfirmPassword (e.target.value)}
          InputLabelProps ={{style: {color: theme.textColor}}}  //to change the label color according to theme
          InputProps ={{style: {color: theme.textColor}}} //to change the input text color according to theme
          ></TextField>
          
      <Button
         variant='contained'
         size='large'
         style = {{backgroundColor: theme.textColor , color: theme.backgroundColor}}
         onClick ={handleSubmit} >Sign Up</Button>
    </Box>
  )
}
export default SignUpForm;