import React from 'react';
import { GlobalStyle } from './Styles/global';
import TypingBox from './Components/TypingBox'
function App() {
  return (
    <>
      <div className="App">
        
        <div className="canvas">
           <GlobalStyle />
          <div>Header</div>
          <TypingBox />
          <div>Footer</div>
        </div>
      </div>
    </>
  );
}

export default App;
