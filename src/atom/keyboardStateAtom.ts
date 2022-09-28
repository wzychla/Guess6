import { KeyboardContextPayload } from "@/context/keyboardContext";
import { atom } from "recoil";

const keyboardStateAtom = atom<KeyboardContextPayload>({
    key: 'keyboardAtom', 
    default: null
});

export default keyboardStateAtom;