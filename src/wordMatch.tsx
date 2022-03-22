import React, { useEffect, useState } from 'react';

const WordMatch = ({candidate, secret} : {candidate: string, secret: string}) => {

    const [letterStates, setLetterStates] = useState<Array<letterState>>([]);

    if ( candidate.length != secret.length ) {
        throw new Error('candidate and secret word must have same length');
    }

    type  letterState = 'MATCH' | 'USED' | undefined;

    function computeLetterClasses() : Array<letterState> {

        const candidateStates: Array<letterState> = 
            Array<letterState>(candidate.length);
        const secretStates: Array<letterState> = 
            Array<letterState>(candidate.length);
    
        // matches
        for ( let i=0; i<candidate.length; i++ ) {
            if ( secret[i] == candidate[i] ) {
                candidateStates[i] = "MATCH";
                secretStates[i] = "MATCH";
            }
        }
        // possible
        for ( let i=0; i<candidate.length; i++ ) {
            for ( let j=0; j<secret.length; j++ ) {
                if ( candidateStates[i] != 'MATCH' &&
                     secretStates[j] == undefined &&
                     candidate[i] == secret[j]
                    ) {
                        candidateStates[i] = 'USED';
                        secretStates[j] = 'USED';
                    }
            }
        }

        return candidateStates;
    }

    function getLetterClass( index: number ) : string {
        switch ( letterStates[index]) {
            case 'MATCH' :
                return 'letter letterMatch';
            case 'USED':
                return 'letter letterPossible';
            default:
                return 'letter letterWrong';
        }
    }

    useEffect( () => {
        setLetterStates( computeLetterClasses() );
    }, []);

    return <div>
        {candidate.split('').map( (letter, index) => 
            <span className={getLetterClass(index)} key={index}>{letter}</span>
        )}
    </div>;
}

export default WordMatch;