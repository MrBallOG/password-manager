import { PayloadAction } from '@reduxjs/toolkit'

export const vaultKeyReducer = (vaultKey = "", action: PayloadAction<string>) => {
    switch (action.type) {
        case "SET_VAULT_KEY":
            return action.payload
        case "UNSET_VAULT_KEY":
            return ""
        default:
            return vaultKey
    }
}   