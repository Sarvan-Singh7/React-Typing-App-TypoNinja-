import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {

  const[testTime, setTestTime] = useState(15);

  const values ={   //i pass these useState both properties to COntext so i can acces it from any component
    testTime,
    setTestTime
  }

  return (<TestModeContext.Provider value ={values}>{children}</TestModeContext.Provider>)

}
export const useTestMode = () => useContext(TestModeContext);  ///i used this useTestMode function to use inn another components in another components i just import this file and use this function anywhere
                                   