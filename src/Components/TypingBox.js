import React, { useState, useRef, useEffect, useMemo, createRef } from 'react';
import { generate } from 'random-words'; // generates random words
import UpperMenu from './UpperMenu';
import { useTestMode } from '../Context/TestModeContext'
import Stats from './Stats';

const TypingBox = () => {
  const [graphData, setGraphData] = useState([]);//===GRAPH
  const [correctChars, setCorrectChars] = useState(0);//===WPM
  const [incorrectChars, setIncorrectChars] = useState(0);//===WPM
  const [missedChars, setMissedChars] = useState(0);//===WPM
  const [extraChars, setExtraChars] = useState(0); //===WPM
  const [correctWords, setCorrectWords] = useState(0); //===WPM

  const { testTime } = useTestMode();  //TImer2 (this comes from UpperMenu after set as Context used so it may be 15,30 or 60, now i used this to apply in useEffect used below)

  const [CountDown, setCountDown] = useState(testTime); //Timer (Count Timer State as set testTime because it will come after modification from Uppermenu that what to set it)
  const [testStart, setTestStart] = useState(false); //Timer (To check if test has started or not)
  const [testEnd, setTestEnd] = useState(false);     //Timer (To check if test has ended or not)
  const [intervalId, setIntervalId] = useState(null); //Timer2(there was a issue that  whenever i was changing mode between writting then it was showing not working correctly so used this )

  const StartTimer = () => {                      //Timer (Timer Functionality added)
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);  //Timer2
    function timer() {
      setCountDown((latestCountDown) => {   //i used function form of useState to get latest value of CountDown
        setCorrectChars((correctChars) => {
          setGraphData((graphData) => {
            return [...graphData, [
              testTime - latestCountDown + 1,
              (correctChars / 5) / ((testTime - latestCountDown + 1) / 60)
            ]];
          })
          return correctChars;
        })

        if (latestCountDown === 1) {
          clearInterval(intervalId);
          setTestEnd(true);
          return 0;
        }
        return latestCountDown - 1;
      })
    }
  }

  const resetTest = () => {////Timer2(i used this resetTest to pass to useEffect that whenever count option from UpeerMenu.jsx will change then we have to reset it via resetTest so this make to reset all )
    clearInterval(intervalId);  //Timer2(i cleared interval here)
    setCountDown(testTime);
    setcurrCharIndex(0);
    setcurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(500));
    resetWordsSpanRefClassname();
    focusInput();
  }

  const resetWordsSpanRefClassname = () => { //Timer2 (this function will be used when to reset words on new mode )
    wordsSpanRef.map(i => {
      Array.from(i.current.childNodes).map(j => {
        j.className = ' ';
      })
    });
    if (wordsSpanRef[0] && wordsSpanRef[0].current) {
      wordsSpanRef[0].current.childNodes[0].className = 'current'; //Timer2 (this will be usefull to do cursor at first character after refresh)
    }
  }

  // useState with function form → only runs once
  const [wordsArray, setWordsArray] = useState(() => generate(500)); //this will generate words by library random words.
  const [currWordIndex, setcurrWordIndex] = useState(0); // to keep track of current word
  const [currCharIndex, setcurrCharIndex] = useState(0); // to keep track of current character
  const inputRef = useRef(null);
  const [currentInput, setCurrentInput] = useState(''); // For mobile input tracking
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0; // Detect touch devices

  const handleUserInput = (e) => {
    if (testEnd) return;

    if (!testStart) {
      StartTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    if (e.keyCode === 8) {
      if (currCharIndex === 0) return;
      if (currCharIndex != 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += ' right-current';
          } else {
            allCurrChars[currCharIndex - 1].className = 'current';
          }
          setcurrCharIndex(currCharIndex - 1);
          return;
        }

        allCurrChars[currCharIndex].className = '';
        allCurrChars[currCharIndex - 1].className = 'current';
        setcurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    if (e.keyCode === 32) {
      let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove('right-current');
      }
      else {
        allCurrChars[currCharIndex].classList.remove('current');
        setMissedChars(missedChars + allCurrChars.length - currCharIndex);
      }

      if (wordsSpanRef[currWordIndex + 1]) {
        if (wordsSpanRef[currWordIndex + 1].current.offsetLeft < wordsSpanRef[currWordIndex].current.offsetLeft) {
          wordsSpanRef[currWordIndex + 1].current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
        setcurrWordIndex(currWordIndex + 1);
        setcurrCharIndex(0);
      } else {
        clearInterval(intervalId);
        setTestEnd(true);
      }
      return;
    }

    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement('span');
      newSpan.innerText = e.key;
      newSpan.className = 'incorrect extra right-current';
      allCurrChars[currCharIndex - 1].classList.remove('right-current');
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setcurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      allCurrChars[currCharIndex].className = 'correct';
      setCorrectChars(correctChars + 1);
    } else {
      allCurrChars[currCharIndex].className = 'incorrect';
      setIncorrectChars(incorrectChars + 1)
    }
    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += ' right-current';
    } else {
      allCurrChars[currCharIndex + 1].className = 'current';
    }
    setcurrCharIndex(currCharIndex + 1);
  }

  // Mobile input handler
  const handleMobileInput = (e) => {
    if (testEnd) return;

    if (!testStart) {
      StartTimer();
      setTestStart(true);
    }

    const value = e.target.value;
    const expectedWord = wordsArray[currWordIndex];

    // Handle backspace/deletion
    if (value.length < currentInput.length) {
      const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
      if (currCharIndex === 0) return;

      if (allCurrChars.length === currCharIndex) {
        if (allCurrChars[currCharIndex - 1].className.includes('extra')) {
          allCurrChars[currCharIndex - 1].remove();
          if (currCharIndex >= 2) {
            allCurrChars[currCharIndex - 2].className += ' right-current';
          }
        } else {
          allCurrChars[currCharIndex - 1].className = 'current';
        }
      } else {
        allCurrChars[currCharIndex].className = '';
        allCurrChars[currCharIndex - 1].className = 'current';
      }
      setcurrCharIndex(currCharIndex - 1);
      setCurrentInput(value);
      return;
    }

    // Handle space (move to next word)
    if (value.endsWith(' ')) {
      const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
      let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct');
      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[currCharIndex - 1].classList.remove('right-current');
      } else {
        allCurrChars[currCharIndex].classList.remove('current');
        setMissedChars(missedChars + allCurrChars.length - currCharIndex);
      }

      if (wordsSpanRef[currWordIndex + 1]) {
        if (wordsSpanRef[currWordIndex + 1].current.offsetLeft < wordsSpanRef[currWordIndex].current.offsetLeft) {
          wordsSpanRef[currWordIndex + 1].current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
        setcurrWordIndex(currWordIndex + 1);
        setcurrCharIndex(0);
      } else {
        clearInterval(intervalId);
        setTestEnd(true);
      }

      setCurrentInput('');
      e.target.value = '';
      return;
    }

    // Handle character input
    const newChar = value[value.length - 1];
    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    if (currCharIndex === allCurrChars.length) {
      // Extra characters
      let newSpan = document.createElement('span');
      newSpan.innerText = newChar;
      newSpan.className = 'incorrect extra right-current';
      allCurrChars[currCharIndex - 1].classList.remove('right-current');
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setcurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
    } else {
      // Normal character
      if (newChar === allCurrChars[currCharIndex].innerText) {
        allCurrChars[currCharIndex].className = 'correct';
        setCorrectChars(correctChars + 1);
      } else {
        allCurrChars[currCharIndex].className = 'incorrect';
        setIncorrectChars(incorrectChars + 1);
      }

      if (currCharIndex + 1 === allCurrChars.length) {
        allCurrChars[currCharIndex].className += ' right-current';
      } else {
        allCurrChars[currCharIndex + 1].className = 'current';
      }
      setcurrCharIndex(currCharIndex + 1);
    }

    setCurrentInput(value);
  }

  const calculateWPM = () => {   //===WPM(Give new WPM )
    return Math.round((correctChars / 5) / (testTime / 60));
  }
  const calculateAcc = () => {
    const totalTyped = correctChars + incorrectChars + missedChars + extraChars;
    if (totalTyped === 0) return 0;
    return Math.round((correctChars / totalTyped) * 100);
  };
  const focusInput = () => {    //this focusInput function is to focus the hidden input when we click on the type-box or anywhere in the div
    if (inputRef.current) inputRef.current.focus();
  }

  useEffect(() => {           //Timer2(also here whenever testTime changes i had to setCountDown time value)
    resetTest();
  }, [testTime])

  useEffect(() => {
    focusInput();   // Focus the input on component mount or page load
    if (wordsSpanRef[0] && wordsSpanRef[0].current) {
      wordsSpanRef[0].current.childNodes[0].className = 'current'; // first character of first word ko current class de diya
    }
  }, [wordsArray]); // Run when wordsArray changes (initial load + infinite scroll reset)

  const wordsSpanRef = useMemo(() => {    // to create array of refs for each word
    return Array(wordsArray.length).fill().map(i => createRef(null));  // creates array of refs jo ki wordsArray ke length ke barabar hoga AND YE TAB TAB MOUNT HOGA JAB WORDSARRAY CHANGE HOGA and also see that i used map over there because to convert it to array as i can apply map to arrays
  }, [wordsArray])

  return (
    <div>
      <UpperMenu countDown={CountDown} />
      {(testEnd) ? (<Stats           //see that i passed  props to Stats component so that it can show data.
        wpm={calculateWPM()}
        accuracy={calculateAcc()}
        correctChars={correctChars}
        incorrectChars={incorrectChars}
        missedChars={missedChars}
        extraChars={extraChars}
        graphData={graphData}

      />
      ) : (<div className="type-box" onClick={focusInput}>   {/* onClick calls focusInput function  because it needs to focus the hidden input */}
        <div className="words">
          {wordsArray.map((word, index) => (
            <span className="word" key={index} ref={wordsSpanRef[index]}>
              {word.split('').map((char, charIndex) => (
                <span key={charIndex}>{char}</span>
              ))}
            </span>

          ))}
        </div>
      </div>)}  {/* Timer(see that i used condition in this box )*/}
      <input
        type="text"
        value={isTouchDevice ? currentInput : undefined}
        onKeyDown={!isTouchDevice ? handleUserInput : undefined}
        onInput={isTouchDevice ? handleMobileInput : undefined}
        className="hidden-input"
        ref={inputRef}
      />

    </div>
  );
};

export default TypingBox;
