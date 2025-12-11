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
            style={{ color: theme.textColor }}
          >
            <GitHubIcon 
              style={{
                marginRight:'4px',
                color: theme.textColor,
                transition: "0.2s ease"
              }}
            />
          </a>

          {/* LinkedIn icon */}
          <a 
            href='https://www.linkedin.com/in/sarvan-singh-6b3b27390/' 
            target="_blank"
            style={{ color: theme.textColor }}
          >
            <LinkedInIcon 
              style={{
                color: theme.textColor,
                transition: "0.2s ease"
              }}
            />
          </a>

        </div>
      </div>

      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement='top'
          defaultValue={{ label: theme.label, value: theme }}
          styles={{
            control: (styles) => ({ 
              ...styles, 
              backgroundColor: theme.backgroundColor,
              borderColor: theme.textColor,
              border: `2px solid ${theme.textColor}`,
            }),
            menu: (styles) => ({ 
              ...styles, 
              backgroundColor: theme.backgroundColor,
            }),
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: (isFocused) ? theme.textColor : theme.backgroundColor,
                color: (isFocused) ? theme.backgroundColor : theme.textColor,
                cursor: 'pointer'
              }
            },
            singleValue: (styles) => ({
              ...styles,
              color: theme.textColor,
            }),
          }}
        />
      </div>
    </div>
  )
}

export default Footer
