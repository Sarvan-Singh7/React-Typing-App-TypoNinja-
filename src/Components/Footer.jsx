import React, { useState } from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions'
import { useTheme } from '../Context/ThemeContext'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () =>{             //THEME OPTIONS BY USER
  const { setTheme, theme } = useTheme();            //theme as set by user
  
  const handleChange = (e) =>{              //this function will be handling user-input on theme

    setTheme(e.value);                //i wrap all set to handleChange
    localStorage.setItem("theme", JSON.stringify(e.value));  //LOCAL STORAGE FOR THEMES should be stringify to convert e.value which was in js object to  JSON-formatted string
  }

  return (
    <div className="footer">
      <div className="actual-footer">
        <div className="links">
          
          {/* Github icon */}
          <a 
            href='https://github.com/Sarvan-Singh7' 
            target="_blank"
            style={{ color: theme.textColor }}    //  icon color based on theme
          >
            <GitHubIcon 
              style={{
                marginRight:'4px',
                color: theme.textColor,           //  dynamic icon color
                transition: "0.2s ease"
              }}
            />
          </a>

          {/* LinkedIn icon */}
          <a 
            href='https://www.linkedin.com/in/sarvan-singh-6b3b27390/' 
            target="_blank"
            style={{ color: theme.textColor }}    //  icon color based on theme
          >
            <LinkedInIcon 
              style={{
                color: theme.textColor,           //  dynamic icon color
                transition: "0.2s ease"
              }}
            />
          </a>

        </div>
      </div>

      <div className="themeButton">
        <Select                       //ye Select Component toh import kiya hai react-select npm se sara styles wagara le raha hai
          onChange={handleChange}    //this is a function work on new theme select
          options={themeOptions}
          menuPlacement='top'
          defaultValue={{ label: theme.label, value: theme }}
          styles={{
            control: (styles) => ({ 
              ...styles, 
              backgroundColor: theme.backgroundColor, // color of the select bar itself
            }),
            menu: (styles) => ({ 
              ...styles, 
              backgroundColor: theme.backgroundColor, // color of the dropdown menu
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: (isFocused) ? theme.background : theme.textColor,
                color: (isFocused) ? theme.textColor : theme.typeBoxText,
                cursor: 'pointer'
              }
            },
          }}
        />
      </div>
    </div>
  )
}

export default Footer
