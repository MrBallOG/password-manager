import { IPassword } from '../reducers/passwords'

export const setPassword = (password: IPassword) => {
    return {
        type: "SET_PASSWORD",
        payload: password
    }
}

export const addPassword = (password: IPassword) => {
    return {
        type: "ADD_PASSWORD",
        payload: password
    }
}

export const deletePassword = (password: IPassword) => {
    return {
        type: "DELETE_PASSWORD",
        payload: password
    }
}

export const deletePasswords = () => {
    return {
        type: "DELETE_PASSWORDS"
    }
}