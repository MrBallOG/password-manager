import { PayloadAction } from '@reduxjs/toolkit'

export const masterPasswordReducer = (masterPassword = "", action: PayloadAction<string>) => {
    switch (action.type) {
        case "SET_MASTER_PASSWORD":
            return action.payload
        case "UNSET_MASTER_PASSWORD":
            return ""
        default:
            return masterPassword
    }
}   