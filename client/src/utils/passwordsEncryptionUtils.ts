import { IPassword } from "../reducers/passwords"
import CryptoJS from 'crypto-js'
import { generateSaltFromToken } from "./masterPasswordUtils"

export const decryptPassword = (id: number, ciphertext: string, token: string, vaultKey: string) => {
    const iv = CryptoJS.enc.Hex.parse(generateSaltFromToken(token).repeat(2))
    const key = vaultKey

    const bytes = CryptoJS.AES.decrypt(ciphertext, key, { iv: iv })
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    const password: IPassword = {
        id: id,
        service: decrypted.service,
        username: decrypted.username,
        email: decrypted.email,
        password: decrypted.password
    }

    return password
}

export const encryptPassword = (password: IPassword, token: string, vaultKey: string) => {
    const iv = CryptoJS.enc.Hex.parse(generateSaltFromToken(token).repeat(2))
    const key = vaultKey

    const data = {
        service: password.service,
        username: password.username,
        email: password.email,
        password: password.password
    }

    return CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv }).toString()
}