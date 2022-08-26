import React, { useRef, useState } from 'react';

/**
 * Callback-passing communication. The parent component passes a callback that is used by the child component
 */
const Keyboard1 = ({dictionary, expectedLength, onWordTyped} : {dictionary: string[] | undefined, expectedLength: number, onWordTyped: (word: string) => void}) => {

    // internal state
    const [message, setMessage] = useState<string>('');
    const [word, setWord]       = useState<string>('');

    const dictOnly              = useRef<HTMLInputElement>();

    const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const QWERTY  = "QWERTYUIOP";
    const ASDF    = "ASDFGHJKL";
    const ZXCV    = "ZXCVBNM";

    function appendLetter(letter: string) {
        if ( word.length < expectedLength ) {
            setWord( w => w + letter );
            setMessage('');
        }
    }

    function clearWord() {
        setWord('');
        setMessage('');
    }

    function tryAcceptWord() {
        if ( word.length != expectedLength ) {
            setMessage(`Expected ${expectedLength} characters, got ${word.length} so far`);
            return;
        } 
        
        if ( dictOnly.current.checked &&
             dictionary !== undefined && 
             dictionary.map( w => w.toUpperCase() ).indexOf( word ) < 0 ) {
            setMessage(`Word ${word} not in dictionary`);
            return;
        }

        // call the parent's callback
        onWordTyped(word);
        
        setWord('');
    }

    return <div>
        <div>
            <input className='keyboardInput' value={word} readOnly />
        </div>
        <div className='firstRow'>
            {QWERTY.split('').map( (letter) => <button className='letterButton flatButton'  
                onClick={() => appendLetter(letter)} key={letter}>{letter}</button> )}
        </div>
        <div className='secondRow'>
            {ASDF.split('').map( (letter) => <button className='letterButton flatButton'  
                onClick={() => appendLetter(letter)} key={letter}>{letter}</button> )}
            <button className='flatButton' onClick={() => clearWord()}>DEL</button>
        </div>
        <div className='thirdRow'>
            {ZXCV.split('').map( (letter) => <button className='letterButton flatButton'  
                onClick={() => appendLetter(letter)} key={letter}>{letter}</button> )}
            <button className='flatButton' onClick={() => tryAcceptWord()}>ENTER</button>
        </div>
        <div><input type='checkbox' defaultChecked={true} ref={dictOnly} id='dictOnly' /><label htmlFor='dictOnly'>Only words from the dictionary</label> </div>
        <div>{message}</div>
    </div>;
}

export default Keyboard1;