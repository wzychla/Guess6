import { configureStore } from '@reduxjs/toolkit'

import { KeyboardContextPayload } from '../context/keyboardContext';
import keyboardReducer from '@/store/keyboardSlice';

const emptyStore: { keyboard: KeyboardContextPayload } = { keyboard: { acceptedWord: '' } };

// tworzenie store
const store = configureStore({
    reducer: keyboardReducer,
    preloadedState: emptyStore,
    // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
    /*
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    */
});

// https://redux-toolkit.js.org/tutorials/typescript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store; 