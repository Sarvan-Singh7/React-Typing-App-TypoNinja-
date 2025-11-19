import React from 'react';
import AccountCircle from './AccountCircle';  //crrater in different files so that dividr occurs bestly
import Logo from './Logo';
const Header = () => {
  return(
    <div className="header">
      <div className="logo">
          <Logo />
      </div>
      <div className="user-icon">
           {/*User Icon*/}
           <AccountCircle/>

      </div>
    </div>
  )
}
export default Header;