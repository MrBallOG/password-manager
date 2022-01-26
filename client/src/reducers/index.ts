import { combineReducers } from "redux";
import { vaultKeyReducer } from "./vaultKey";
import { passwordsReducer } from "./passwords";
import { refreshTokenReducer } from "./refreshToken";
import { tokenReducer } from "./token";

export const allReducers = combineReducers({
    token: tokenReducer,
    passwords: passwordsReducer,
    vaultKey: vaultKeyReducer,
    refreshToken: refreshTokenReducer
})

export type RootState = ReturnType<typeof allReducers>