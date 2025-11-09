import {createContext} from 'react';
import {themeOptions} from '../Utils/themeOptions';
import{useState, useContext} from 'react';
const ThemeContext = createContext();

export const ThemeContextProvider =({children}) => {

  const[theme,setTheme] = useState(themeOptions[0].value);

  const values = {
    theme,
    setTheme
  }

  return(<ThemeContext.Provider value = {values}>{children}</ThemeContext.Provider>)
}

export const useTheme =() => useContext(ThemeContext);   //this useTheme prop will be used in a component which i want to use props from context