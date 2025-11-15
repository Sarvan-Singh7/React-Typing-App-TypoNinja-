import React from 'react';
import AccountCircle from './AccountCircle';  //crrater in different files so that dividr occurs bestly
const Header = () => {
  return(
    <div className="header">
      <div className="logo">
          LOGO
      </div>
      <div className="user-icon">
           {/*User Icon*/}
           <AccountCircle/>

      </div>
    </div>
  )
}
export default Header;