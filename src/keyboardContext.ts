import React, { createContext } from "react";

// https://levelup.gitconnected.com/how-to-use-context-with-react-hooks-5591a4010689
type KeyboardContextType = {
    acceptedWord: string,
    setAcceptedWord: React.Dispatch<React.SetStateAction<string>>
};

const KeyboardContext = createContext<KeyboardContextType>({ acceptedWord: '', setAcceptedWord: w => {}});

export default KeyboardContext;