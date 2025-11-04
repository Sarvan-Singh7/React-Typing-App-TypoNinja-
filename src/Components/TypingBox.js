import React, { useState, useRef , useEffect ,useMemo, createRef} from 'react';
import { generate } from 'random-words'; // generates random words

const TypingBox = () => {
  // useState with function form → only runs once
  const [wordsArray, setWordsArray] = useState(() => generate(50));
  const[currWordIndex, setcurrWordIndex] = useState(0);
  const[currCharIndex, setcurrCharIndex] = useState(0);
  const inputRef = useRef(null);

  const handleUserInput=(e)=>{
    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes; //array created to hold all characters of current word
    
    if(e.key === allCurrChars[currCharIndex].innerText){
      allCurrChars[currCharIndex].className ='correct'; // correct class add kar diya
      setcurrCharIndex(currCharIndex + 1);
    }
    else{
      allCurrChars[currCharIndex].className ='incorrect'; // incorrect class add kar diya
      setcurrCharIndex(currCharIndex + 1);
    }
    
  }
  const focusInput = () =>{    //this focusInput function is to focus the hidden input when we click on the type-box or anywhere in the div
     inputRef.current.focus();
  }

  useEffect(() => {
    focusInput();   // Focus the input on component mount or page load
    wordsSpanRef[0].current.childNodes[0].className ='current'; // first character of first word ko current class de diya
  },[]);
   
  const wordsSpanRef = useMemo(() => {    // to create array of refs for each word
    return Array(wordsArray.length).fill().map(i => createRef(null));  // creates array of refs jo ki wordsArray ke length ke barabar hoga
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
