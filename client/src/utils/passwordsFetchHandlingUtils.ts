import { Dispatch } from "redux"
import { addPasswords } from "../actions/passwordsActions"
import { setToken, unsetToken } from "../actions/tokenActions"
import { IPassword } from "../reducers/passwords"
import { checkIfRefreshAvailable } from "./LoginUtils"
import { deriveAuthKey } from "./masterPasswordUtils"
import { decryptPassword, encryptPassword } from "./passwordsEncryptionUtils"
import { addPasswordFetch, deletePasswordFetch, getAllPasswordsFetch, updatePasswordFetch } from "./passwordsFetchUtils"


export const handleGetAllPasswords = async (token: any, vaultKey: string, dispatch: Dispatch<any>) => {
    const authKey = deriveAuthKey(token.token, vaultKey)
    let res = await getAllPasswordsFetch(token, authKey)

    if (res.status === 401) {
        if (await redirectOnError(res, dispatch))
            return

        res = await getAllPasswordsFetch(token, authKey)
    }

    if (res.status !== 200)
        return

    const dict: [any] = await res.json()
    const passwords: IPassword[] = []

    dict.forEach(cipherObject => {
        let id = cipherObject.id
        let ciphertext = cipherObject.ciphertext
        let password = decryptPassword(id, ciphertext, token.token, vaultKey)
        passwords.unshift(password)
    })
    dispatch(addPasswords(passwords))
}


export const handleAddPassword = async (password: IPassword, token: any, vaultKey: string, dispatch: Dispatch<any>) => {
    const ciphertext = encryptPassword(password, token.token, vaultKey)
    const authKey = deriveAuthKey(token.token, vaultKey)
    let res = await addPasswordFetch(token, authKey, ciphertext)

    if (res.status === 401) {
        if (await redirectOnError(res, dispatch))
            return

        res = await addPasswordFetch(token, authKey, ciphertext)
    }
}


export const handleUpdatePassword = async (password: IPassword, token: any, vaultKey: string, dispatch: Dispatch<any>) => {
    const ciphertext = encryptPassword(password, token.token, vaultKey)
    const authKey = deriveAuthKey(token.token, vaultKey)
    let res = await updatePasswordFetch(token, authKey, ciphertext, password.id as number)

    if (res.status === 401) {
        if (await redirectOnError(res, dispatch))
            return

        res = await updatePasswordFetch(token, authKey, ciphertext, password.id as number)
    }
}


export const handleDeletePassword = async (id: number, token: any, vaultKey: string, dispatch: Dispatch<any>) => {
    const authKey = deriveAuthKey(token.token, vaultKey)
    let res = await deletePasswordFetch(token, authKey, id)

    if (res.status === 401) {
        if (await redirectOnError(res, dispatch))
            return

        res = await deletePasswordFetch(token, authKey, id)
    }
}


const redirectOnError = async (res: Response, dispatch: Dispatch<any>) => {
    const dict = await res.json()
    if (dict.detail === "invalid token") {
        dispatch(unsetToken())
        return true
    }
    const newToken = await checkIfRefreshAvailable()
    if (newToken === "") {
        dispatch(unsetToken())
        return true
    }
    dispatch(setToken(newToken))
    return false
}