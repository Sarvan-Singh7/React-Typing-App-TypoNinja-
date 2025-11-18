import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import {TestModeContextProvider} from "./Context/TestModeContext"
import {ThemeContextProvider} from "./Context/ThemeContext"
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>    {/*see here i also impored ThemeCOntext to provide it to all */}
        <TestModeContextProvider>  {/*see here that i wrap my app component under App so that every component of  a file can get acces to it */}
          <BrowserRouter>          {/* we need to wrap our entire app in BrowserRouter to use routing anywhere in the app */}
            <App />
          </BrowserRouter>
        </TestModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

