import React, { useContext, useEffect, useState } from 'react';
import Dictionary from './dictionary';
import Keyboard1 from './keyboard1';
import Keyboard2 from './keyboard2';
import Keyboard3 from './keyboard3';
import KeyboardContext from './context/keyboardContext';
import WordMatch from './wordMatch';
import { useAppSelector } from './store/hooks';

const App = () => {

  const EXPECTEDLENGTH = 6;

  // internal state
  const [words, setWords] = useState<Array<string>>([]);
  const [secretWord, setSecretWord] = useState<string>('');

  // shared context
  const {payload, } = useContext(KeyboardContext); // setPayload is ignored

  // state selector
  const keyboardInput = useAppSelector(state => state.keyboard);

  function getRandomWord(Dictionary: string[]): string {
    const randomIndex = Math.floor(Math.random() * (Dictionary.length));
    return Dictionary[randomIndex].toUpperCase();
  }

  function restartGame() {
      setWords([]);
      setSecretWord(getRandomWord(Dictionary));
  }
  
  // callback-passing communication: the callback 
  function onWordTyped( newWord: string ) {
      setWords( words => words.concat([newWord]) );   
  }

  function giveUp() {
    if ( secretWord.length == EXPECTEDLENGTH ) {
      setWords( words => words.concat( secretWord ) );
    }
  }

  // shared context communication: dependency on the context's payload
  useEffect( () => {
    if ( payload && payload.acceptedWord ) {
      setWords( words => words.concat( payload.acceptedWord ) );
    }
  }, [payload] );

  useEffect( () => {
    if ( keyboardInput && keyboardInput.acceptedWord ) {
      setWords( words => words.concat( keyboardInput.acceptedWord ) );
    }
  }, [keyboardInput]);

  useEffect( () => {
    restartGame();
  }, []);

  return <>  
    <div>
      <button className='flatButton' onClick={() => restartGame()}>NEW GAME</button>
      <button className='flatButton' onClick={() => giveUp()}>GIVE UP</button>
    </div>
    <h1>Enter {EXPECTEDLENGTH}-letter word</h1>
    {/* comment/uncomment a keyboard */}
    {/* callback-passing style */}
    <Keyboard1 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} onWordTyped={onWordTyped} />
    {/* shared-context */}
    {/* <Keyboard2 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} /> */}
    {/* redux store */}
    {/* <Keyboard3 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} /> */}
    {words.map( (word, index) => <WordMatch candidate={word} secret={secretWord} key={index} />)}
  </>
};

export default App;