import React, { ReactNode, useState } from "react";
import KeyboardContext from "./keyboardContext"

// https://www.carlrippon.com/react-children-with-typescript/
const KeyboardContextProvider = ({children} : {children: ReactNode}) => {

    const [acceptedWord, setAcceptedWord] = useState<string>('');
    const context = {acceptedWord, setAcceptedWord};

    return <KeyboardContext.Provider value={context}>
        {children}
    </KeyboardContext.Provider>
}

export default KeyboardContextProvider;