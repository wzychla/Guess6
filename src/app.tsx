import React, { useContext, useEffect, useState } from 'react';
import Dictionary from './dictionary';
import Keyboard from './keyboard';
import KeyboardContext from './keyboardContext';
import WordMatch from './wordMatch';

const App = () => {

  const EXPECTEDLENGTH = 6;

  const [words, setWords] = useState<Array<string>>([]);
  const [secretWord, setSecretWord] = useState<string>('');

  const {acceptedWord, setAcceptedWord} = useContext(KeyboardContext);

  function getRandomWord(Dictionary: string[]): string {
    const randomIndex = Math.floor(Math.random() * (Dictionary.length));
    return Dictionary[randomIndex].toUpperCase();
  }

  function restartGame() {
      setWords([]);
      setSecretWord(getRandomWord(Dictionary));
  }
  
  function onWordTyped( newWord: string ) {
  //  setWords( words => words.concat([newWord]) );   
  }

  function giveUp() {
    if ( secretWord.length == EXPECTEDLENGTH ) {
      setWords( words => words.concat( secretWord ) );
    }
  }

  useEffect( () => {
    setWords( words => words.concat( acceptedWord ) );
  }, [acceptedWord] );

  useEffect( () => {
    restartGame();
  }, []);

  return <>  
    <div>
      <button className='flatButton' onClick={() => restartGame()}>NEW GAME</button>
      <button className='flatButton' onClick={() => giveUp()}>GIVE UP</button>
    </div>
    <h1>Enter {EXPECTEDLENGTH}-letter word</h1>
    <Keyboard dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} onWordTyped={onWordTyped} />
    {words.map( (word, index) => <WordMatch candidate={word} secret={secretWord} key={index} />)}
  </>
};

export default App;