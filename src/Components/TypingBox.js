import React, { useState } from 'react';
import { generate } from 'random-words'; // generates random words

const TypingBox = () => {
  // useState with function form → only runs once
  const [wordsArray, setWordsArray] = useState(() => generate(50));

  return (
    <div>
      <div className="type-box">
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
    </div>
  );
};

export default TypingBox;
