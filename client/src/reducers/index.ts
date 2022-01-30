import { combineReducers } from "redux";
import { vaultKeyReducer } from "./vaultKey";
import { passwordsReducer } from "./passwords";
import { refreshTokenReducer } from "./refreshToken";
import { tokenReducer } from "./token";
import { loadingReducer } from "./loading";

export const allReducers = combineReducers({
    token: tokenReducer,
    refreshToken: refreshTokenReducer,
    passwords: passwordsReducer,
    vaultKey: vaultKeyReducer,
    loading: loadingReducer
})

export type RootState = ReturnType<typeof allReducers>