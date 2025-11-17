import React, {useState}from 'react';
import { Box, TextField, Button } from '@mui/material';
const LoginForm = () => {

   const[email, setEmail] = React.useState('');
   const[password, setPassword] = React .useState('');

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
          ></TextField>

      <TextField
          variant='outlined'
          label='Enter Password'
          type='password'
          onChange = {(e) => setPassword (e.target.value)}
          ></TextField>
      <Button
         variant='contained'
         size='large'>Login</Button>
    </Box>
  )
}
export default LoginForm;