import React, { useContext, useEffect, useState } from 'react';
import Dictionary from './dictionary';
import Keyboard1 from './keyboard1';
import Keyboard2 from './keyboard2';
import Keyboard3 from './keyboard3';
import Keyboard4 from './keyboard4';

import KeyboardContext from './context/keyboardContext';
import WordMatch from './wordMatch';
import { useAppSelector } from './store/hooks';
import keyboardStateAtom from './atom/keyboardStateAtom';
import { useRecoilState } from 'recoil';

const App = () => {

  const EXPECTEDLENGTH = 6;

  // internal state
  const [words, setWords] = useState<Array<string>>([]);
  const [secretWord, setSecretWord] = useState<string>('');

  // keyboard2: shared Context
  const {payload, } = useContext(KeyboardContext); // setPayload is ignored

  // keyboard3: Redux state selector
  const keyboardInput = useAppSelector(state => state.keyboard);

  // keyboard4: Recoil state
  const [keyboardAtom, setKeyboardAtom] = useRecoilState(keyboardStateAtom);  
  
  function getRandomWord(Dictionary: string[]): string {
    const randomIndex = Math.floor(Math.random() * (Dictionary.length));
    return Dictionary[randomIndex].toUpperCase();
  }

  function restartGame() {
      setWords([]);
      setSecretWord(getRandomWord(Dictionary));
  }
  
  function giveUp() {
    if ( secretWord.length == EXPECTEDLENGTH ) {
      setWords( words => words.concat( secretWord ) );
    }
  }

  // keyboard1: callback-passing communication, the callback 
  function onWordTyped( newWord: string ) {
    setWords( words => words.concat([newWord]) );   
  }

  // keyboard2: shared Context: dependency to the context's payload
  useEffect( () => {
    if ( payload && payload.acceptedWord ) {
      setWords( words => words.concat( payload.acceptedWord ) );
    }
  }, [payload] );

  // keyboard3: dependency resolved by the Redux selector
  useEffect( () => {
    if ( keyboardInput && keyboardInput.acceptedWord ) {
      setWords( words => words.concat( keyboardInput.acceptedWord ) );
    }
  }, [keyboardInput]);

  // keyboard4: dependency resolved by the Recoil's atom
  useEffect( () => {
    if ( keyboardAtom && keyboardAtom.acceptedWord ) {
      setWords( words => words.concat( keyboardAtom.acceptedWord ) );
    }
  }, [keyboardAtom]);

  useEffect( () => {
    restartGame();
  }, []);

  return <>  
    <div>
      <button className='flatButton' onClick={() => restartGame()}>NEW GAME</button>
      <button className='flatButton' onClick={() => giveUp()}>GIVE UP</button>
    </div>
    <h1>Enter {EXPECTEDLENGTH}-letter word</h1>
    
    {/* comment/uncomment one of keyboards to see various ways of passing data between parent (App) and child (Keyboard) */}

    {/* Callback */}
    {/* <Keyboard1 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} onWordTyped={onWordTyped} /> */}

    {/* Shared Context */}
    {/* <Keyboard2 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} /> */}

    {/* Redux store */}
    {/* <Keyboard3 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} /> */}

    {/* Recoil atom */}
    <Keyboard4 dictionary={Dictionary} expectedLength={EXPECTEDLENGTH} /> 

    {words.map( (word, index) => <WordMatch candidate={word} secret={secretWord} key={index} />)}
  </>
};

export default App;