import React from 'react';
import { GlobalStyle } from './Styles/global';
import TypingBox from './Components/TypingBox';
import Footer from './Components/Footer';
import { useTheme } from './Context/ThemeContext'
import {ThemeProvider} from 'styled-components'   //imported themeProvider

function App() {
  const {theme} = useTheme();  // see that i used Context ki thems and used below
  return (
    

    <ThemeProvider theme = {theme}>    {/*ThemeProvider will propagates all theme values to your components and i can use it anywhere i want */}
        
        <div className="canvas">
           <GlobalStyle />              {/*Coming from global.js  = css */}
          <div>Header</div>
          <TypingBox />
          <Footer/>
        </div>
    </ThemeProvider>
  );
}

export default App;
