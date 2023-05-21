import { useState, useEffect, useRef } from 'react';
import dictionary from '../utils/wordDictionary';
import '../styles/GamePlayArea.css';

const GameplayArea = () => {
  const [circleLetter, setCircleLetter] = useState('');
  const [dropping, setDropping] = useState(false);
  const [score, setScore] = useState(0);
  const [wordArray, setWordArray] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const gameplayAreaRef = useRef(null);

  useEffect(() => {
    gameplayAreaRef.current.focus();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      if (dropping) {
        const animationDuration = 3000; // Adjust this value as needed
        const timer = setTimeout(() => {
          setDropping(false);
          if(wordArray.length === 3) {
            checkWordValidity();
          }
        }, animationDuration);
  
        return () => clearTimeout(timer);
      } else {
        generateNewLetter();
        setDropping(true);
      }
    }
  }, [dropping, gameOver]);

  const handleKeyPress = (event) => {
    if (!gameOver && (event.key === 's' || event.key === 'S')) {
      if (dropping) {
        const newWordArray = [...wordArray, circleLetter];
        setWordArray(newWordArray);
        setDropping(false);
        checkWordValidity(newWordArray);
      } else {
        generateNewLetter();
        setDropping(true);
      }
    }
  };

  const generateNewLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    setCircleLetter(alphabet[randomIndex]);
  };

  const checkWordValidity = (newWordArray) => {
    if (newWordArray.length === 3) {
      const word = newWordArray.join('');
      const isValid = isWordValid(word);
      if (isValid) {
        setScore(score + 10);
      } else {
        setScore(score - 10);
      }
      setWordArray([]);
    }
  };

  const isWordValid = (word) => {
    return dictionary.includes(word.toLowerCase());
  };

  useEffect(() => {
    if (score < 0) {
      setGameOver(true);
    }
  }, [score]);

  return (
    <>
    <div
      className={`gameplay-area ${dropping ? 'dropping' : ''}`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      ref={gameplayAreaRef}
      >
      {dropping && (
        <div className="circle">{circleLetter}</div>
        )}
      {gameOver && (
        <div className="game-over">Game Over</div>
    )}  
    </div>
    <div className="scoreboard">
      <div className="word-array">
        Letters Selected 
        <p>{wordArray.join('')}</p>
      </div>
      <div className="score">
        Score
      <p>{score}</p>
      </div>
    </div>
    </>
  );
};

export default GameplayArea;

