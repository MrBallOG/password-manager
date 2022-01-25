import { PayloadAction } from '@reduxjs/toolkit'

let accessToken = {
    "token": "",
    "token_type": "bearer"
}

export const tokenReducer = (token = accessToken, action: PayloadAction<string>) => {
    switch (action.type) {
        case "SET_TOKEN":
            token.token = action.payload
            return token
        case "UNSET_TOKEN":
            token.token = ""
            return token
        default:
            return token
    }
}   