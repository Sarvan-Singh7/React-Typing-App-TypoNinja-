import React, { useState, useRef , useEffect ,useMemo, createRef} from 'react';
import { generate } from 'random-words'; // generates random words
import UpperMenu from './UpperMenu';


const TypingBox = () => { 

   const[CountDown, setCountDown] = useState(15); //Timer (Count Timer State)
   const[testStart, setTestStart] = useState(false); //Timer (To check if test has started or not)
   const[testEnd, setTestEnd] = useState(false);     //Timer (To check if test has ended or not)
   const StartTimer =() => {                      //Timer (Timer Functionality added)
    const intervalId = setInterval(timer, 1000);
    function timer(){
      //setCountDown(CountDown - 1);   //this will stop after one time decrease as useState is asynchronous
      setCountDown((latestCountDown)=>{   //i used function form of useState to get latest value of CountDown
        if(latestCountDown === 1){
          clearInterval(intervalId);
          setTestEnd(true);
          return 0;
        }
        return latestCountDown - 1;
      })
    }
   } 


  // useState with function form → only runs once
  const [wordsArray, setWordsArray] = useState(() => generate(50));
  const[currWordIndex, setcurrWordIndex] = useState(0); // to keep track of current word
  const[currCharIndex, setcurrCharIndex] = useState(0); // to keep track of current character
  const inputRef = useRef(null);

  const handleUserInput=(e)=>{


    if(!testStart){    //Timer( to start the timer when user starts typing)
      StartTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes; //array created to hold all characters of current word 
    if(e.keyCode ===8){
      // backspace key pressed

         

      if(currCharIndex ===0) return; // if we are at starting of word and backspace is pressed then simply return
      if(currCharIndex !=0){

         if(allCurrChars.length === currCharIndex){
          if(allCurrChars[currCharIndex -1].className.includes('extra')){ // if there is an extra character and backspace is pressed then remove that extra character
            allCurrChars[currCharIndex -1].remove();
            allCurrChars[currCharIndex -2].className +=' right-current'; // give right current class to previous character
            
            }else{
                      allCurrChars[currCharIndex -1].className ='current'; // if we are at end of word and backspace is pressed then simply move cursor to last character

            }

        setcurrCharIndex(currCharIndex -1);
        return;
      }

         allCurrChars[currCharIndex].className =''; // remove current class from current character as now not incorrect nor correct
          allCurrChars[currCharIndex -1].className ='current'; // previous character ko current class de diya ys hmne cursor ko wapis piche le jane ke liye
          setcurrCharIndex(currCharIndex -1); // move back to previous character
      }

      return;
    }
    
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
    
   if(currCharIndex == allCurrChars.length){  // if current character index is equal to length of current word that means user is trying to type more characters than present in the word

      let newSpan = document.createElement('span'); // create a new span element
      newSpan.innerText = e.key; // set its text to the pressed key
      newSpan.className ='incorrect extra right-current'; // add incorrect and extra class to it
      allCurrChars[currCharIndex-1].classList.remove('right-current'); // remove right current class from previous character so now cursor can move also after this new character entered in word
      wordsSpanRef[currWordIndex].current.append(newSpan); // append this new span to the current word
      
      
      
      setcurrCharIndex(currCharIndex + 1); // move to next character
      return;
    }

    if(e.key === allCurrChars[currCharIndex].innerText){
      allCurrChars[currCharIndex].className ='correct'; // correct class add kar diya
    }else{
      allCurrChars[currCharIndex].className ='incorrect'; // incorrect class add kar diya
    }
    if(currCharIndex+1 === allCurrChars.length){  //agar current character last character hai current word ka so move to next word
      allCurrChars[currCharIndex].className +=' right-current'; 
    }else{                                        //agar last character nahi hai to simply move to next character matlb ki ek word ke kissi letter pe agar space press karte hai to next letter pe chala jaye
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
      <UpperMenu countDown = {CountDown} />
      {(testEnd) ? <h1>Test Ended</h1> : (<div className="type-box" onClick ={focusInput}>   {/* onClick calls focusInput function  because it needs to focus the hidden input */}
        <div className="words">
          {wordsArray.map((word, index) => (
            <span className="word" key={index} ref={wordsSpanRef[index]}>
              {word.split('').map((char, charIndex) => ( 
                <span key={charIndex}>{char}</span>
              ))}
            </span>
            
          ))}
        </div>
      </div>)}  {/* Timer(see that i used condition in this box )*/ }
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
