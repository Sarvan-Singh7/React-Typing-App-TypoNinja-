import {createContext} from 'react';
import {themeOptions} from '../Utils/themeOptions';
import{useState, useContext} from 'react';
const ThemeContext = createContext();

export const ThemeContextProvider =({children}) => {
                                                              //LOCAL STORAGE
  const defaultValue = JSON.parse(localStorage.getItem('theme'))  ||   themeOptions[0].value   //see here if there will be not any localStorage so || ke baad wali accors and if local storage present so i have to parse(stringify to object) it to js for use .

  const[theme,setTheme] = useState(defaultValue);

  const values = {
    theme,
    setTheme
  }

  return(<ThemeContext.Provider value = {values}>{children}</ThemeContext.Provider>)
}

export const useTheme =() => useContext(ThemeContext);   //this useTheme prop will be used in a component which i want to use props from context