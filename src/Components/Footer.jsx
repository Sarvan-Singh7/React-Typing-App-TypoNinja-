import React ,{useState} from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions'
import { useTheme } from '../Context/ThemeContext'
const Footer = () =>{             //THEME OPTIONS BY USER
     const [value, setValue] = useState({});   //value as pressed by user
     const {setTheme} = useTheme();            //theme as set by user
     const handleChange = (e) =>{              //this function will be handling user-input on theme
        setValue(e.value);
        setTheme(e.value);                //i wrap all set to handleChange
     }
  return(
    <div className="footer">
        <div className="links">
          Links
        </div>
        <div className="themeButton">
          <Select                       //ye Select Component toh import kiya hai react-select npm se
              value={value}
              onChange={handleChange}    //this is a function work on new theme select
              options={themeOptions}
              menuPlacement='top'
      />
        </div>
    </div>
  )
}
export default Footer