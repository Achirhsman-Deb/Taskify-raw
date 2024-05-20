import React, { useEffect } from 'react';

const One = () => {
    useEffect(() => {
        let words = document.querySelectorAll('.word');
        words.forEach((word) => {
          let letters = word.textContent.split('');
          word.textContent = '';
          letters.forEach((letter) => {
            let span = document.createElement('span');
            span.textContent = letter;
            span.className = 'letter';
            word.append(span);
          });
        });
    
        let currentWordIndex = 0;
        let maxWordIndex = words.length - 1;
        words[currentWordIndex].style.opacity = '1';
    
        const rotateText = () => {
          let currentWord = words[currentWordIndex];
          let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
          // rotate out letters of current word
          Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
              letter.className = 'letter out';
            }, i * 80);
          });
          // reveal and rotate in letters of next word
          nextWord.style.opacity = '1';
          Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = 'letter behind';
            setTimeout(() => {
              letter.className = 'letter in';
            }, 340 + i * 80);
          });
          currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
        };
    
        rotateText();
        const intervalId = setInterval(rotateText, 4000);
    
        return () => clearInterval(intervalId);
      }, []);

       
    
      return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
          <div className="flex flex-col items-center text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
            <div className='mb-[5vh] text-5xl md:text-7xl'>Welcome to Taskify</div>
            <p className="m-0">
                A simple and handy tool for
            </p>
            <p className="relative m-0">
              <span className="absolute w-full flex justify-center opacity-0 text-red-500 word">Task Management</span>
              <span className="absolute w-full flex justify-center opacity-0 text-purple-500 word">Routine Planning</span>
              <span className="absolute w-full flex justify-center opacity-0 text-blue-500 word">Study Schedules</span>
              <span className="absolute w-full flex justify-center opacity-0 text-green-500 word">Event Planning</span>
              <span className="absolute w-full flex justify-center opacity-0 text-yellow-500 word">Diet Management</span>
            </p>
          </div>
          <style jsx>{`
            .letter {
              display: inline-block;
              transform-origin: center center 25px;
            }
            .letter.out {
              transform: rotateX(90deg);
              transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
            }
            .letter.in {
              transition: 0.38s ease;
            }
            .letter.behind {
              transform: rotateX(-90deg);
            }
          `}</style>
        </div>
      );
};

export default One;
