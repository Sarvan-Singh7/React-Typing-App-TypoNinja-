import React from 'react';
import { GlobalStyle } from './Styles/global';
function App() {
  return (
    <>
      <div className="App">
       
        <div className="canvas">
           <GlobalStyle />
          <div>Header</div>
          <div>Main</div>
          <div>Footer</div>
        </div>
      </div>
    </>
  );
}

export default App;
