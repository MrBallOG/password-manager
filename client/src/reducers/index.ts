import { combineReducers } from "redux";
import { masterPasswordReducer } from "./masterPassword";
import { passwordsReducer } from "./passwords";
import { refreshTokenReducer } from "./refreshToken";
import { tokenReducer } from "./token";

export const allReducers = combineReducers({
    token: tokenReducer,
    passwords: passwordsReducer,
    masterPassword: masterPasswordReducer,
    refreshToken: refreshTokenReducer
})

export type RootState = ReturnType<typeof allReducers>