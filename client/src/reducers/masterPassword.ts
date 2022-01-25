import { PayloadAction } from '@reduxjs/toolkit'



export const masterPasswordReducer = (masterPassword = '', action: PayloadAction<string>) => {
    switch (action.type) {
        case "SET_MASTER_PASSWORD":
            masterPassword = action.payload
            return masterPassword
        case "UNSET_MASTER_PASSWORD":
            masterPassword = ""
            return masterPassword
        default:
            return masterPassword
    }
}   