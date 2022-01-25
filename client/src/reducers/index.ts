import { combineReducers } from "redux";
import { masterPasswordReducer } from "./masterPassword";
import { passwordsReducer } from "./passwords";
import { tokenReducer } from "./token";

export const allReducers = combineReducers({
    token: tokenReducer,
    passwords: passwordsReducer,
    masterPassword: masterPasswordReducer
})

export type RootState = ReturnType<typeof allReducers>