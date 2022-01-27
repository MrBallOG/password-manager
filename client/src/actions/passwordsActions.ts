import { IPassword } from '../reducers/passwords'

export const addPasswords = (passwords: IPassword[]) => {
    return {
        type: "ADD_PASSWORDS",
        payload: passwords
    }
}

export const deletePasswords = () => {
    return {
        type: "DELETE_PASSWORDS"
    }
}