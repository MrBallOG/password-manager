import { password } from '../reducers/passwords'

export const setPassword = (password: password) => {
    return {
        type: "SET_PASSWORD",
        payload: password
    }
}

export const addPassword = (password: password) => {
    return {
        type: "ADD_PASSWORD",
        payload: password
    }
}

export const deletePassword = (password: password) => {
    return {
        type: "DELETE_PASSWORD",
        payload: password
    }
}