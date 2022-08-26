import React, { createContext } from "react";

// general idea based on
// https://levelup.gitconnected.com/how-to-use-context-with-react-hooks-5591a4010689

// 1. context is strongly typed
// 2. context is created once, here

type KeyboardContextPayload = {
    acceptedWord: string
}

type KeyboardContextType = {
    payload: KeyboardContextPayload,
    setPayload: (w: KeyboardContextPayload) => void //React.Dispatch<React.SetStateAction<string>>
};

const KeyboardContext = createContext<KeyboardContextType>({ payload: null, setPayload: null });

export { KeyboardContextPayload };

export default KeyboardContext;