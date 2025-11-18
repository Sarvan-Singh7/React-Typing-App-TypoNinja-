import React from 'react';
import { GlobalStyle } from './Styles/global';
import TypingBox from './Components/TypingBox';
import Footer from './Components/Footer';
import { useTheme } from './Context/ThemeContext'
import {ThemeProvider} from 'styled-components'   //imported themeProvider
import Header from './Components/Header';
import { ToastContainer} from 'react-toastify';    //used so that we can show toast notifications anywhere in the app
import 'react-toastify/dist/ReactToastify.css';   //imported css for toastify

function App() {
  const {theme} = useTheme();  // see that i used Context ki thems and used below
  return (
    

    <ThemeProvider theme = {theme}>    {/*ThemeProvider will propagates all theme values to your components and i can use it anywhere i want */}
        <ToastContainer />   {/* we can show toast notifications anywhere in the app now */}
        <div className="canvas">
           <GlobalStyle />              {/*Coming from global.js  = css */}
          <Header/>
          <TypingBox />
          <Footer/>
        </div>
    </ThemeProvider>
  );
}

export default App;
