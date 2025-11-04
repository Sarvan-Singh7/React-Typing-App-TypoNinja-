import React, { useState, useRef , useEffect } from 'react';
import { generate } from 'random-words'; // generates random words

const TypingBox = () => {
  // useState with function form → only runs once
  const [wordsArray, setWordsArray] = useState(() => generate(55));
  const inputRef = useRef(null);

  const handleUserInput=(e)=>{
    console.log(e);
  }
  const focusInput = () =>{    //this focusInput function is to focus the hidden input when we click on the type-box or anywhere in the div
     inputRef.current.focus();
  }
  useEffect(() => {
    focusInput();   // Focus the input on component mount or page load
  },[]);

  return (
    <div>
      <div className="type-box" onClick ={focusInput}>   {/* onClick calls focusInput function  because it needs to focus the hidden input */}
        <div className="words">
          {wordsArray.map((word, wordIndex) => (
            <span className="word" key={wordIndex}>
              {word.split('').map((char, charIndex) => ( 
                <span key={charIndex}>{char}</span>
              ))}
              <span> </span> {/* Adds space between words */}
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
