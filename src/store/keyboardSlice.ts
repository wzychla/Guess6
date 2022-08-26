import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { KeyboardContextPayload } from '@/context/keyboardContext';

const emptyKeyboardSlice: { keyboard: KeyboardContextPayload } = { keyboard: { acceptedWord: '' } };

/**
 * This async thunk is a thunk that accepts a string (a word) and return an action payload
 * Since its async, the body can perform an async operation (like fetching from a server)
 */
export const wordTypedActionFactory = createAsyncThunk<KeyboardContextPayload, string>(
    "keyboard/wordTyped",
    async (word) => {
      // can do anything async with the argument (word)
      return { acceptedWord: word }
    }
);

export const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: emptyKeyboardSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( wordTypedActionFactory.fulfilled, (state, action) => {
      // when the thunk ends, it returns action payload (but can do it asynchronously)
      // the state is mutatedby this reducer and since createSlice use Immer internally 
      // (https://immerjs.github.io/immer/)
      // (https://redux-toolkit.js.org/usage/immer-reducers)
      // state can be "modified" (normally we'd have to create a new state)
      state.keyboard = action.payload;
    });
  }
});

export default keyboardSlice.reducer