import { PayloadAction } from '@reduxjs/toolkit'

export interface IPassword {
    id?: Number
    service: String
    username: String
    email: String
    password: String
}

export const passwordsReducer = (passwords: Array<IPassword> = [], action: PayloadAction<IPassword[]>) => {
    switch (action.type) {
        case "ADD_PASSWORDS":
            return action.payload
        case "DELETE_PASSWORDS":
            return []
        default:
            return passwords
    }
}