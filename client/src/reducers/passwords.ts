import { PayloadAction } from '@reduxjs/toolkit'

export interface password {
    id: Number,
    service: String,
    username: String,
    email: String,
    password: String
}

export const passwordsReducer = (passwords: Array<password> = [], action: PayloadAction<password>) => {
    switch (action.type) {
        case "SET_PASSWORD":
            let index = passwords.findIndex(p => p.id === action.payload.id);
            passwords[index] = action.payload
            return passwords
        case "ADD_PASSWORD":
            passwords.push(action.payload)
            return passwords
        case "DELETE_PASSWORD":
            passwords = passwords.filter(p => p.id !== action.payload.id)
            return passwords
        default:
            return passwords
    }
}