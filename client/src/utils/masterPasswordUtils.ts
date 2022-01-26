import { decodeTokenPayload } from "./LoginUtils"
import CryptoJS from 'crypto-js'


export const deriveVaultKey = (token: string, masterPassword: string) => {
    const salt = generateSaltFromToken(token)
    const vaultKey = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 1000 })

    return vaultKey.toString()
}

export const deriveAuthKey = (token: string, VaultKey: string) => {
    return deriveVaultKey(token, VaultKey)
}

export const deriveVaultKeyFromEmail = (email: string, masterPassword: string) => {
    const salt = calculateSalt(email)
    const vaultKey = CryptoJS.PBKDF2(masterPassword, salt, { keySize: 256 / 32, iterations: 1000 })

    return vaultKey.toString()
}

export const deriveAuthKeyFromEmail = (email: string, VaultKey: string) => {
    return deriveVaultKeyFromEmail(email, VaultKey)
}

export const generateSaltFromToken = (token: string) => {
    const payload = decodeTokenPayload(token)
    return calculateSalt(payload.sub)
}

const calculateSalt = (emailString: string) => {
    const email: Array<String> = Array.from(emailString)
    const sum = email.reduce((currentSum, nextChar) => (currentSum + nextChar.charCodeAt(0)), 0)
    let salt = (sum * 536267 % 5129).toString()
    salt = salt + '0'.repeat(4 - salt.length)

    return salt.repeat(4)
}