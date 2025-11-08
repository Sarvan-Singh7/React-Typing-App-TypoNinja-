import React from 'react'
import { useTestMode } from '../Context/TestModeContext'

const UpperMenu = ({countDown}) => {

   const {setTestTime} = useTestMode();

   const updateTime =(e) =>{
    setTestTime(Number (e.target.id));  //it is not working till we do not start using know this happen via state to given in typingBox component
   }

  return (
    <div className = "upperMenu"> {/* i used upperMenu class so to give css to it */}
      <div className="counter">
        {countDown}
      </div>
      <div className="modes">
        <div className="time-mode" id={15} onClick ={updateTime}>15</div>   {/*i used onClick Listener to Update Time on Click UsingContext Api*/}
        <div className="time-mode" id={30} onClick ={updateTime}>30</div>
        <div className="time-mode" id={60} onClick ={updateTime}>60</div>
      </div>
    </div>
  );
};

export default UpperMenu;
