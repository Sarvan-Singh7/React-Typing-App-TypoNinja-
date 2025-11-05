import React, { useState, useRef , useEffect ,useMemo, createRef} from 'react';
import { generate } from 'random-words'; // generates random words

const TypingBox = () => {
  // useState with function form → only runs once
  const [wordsArray, setWordsArray] = useState(() => generate(50));
  const[currWordIndex, setcurrWordIndex] = useState(0); // to keep track of current word
  const[currCharIndex, setcurrCharIndex] = useState(0); // to keep track of current character
  const inputRef = useRef(null);

  const handleUserInput=(e)=>{
    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes; //array created to hold all characters of current word 

    if(e.keyCode ===32){
      // space key pressed

      if(allCurrChars.length <= currCharIndex){
        allCurrChars[currCharIndex -1].classList.remove('right-current'); // remove right current class if space is pressed at end of word
      }
      else{
        allCurrChars[currCharIndex].classList.remove('current'); // remove current class if space is pressed in between
      }
      wordsSpanRef[currWordIndex+1].current.childNodes[0].className ='current'; // first character of next word ko current class de diya
      setcurrWordIndex(currWordIndex + 1); // move to next word
      setcurrCharIndex(0); // reset character index to 0
      return;
    }
    
    if(e.key === allCurrChars[currCharIndex].innerText){
      allCurrChars[currCharIndex].className ='correct'; // correct class add kar diya
    }else{
      allCurrChars[currCharIndex].className ='incorrect'; // incorrect class add kar diya
    }
    if(currCharIndex+1 === allCurrChars.length){  //agar current character last character hai current word ka so move to next word
      allCurrChars[currCharIndex].className +=' right-current';
    }else{                                        //agar last character nahi hai to simply move to next character
      allCurrChars[currCharIndex+1].className = 'current';
    }

    setcurrCharIndex(currCharIndex + 1);// move to next character
    
  }
  const focusInput = () =>{    //this focusInput function is to focus the hidden input when we click on the type-box or anywhere in the div
     inputRef.current.focus();
  }

  useEffect(() => {
    focusInput();   // Focus the input on component mount or page load
    wordsSpanRef[0].current.childNodes[0].className ='current'; // first character of first word ko current class de diya
  },[]);
   
  const wordsSpanRef = useMemo(() => {    // to create array of refs for each word
    return Array(wordsArray.length).fill().map(i => createRef(null));  // creates array of refs jo ki wordsArray ke length ke barabar hoga AND YE TAB TAB MOUNT HOGA JAB WORDSARRAY CHANGE HOGA
  },[wordsArray])

  return (
    <div>
      <div className="type-box" onClick ={focusInput}>   {/* onClick calls focusInput function  because it needs to focus the hidden input */}
        <div className="words">
          {wordsArray.map((word, index) => (
            <span className="word" key={index} ref={wordsSpanRef[index]}>
              {word.split('').map((char, charIndex) => ( 
                <span key={charIndex}>{char}</span>
              ))}
            </span>
            
          ))}
        </div>
      </div>
      <input
        type="text"
        onKeyDown={handleUserInput}
        className="hidden-input"
        ref={inputRef}
      />
       
    </div>
  );
};

export default TypingBox;
