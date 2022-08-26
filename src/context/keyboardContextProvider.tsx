import React, { ReactNode, useState } from "react";
import KeyboardContext, { KeyboardContextPayload } from "./keyboardContext"

// https://www.carlrippon.com/react-children-with-typescript/
// context provider wraps the app and creates a shared state that is put into the context
const KeyboardContextProvider = ({children} : {children: ReactNode}) => {

    const [payload, setPayload] = useState<KeyboardContextPayload>(null);
    const context = {payload, setPayload};

    return <KeyboardContext.Provider value={context}>
        {children}
    </KeyboardContext.Provider>
}

export default KeyboardContextProvider;