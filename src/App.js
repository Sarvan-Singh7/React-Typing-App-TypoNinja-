import React from 'react';
import { GlobalStyle } from './Styles/global';

import { useTheme } from './Context/ThemeContext'
import {ThemeProvider} from 'styled-components'   //imported themeProvider
import { ToastContainer} from 'react-toastify';    //used so that we can show toast notifications anywhere in the app
import 'react-toastify/dist/ReactToastify.css';   //imported css for toastify
import { Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';

function App() {
  const {theme} = useTheme();  // see that i used Context ki thems and used below
  return (
    
    <ThemeProvider theme = {theme}>    {/*ThemeProvider will propagates all theme values to your components and i can use it anywhere i want */}
        <ToastContainer />   {/* we can show toast notifications anywhere in the app now */}
        <GlobalStyle />              {/*Coming from global.js  = css  and added to the top so thatit applies globally*/}

        <Routes>
          <Route path ='/' element ={<HomePage/>} />
          <Route path ='/user' element ={<UserPage/>} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
